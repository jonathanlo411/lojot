import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const authCookie = cookies.get('auth')
    if (authCookie) {
        // Validate TTL
        let dbRes;
        try {
            dbRes = await prisma.userAuth.findFirstOrThrow({where: { id: authCookie }})
        } catch (error) {
            console.log(`Failed to fetch User`)
            throw redirect(303, '/auth')
        }

        if (!(dbRes && dbRes['ttl'] > new Date())) {
            throw redirect(303, '/auth')
        }
    }

    try {
        const domainData = await prisma.domains.findMany({})
        return { domains: domainData}
    } catch {
        console.log('\nDatabase fetch failed\n')
    }
}

export const actions: Actions = {
    addDomain: async ({ request }) => {
        console.log(Object.fromEntries(await request.formData()))
    },
    updateDomain: async ({ request }) => {
        let formData = Object.fromEntries(await request.formData())
        try {
            // Checking Data exists in DB
            await prisma.domains.findFirstOrThrow({where: { id: formData.id }})
            console.log('jhere')
            throw new Error()
        } catch {
            console.log('\nDatabase update failed\n')
        }
    }
}
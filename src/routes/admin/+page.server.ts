import { prisma } from "$lib/server/prisma";
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async () => {
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
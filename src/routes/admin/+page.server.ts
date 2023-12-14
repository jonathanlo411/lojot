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
        const formData = Object.fromEntries(await request.formData())
        const topicLabel = JSON.parse(formData.topic)['value']

        try {
            await prisma.domains.create({
                data: {
                    name: formData.name,
                    title: formData.title,
                    topic: topicLabel
                },
            });
            return {ok: 1, msg: "Update successful!"}
        } catch (error) {
            console.log(error)
            console.log('\nDatabase addition failed\n')
            return {ok: 0, msg: "Update failed, please try again."}
        }
    },
    updateDomain: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData())
        const topicLabel = (formData.topic) ? JSON.parse(formData.topic)['value'] : ''
    
        if (formData.title && formData.name) {  // Updating DB
            try {
                await prisma.domains.update({
                    where: { id: formData.id },
                    data: {
                        name: formData.name,
                        title: formData.title,
                        topic: topicLabel
                    }
                })
                return {ok: 1, msg: "Update successful!"}
            } catch {
                console.log('\nDatabase update failed\n')
                return {ok: 0, msg: "Update failed, please try again."}
            }
        } else {                                // Deleting Data
            try {
                await prisma.domains.delete({
                    where: { id: formData.id }
                })
                return {ok: 1, msg: "Delete successful!"}
            } catch {
                console.log('\nDatabase delete failed\n')
                return {ok: 0, msg: "Delete failed, please try again."}
            }
        }
    }
}
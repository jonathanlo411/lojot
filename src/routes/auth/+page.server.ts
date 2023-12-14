import type { Actions, PageServerLoad } from "./$types";
import { prisma } from "$lib/server/prisma";
import { LOADED_PASSWORD } from '$env/static/private'
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ cookies }) => {
    const authCookie = cookies.get('auth')
    if (authCookie) {
        // Validate TTL
        let dbRes;
        try {
            dbRes = await prisma.userAuth.findFirstOrThrow({where: { id: authCookie }})
        } catch (error) {
            console.log(`Failed to fetch User`)
            return {msg: 'Session expired, enter key again.'}
        }

        if (dbRes && dbRes['ttl'] > new Date()) {
            throw redirect(302, '/admin')
        } else {
            return {msg: 'Session expired, enter key again.'}
        }
    }
}

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formInput = (await request.json())['passkey']

        // Checking correct passkey
        if (formInput === LOADED_PASSWORD) {
            let oneWeekTTL = new Date()
            oneWeekTTL = new Date(oneWeekTTL.getTime() + 7 * 24 * 60 * 60 * 1000);

            // Setting auth cookie to persist session
            try {
                const dbRes = await prisma.userAuth.create({ data: {
                    ttl: oneWeekTTL
                }})
                
                cookies.set('auth', dbRes['id'], {
                    maxAge: 60 * 60 * 24 * 7
                })
            } catch (error) {
                console.log(`\nFailed to update Database:\n${error}\n`)
                return {msg: "Something went wrong, try again later."}
            } 

            // Redirect user once authed
            return {redirect: "true"}
        } else {
            return {msg: 'Incorrect Credentials'}
        }
    }
}
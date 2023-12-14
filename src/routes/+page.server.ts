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
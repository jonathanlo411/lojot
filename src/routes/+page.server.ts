import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    try {
        const targetID: String = '657a2e1e94cd656492f96331';
        const domainData = await prisma.domains.findFirstOrThrow({ where: { id: targetID } })
        return { domains: domainData}
    } catch {
        console.log('Database fetch failed')
    }
}
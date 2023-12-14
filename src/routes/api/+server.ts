import { prisma } from "$lib/server/prisma";
import { json } from '@sveltejs/kit';

export async function GET({}) {
    try {
        const domainData = await prisma.domains.findMany({})
        return json(domainData)
    } catch (error) {
        console.log(`\nDatabase fetch failed:\n${error}\n`)
        return json({ status: 500, message: "Internal Server Error" });
    }
}
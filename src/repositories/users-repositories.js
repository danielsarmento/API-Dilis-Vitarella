import { prisma } from "../lib/prisma.js";

export async function createData (name, cellPhone, videoLink) {
    await prisma.sendManual.create({
        data: {
            name,
            cellPhone,
            videoLink
        }
    })
}
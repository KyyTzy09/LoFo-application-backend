import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
async function main() {
    const user1 = await prisma.user.create({
        data: {
            phoneNumber: "08895762974",
            password: "$2b$10$ZoQ1ZiY4fTS7Pyc4J4Y0B.TpED0dlWsjMRptobcdOLAqHchR8rTBO",
            profile: {
                create: {
                    username: "Fiky"
                }
            }
        }
    })

    const user2 = await prisma.user.create({
        data: {
            phoneNumber: "85777810462",
            password: "$2b$10$ZoQ1ZiY4fTS7Pyc4J4Y0B.TpED0dlWsjMRptobcdOLAqHchR8rTBO",
            profile: {
                create: {
                    username: "Rasya"
                }
            }
        }
    })
    console.log("Created :", user1, user2)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    }).catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })
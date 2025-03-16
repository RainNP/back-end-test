import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.users.create({
    data: {
      name: 'สมาทตี้ ศรีสมาท',
      // assume cloud host image
      profileImage: 'https://firebasestorage.googleapis.com/v0/b/mock-mittraphap-project.firebasestorage.app/o/profile_dog.png?alt=media&token=83e1d8af-7448-4157-8e80-7ecd37d744db',
      status: true,
    },
  })

  await prisma.users.create({
    data: {
      name: 'สมาทตี้ ศรีสมาท',
      status: false,
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

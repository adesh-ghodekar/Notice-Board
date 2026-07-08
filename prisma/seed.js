const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: {
      username: "admin",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists.");
    return;
  }

  await prisma.admin.create({
    data: {
      username: "admin",
      email: "admin@college.com",
      password: hashedPassword,
      name: "Administrator",
      role: "ADMIN",
    },
  });

  console.log("Admin created successfully.");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
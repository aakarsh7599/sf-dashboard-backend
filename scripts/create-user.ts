import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const email = 'aakarsh0705@gmail.com';
  const password = 'Aak@1234'; // plain text

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed
    },
  });

  console.log('✅ Created user:', user);
}

main()
  .catch((e) => console.error('❌ Error:', e))
  .finally(() => prisma.$disconnect());
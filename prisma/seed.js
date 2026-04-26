import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try{
    await prisma.$queryRaw`TRUNCATE Users, Courses, Assignments, Comments RESTART IDENTITY CASCADE;`;

    const usersData = [
        { name: "John Doe", email: 'johnd@test.com', password: 'password123' },
        { name: "Jane Doe", email: 'janed@example.com', password: 'abc123' },
        { name: "Administrator", email: 'admin12345@demo.com', password: 'admin01', role: 'ADMIN' },
    ];

    const users = [];

    for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
//
    const user = await prisma.Users.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }

  for (const user of users) {
    await prisma.post.createMany({
      data: [
        {
          title: `Welcome Post by ${user.email.split('@')[0]}`,
          content: `This is the first post by ${user.email.split('@')[0]}.`,
          authorId: user.id,
        },
        {
          title: `Thoughts by ${user.email.split('@')[0]}`,
          content: `Another insightful post by ${user.email.split('@')[0]}.`,
          authorId: user.id,
        },
      ],
    });
  }


}
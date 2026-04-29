import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
  await prisma.$queryRaw`TRUNCATE TABLE comments, assignments, course_members, courses, users RESTART IDENTITY CASCADE;`;
  console.log('Database cleared.\n');

  // ── Users ──────────────────────────────────────────────────────────────────
  const usersData = [
    { name: 'John Doe',      email: 'johnd@test.com',    password: 'password123', role: 'USER'    },
    { name: 'Jane Doe',      email: 'janed@example.com', password: 'abc12345',    role: 'USER'    },
    { name: 'Alice Teacher', email: 'alice@school.edu',  password: 'teach1234',   role: 'TEACHER' },
    { name: 'Bob Teacher',   email: 'bob@school.edu',    password: 'teach5678',   role: 'TEACHER' },
  ];

  const users = [];
  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.users.create({
      data: {
        name:     userData.name,
        email:    userData.email,
        password: hashedPassword,
        role:     userData.role,
      },
    });
    users.push(user);
    console.log(`Created user: ${user.name} (${user.role})`);
  }

  const [student1, student2, teacher1, teacher2] = users;

  // ── Courses ────────────────────────────────────────────────────────────────
  const coursesData = [
    {
      title:       'Introduction to Algorithms',
      department:  'ITSC',
      description: 'A foundational course covering sorting, searching, and complexity analysis.',
      userId:      teacher1.id,
    },
    {
      title:       'Calculus I',
      department:  'MATH',
      description: 'Limits, derivatives, and integrals with real-world applications.',
      userId:      teacher1.id,
    },
    {
      title:       'World History',
      department:  'HIST',
      description: 'A survey of major civilisations and historical events from antiquity to the present.',
      userId:      teacher2.id,
    },
  ];

  const courses = [];
  for (const courseData of coursesData) {
    const course = await prisma.courses.create({ data: courseData });
    courses.push(course);
    console.log(`Created course: ${course.title}`);
  }

  const [algosCourse, calcCourse, historyCourse] = courses;

  // ── Course Members ─────────────────────────────────────────────────────────
  const memberships = [
    { userId: student1.id, courseId: algosCourse.id   },
    { userId: student1.id, courseId: calcCourse.id    },
    { userId: student2.id, courseId: algosCourse.id   },
    { userId: student2.id, courseId: historyCourse.id },
  ];

  await prisma.courseMembers.createMany({ data: memberships });
  console.log(`Created ${memberships.length} course memberships`);

  // ── Assignments ────────────────────────────────────────────────────────────
  const assignmentsData = [
    {
      title:       'Sorting Algorithms Quiz',
      description: 'Short quiz covering bubble sort, merge sort, and quicksort.',
      courseId:    algosCourse.id,
      grades:      20,
    },
    {
      title:       'Big-O Analysis Homework',
      description: 'Analyse the time and space complexity of ten given code snippets.',
      courseId:    algosCourse.id,
      grades:      50,
    },
    {
      title:       'Derivatives Problem Set',
      description: 'Thirty problems applying the chain rule, product rule, and quotient rule.',
      courseId:    calcCourse.id,
      grades:      100,
    },
    {
      title:       'Integration Midterm',
      description: 'Covers definite and indefinite integrals, u-substitution, and area under a curve.',
      courseId:    calcCourse.id,
      grades:      100,
    },
    {
      title:       'Ancient Civilisations Essay',
      description: 'A 1500-word comparative essay on two ancient civilisations of your choice.',
      courseId:    historyCourse.id,
      grades:      100,
    },
  ];

  const assignments = [];
  for (const assignmentData of assignmentsData) {
    const assignment = await prisma.assignments.create({ data: assignmentData });
    assignments.push(assignment);
    console.log(`Created assignment: ${assignment.title}`);
  }

  const [sortingQuiz, bigOHomework, derivativesSet, integrationMidterm, ancientEssay] = assignments;

  // ── Comments ───────────────────────────────────────────────────────────────
  const commentsData = [
    { content: 'Great refresher on the basics — the merge sort section was especially clear.', assignmentId: sortingQuiz.id,        userId: student1.id},
    { content: 'Will there be questions on heap sort as well?',                                assignmentId: sortingQuiz.id,        userId: student2.id},
    { content: 'I found problem 7 ambiguous — could we get a clarification in class?',         assignmentId: bigOHomework.id,       userId: student1.id},
    { content: 'Really enjoyed working through the chain rule problems.',                      assignmentId: derivativesSet.id,     userId: student2.id},
    { content: 'The midterm felt fair. Question 4 was a nice challenge.',                      assignmentId: integrationMidterm.id, userId: student1.id},
    { content: 'Could we compare Rome and Han China? They seem like a great pairing.',         assignmentId: ancientEssay.id,       userId: student2.id},
  ];

  await prisma.comments.createMany({ data: commentsData });
  console.log(`Created ${commentsData.length} comments`);

  console.log('\nSeeding complete.');

} catch (error) {
  console.error('Error seeding data:', error);
} finally {
  await prisma.$disconnect();
}
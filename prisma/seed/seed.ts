import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: 'hashedpassword', // Store securely in production
      name: 'Admin User',
      role: 'ADMIN',
      profileImage: 'https://example.com/images/admin.png',
    },
  });

  const employee = await prisma.user.create({
    data: {
      email: 'employee@example.com',
      password: 'hashedpassword',
      name: 'Employee One',
      role: 'EMPLOYEE',
      profileImage: 'https://example.com/images/employee1.png',
    },
  });

  // Create a team
  const team = await prisma.team.create({
    data: {
      name: 'Product Team',
      description: 'Team responsible for product development',
      members: {
        create: [
          { userId: admin.id, role: 'Team Lead' },
          { userId: employee.id, role: 'Developer' },
        ],
      },
    },
    include: { members: true },
  });

  // Create a project
  const project = await prisma.project.create({
    data: {
      name: 'Project Alpha',
      description: 'First project',
      teamId: team.id,
    },
  });

  // Create a board
  const board = await prisma.board.create({
    data: {
      name: 'Development Board',
      projectId: project.id,
    },
  });

  // Create an issue
  const issue = await prisma.issue.create({
    data: {
      title: 'Fix login bug',
      description: 'User login fails when using correct credentials',
      type: 'BUG',
      status: 'TODO',
      priority: 'HIGH',
      creatorId: admin.id,
      assigneeId: employee.id,
      projectId: project.id,
      boardId: board.id,
    },
  });

  // Add a comment
  await prisma.comment.create({
    data: {
      content: 'I will start working on this today.',
      authorId: employee.id,
      issueId: issue.id,
    },
  });

  // Add a notification
  await prisma.notification.create({
    data: {
      type: 'ISSUE_ASSIGNED',
      message: 'You have been assigned a new issue: Fix login bug',
      recipientId: employee.id,
      senderId: admin.id,
      link: `/issues/${issue.id}`,
    },
  });

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

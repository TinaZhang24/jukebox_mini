const prisma = require("../prisma");
const seed = async () => {
    // A loop must be used because `prisma.user.createMany` fails here
    for (let i = 0; i < 3; i++) {
      // For each user, create an array of 5 playlists
      const playlists = [];
      for (let j = 0; j < 5; j++) {
        playlists.push({
          name: `Music ${i}${j}`,
          description: `${i}${j}:foo.bar`,
        });
      }
  
      // Create a single user with nested playlists
      await prisma.user.create({
        data: {
          username: `User ${i + 1}`,
          playlists: {
            create: playlists,
          },
        },
      });
    }
  };
  seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
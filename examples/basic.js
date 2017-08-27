const Instagram = require("../build/src/index");

async function run() {
  const session = new Instagram();
  const stats = await session.login("rwilinski", "rafal10");
  const photos = await session.getMyPhotos();

  console.log(stats, photos);
}

run();

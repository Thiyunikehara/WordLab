const bcrypt = require('bcryptjs');
async function run() {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash('test', salt);
  console.log('HASH:', hash);
}
run().catch(console.dir);

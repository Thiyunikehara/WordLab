const mongoose = require('mongoose');
async function run() {
  try { await mongoose.connect('mongodb://localhost:27018/fake', { serverSelectionTimeoutMS: 1000 }); }
  catch(e) { console.log('CAUGHT IT CLEANLY!'); }
}
run();

// 1. Load environment variables FIRST
require("dotenv").config();

// We delegate to the fully implemented server.js which contains our authentication routes,
// login/register logic, and robust MongoDB connection fallback.
require('./server.js');
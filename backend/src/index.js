const { connectDB } = require('./mongoose');
const { bootstrapApp } = require('./bootstrap');
const { socketServer } = require('./ws/index');

const app = bootstrapApp();
const port = process.env.PORT || 3001;


const server = require('http').createServer(app);
connectDB().then(() => {
  console.log("Connected to database!");
}).catch((err) => {
  console.error("Failed to connect to database:", err.message);
  process.exit(1);
});

exports.io  = socketServer(server);

server.listen(port, () => {
  console.log(`Server is up and running ⚡ ${port}`);
});

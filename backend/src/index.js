const { connectDB } = require('./mongoose');
const {bootstrapApp} = require('./bootstrap');
const app = bootstrapApp();

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT_BACKEND || 3001;


const server = app.listen(port, () => {
  console.log(`Server is up and running ⚡ ${port}`);
});

module.exports = { app, server };
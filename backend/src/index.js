const { connectDB } = require('./mongoose');
const { bootstrapApp } = require('./bootstrap');
const { socketServer } = require('./ws/index');

const app = bootstrapApp();
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server is up and running ⚡ ${port}`);
});

connectDB()
    .then(() => {
        console.log('Connected to database!');
        const io = socketServer(server); // Aquí se inicializa socket.io con el servidor HTTP
        // Exporta app, server y io para otros módulos si es necesario
        module.exports = { app, server, io };
    })
    .catch(err => {
        console.error('Failed to connect to database:', err.message);
        process.exit(1);
    });

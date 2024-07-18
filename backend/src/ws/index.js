const { Server } = require("socket.io");
const { validateJWT } = require('../services/auth.service');
const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');

const socketConnections = {};

const socketServer = (server) => {
  const io = new Server(server, { cors: { origins: ['*'] } });

  io.use(async (socket, next) => {
    console.log("New WS connection request, validating user");
    const token = socket.handshake.auth.token;

    try {
      const user = validateJWT(token);
      if (!user) {
        return next(new Error('Authentication error'));
      }

      const subscriptions = await Subscription.find({ email: user.email, isActive: true }).populate('city').populate('userId').exec();
      const subscribedCities = subscriptions.map(subscription => subscription.city);

      const populatedUser = {
        ...user,
        subscribedCities: subscribedCities,
        socketId: socket.id
      };

  
      socket.user = populatedUser;
      next();
    } catch (error) {
      console.error('Error during authentication:', error);
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', (socket) => {
    try {
      const userId = socket.user.userId;

      if (!socket.user.subscribedCities || socket.user.subscribedCities.length === 0) {
        console.log('No subscribed cities found for user:', socket.user.fullname);
      } else {
        socket.user.subscribedCities.forEach(city => {
          socket.join(city._id.toString());
        });
        console.log('User subscribed to cities:', socket.user.subscribedCities.map(city => city.cityName));
      }

      io.emit("messageWelcome", { text: `Welcome ${socket.user.fullname}!` });
      socket.emit("welcomeEverybody", { text: `Welcome everybody!` });

      socket.on('disconnect', () => {
        console.log('User disconnected: ', socket.user._id);
        delete socketConnections[userId];
      });

      socket.on('msg', (message) => {
        console.log('Message received: ', message);
        io.emit('msg', message);
      });
    } catch (error) {
      console.error('Error during connection setup:', error);
    }
  });

  return io;
};

module.exports = {
  socketServer,
  socketConnections
};

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require('./models/userModel');

dotenv.config();

let dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

let mongodb;

exports.connectDB = async () => {
  mongoose.set('strictQuery', false);

    if (process.env.NODE_ENV === 'test') {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
    }

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (process.env.NODE_ENV === 'test') {
      console.log('En modo Test!');
      const admin = await User.findOne({ role: 'ADMIN' });
      if (!admin) {
        const hashedPassword = await bcrypt.hash('123456789', 10);
        const admin = new User({
          fullname: 'ADMIN',
          email: 'admin@fakeluma.com',
          birthdate: "1991-10-12",
          phone_number: "666666666",
          role: "ADMIN",
          profile_picture: "www.google.com",
          password: hashedPassword,
        });

        await admin.save();
        console.log("ADMIN user created!: ", admin.email);
      } else {
        console.log("ADMIN user exists: ", admin.email);
      }

      const creator = await User.findOne({ role: 'CREATOR' });
      if (!creator) {
        const hashedPassword = await bcrypt.hash('987654321', 10);
        const creator = new User({
          fullname: 'CREATOR',
          email: 'creator@fakeluma.com',
          birthdate: "1992-11-13",
          phone_number: "777777777",
          role: "CREATOR",
          profile_picture: "www.example.com",
          password: hashedPassword,
        });

        await creator.save();
        console.log("CREATOR user created!: ", creator.email);
      } else {
        console.log("CREATOR user exists: ", creator.email);
      }
    }
};

exports.disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
    }
  } catch (err) {
    console.log(err);
  }
};

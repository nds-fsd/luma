const mongoose = require('mongoose');
const dotenv = require('dotenv');
const {MongoMemoryServer} = require("mongodb-memory-server");
const { User } = require('../src/models/userModel')


dotenv.config();

let dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

let mongodb;

exports.connectDB = async () => {
  mongoose.set('strictQuery', false);

  try {
    if (process.env.NODE_ENV === 'test') {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
      
    const admin = await User.findOne({ role: 'ADMIN' });
      if (!admin) {
        if (process.env.NODE_ENV !== 'test') {
                console.log('ADMIN user not found, creating one....');
        }

        const admin = new User({
          fullname: 'ADMIN',
          email: 'admin@fakeluma.com',
          birthdate: "1991-10-12",
          phone_number: "600000000",
          role: "ADMIN",
          profile_picture: "www.google.com",
          password: 'passworddd',
        });
            
            await admin.save();
              if (process.env.NODE_ENV !== 'test') {
                  console.log("ADMIN user created!: ", admin.email);
              }
          } else {
              if (process.env.NODE_ENV !== 'test') {
                  console.log("ADMIN user exists: ", admin.email);
              }
          }
          
      console.log(dbUrl);
      console.log("Connected to database");
    
    }

    await mongoose.connect(dbUrl);
    const mongo = mongoose.connection;
    mongo.on('error', (error) => console.error(error));
  } catch (e) {
    console.log(e);
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

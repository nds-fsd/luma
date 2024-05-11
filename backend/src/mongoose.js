const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;

let mongodb;

exports.connectDB = async () => {
  mongoose.set('strictQuery', false);

  try {
    if (process.env.NODE_ENV === 'test') {
      mongodb = await MongoMemoryServer.create();
      dbUrl = mongodb.getUri();
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

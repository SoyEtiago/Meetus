require("dotenv").config(); //dotenv for using environment variables
const { MONGO_USER, MONGO_PASS, MONGO_URI } = process.env;
const ATLAS_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}?retryWrites=true&w=majority`;
const mongoose = require('mongoose');

//async function to connect to mongoDB instance
const dbConnection = async () => {
	try {
    //mongoose connection events, async functions to validate status
    mongoose.connection.on('disconnected', () => console.log('Disconnected from mongoDB instance'));
    mongoose.connection.on('connected', () => console.log(`Connected to mongoDB instance: ${MONGO_URI}`));
    mongoose.connection.on('close', () => console.log('Connection closed by peer'));
    console.log(`Establishing connection to mongo cluster...`);
		mongoose.connect(ATLAS_URI, {
			dbName: 'meetus'
		});
	} catch (error) {
      console.log(error);
      throw new Error('Error while trying to connect to mongoDB instance');
	}
}

module.exports = {dbConnection};
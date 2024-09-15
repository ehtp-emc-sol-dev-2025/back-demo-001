const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const winston = require('winston');

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(),
  ],
});

const uri = "mongodb://back-demo-001-server:u7I0FGnwNeP2VKwy6e5AMo5FKNWAfxXTyLwIAnM4j9LHqDQF125pK4PSnwLqi8ReQYrSDi5PS5rZACDb5G8QYA==@back-demo-001-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@back-demo-001-server@";
const client = new MongoClient(uri);
const DATABASE_NAME = 'consultants-db'; 

app.get('/consultants', async (req, res) => {
  try {
    logger.info('Info: /consultants endpoint was called');
    await client.connect();
    logger.verbose('Verbose: Connected to the database');
    const database = client.db(DATABASE_NAME);
    const collection = database.collection('consultants');
    const consultants = await collection.find().toArray();
    res.json(consultants);
  } catch (error) {
    res.status(500).send('Error retrieving consultants');
    logger.error('Error: Failed to retrieve consultants', error);
  } finally {
    await client.close();
     logger.verbose('Warning: Database connection closed');
  }
});


app.get('/consultants/:id', async (req, res) => {
  try {
    logger.info(`Info: /consultants/${req.params.id} endpoint was called`);
    await client.connect();
    logger.verbose('Verbose: Connected to the database');
    const database = client.db(DATABASE_NAME);
    const collection = database.collection('consultants');
    const consultant = await collection.findOne({ _id: parseInt(req.params.id) });
    if (consultant) {
      res.json(consultant);
    } else {
      logger.warn('Consultant not found');
      res.status(404).send('Consultant not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving consultant');
  } finally {
    await client.close();
    logger.verbose('Warning: Database connection closed');
  }
});

app.listen(process.env.PORT || 3000, () => {
  logger.info('Server is running');
});

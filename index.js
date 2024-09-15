const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Added ObjectId for querying by _id
const app = express();
const winston = require('winston');
const redis = require('redis');

// Logger configuration
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console(),
  ],
});

// Redis configuration
const REDIS_HOST = 'emc2-ehtp-redis-demo.redis.cache.windows.net'; 
const REDIS_PORT = 6379; 
const REDIS_PASSWORD = 'KvMOX9U4Q4R83KanH42Tx62ia6E3oew7VAzCaNUky9Y=';

const redisClient = redis.createClient({
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    tls: false
  }
});

redisClient.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

(async () => {
  await redisClient.connect();
  logger.info('Connected to Redis');
})();

// Server and database configuration
const PORT = process.env.PORT || 3000;
const uri = "mongodb://back-demo-001-server:u7I0FGnwNeP2VKwy6e5AMo5FKNWAfxXTyLwIAnM4j9LHqDQF125pK4PSnwLqi8ReQYrSDi5PS5rZACDb5G8QYA==@back-demo-001-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@back-demo-001-server@";
const client = new MongoClient(uri);
const DATABASE_NAME = 'consultants-db'; 

// Route: Get all consultants
app.get('/consultants', async (req, res) => {
  try {
    // Check if data is in cache
    const cachedConsultants = await redisClient.get('consultants');
    
    if (cachedConsultants) {
      logger.info('Fetching data from Redis cache');
      return res.json(JSON.parse(cachedConsultants));
    }

    // Data not in cache; fetch from database
    await client.connect();
    const database = client.db(DATABASE_NAME);
    const collection = database.collection('consultants');
    const consultants = await collection.find().toArray();

    // Save data to Redis and set expiration
    await redisClient.setEx('consultants', 7200, JSON.stringify(consultants)); // Cache for 2 hours
    logger.info('Fetching data from database and storing in cache');
    
    res.json(consultants);
  } catch (error) {
    res.status(500).send('Error retrieving consultants');
    logger.error('Error: Failed to retrieve consultants', error);
  } finally {
    await client.close(); // Ensure client closes
    logger.verbose('Database connection closed');
  }
});

// Route: Get consultant by ID
app.get('/consultants/:id', async (req, res) => {
  try {
    const consultantId = req.params.id;
    const cacheKey = `consultant:${consultantId}`;

    // Check cache
    const cachedConsultant = await redisClient.get(cacheKey);

    if (cachedConsultant) {
      logger.info(`Fetching consultant ${consultantId} from Redis cache`);
      return res.json(JSON.parse(cachedConsultant));
    }

    // Data not in cache; fetch from database
    await client.connect();
    const database = client.db(DATABASE_NAME);
    const collection = database.collection('consultants');
    
    // Assuming `_id` is an ObjectId, otherwise adjust based on your data type
    const consultant = await collection.findOne({ _id: new ObjectId(consultantId) });

    if (consultant) {
      // Save to cache
      await redisClient.setEx(cacheKey, 7200, JSON.stringify(consultant)); // Cache for 2 hours
      logger.info(`Fetching consultant ${consultantId} from database and storing in cache`);
      
      res.json(consultant);
    } else {
      res.status(404).send('Consultant not found');
    }
  } catch (error) {
    res.status(500).send('Error retrieving consultant');
    logger.error(`Error retrieving consultant with id ${req.params.id}`, error);
  } finally {
    await client.close(); // Ensure client closes
    logger.verbose('Database connection closed');
  }
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

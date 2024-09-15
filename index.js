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

//Redis configuration
const redis = require('redis');

const REDIS_HOST = 'emc2-ehtp-redis-demo.redis.cache.windows.net'; // e.g., mycache.redis.cache.windows.net
const REDIS_PORT = 6379; // Use the SSL port
const REDIS_PASSWORD = 'KvMOX9U4Q4R83KanH42Tx62ia6E3oew7VAzCaNUky9Y=';





redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});



const redisClient = createClient({
    password: REDIS_PASSWORD, // use your password here
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
        tls: false
    }
});

await redisClient.connect();
console.log('Connected to Redis');


app.listen(process.env.PORT || 3000, () => {
  console.log('Server running');
});

//Database conf
const uri = "mongodb://back-demo-001-server:u7I0FGnwNeP2VKwy6e5AMo5FKNWAfxXTyLwIAnM4j9LHqDQF125pK4PSnwLqi8ReQYrSDi5PS5rZACDb5G8QYA==@back-demo-001-server.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@back-demo-001-server@";
const client = new MongoClient(uri);
const DATABASE_NAME = 'consultants-db'; 

app.get('/consultants', async (req, res) => {
  try {
    // Check if data is in cache
    const cachedConsultants = await redisClient.get('consultants');
    
    if (cachedConsultants) {
      // Data found in cache
      console.log('Fetching data from Redis cache');
      res.json(JSON.parse(cachedConsultants));
    } else {
      // Data not in cache; fetch from database
      await client.connect();
      const database = client.db(DATABASE_NAME);
      const collection = database.collection('consultants');
      const consultants = await collection.find().toArray();

      // Save data to Redis and set expiration
      await redisClient.setEx('consultants', 7200, JSON.stringify(consultants)); // Cache for 2 hours

      console.log('Fetching data from database and storing in cache');
      
      res.json(consultants);
    }
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
  const consultantId = req.params.id;
    const cacheKey = `consultant:${consultantId}`;

    // Check cache
    const cachedConsultant = await redisClient.get(cacheKey);

    if (cachedConsultant) {
      // Data found in cache
      console.log(`Fetching consultant ${consultantId} from Redis cache`);
      res.json(JSON.parse(cachedConsultant));
    } else {
      // Data not in cache; fetch from database
      await client.connect();
      const database = client.db(DATABASE_NAME);
      const collection = database.collection('consultants');
      const consultant = await collection.findOne({ _id: parseInt(consultantId) });

      if (consultant) {
        // Save to cache
        await redisClient.setEx(cacheKey, 7200, JSON.stringify(consultant)); // Cache for 2 hours

        console.log(`Fetching consultant ${consultantId} from database and storing in cache`);
        
        res.json(consultant);
      } else {
        res.status(404).send('Consultant not found');
      }
    }
  } catch (error) {
    res.status(500).send('Error retrieving consultant');
  } finally {
    await client.close();
    logger.verbose('Warning: Database connection closed');
  }
});



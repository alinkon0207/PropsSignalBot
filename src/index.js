
import express from 'express';
import { config } from 'dotenv';

// import initBot from './bot/index.js';
import connectDB from './db/index.js';
import { router as alert_hook } from './controllers/alert_hook.js';


config();

const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/alert-hook', alert_hook);

const port = process.env.PORT | 4500;
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    // await initBot();
    await connectDB();
});

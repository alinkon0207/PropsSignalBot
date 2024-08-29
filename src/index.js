
import express from 'express';
import { config } from 'dotenv';

import connectDB from './db/index.js';
import * as bot from './bot/index.js';
import { router as alert_hook } from './routes/alert_hook.js';


config();

const app = express();

app.use((req, res, next) => {
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
    await connectDB();
    await bot.init();
});

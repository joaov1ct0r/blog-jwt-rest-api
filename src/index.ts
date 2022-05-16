import 'dotenv/config';

import cors from 'cors';

import express, { Express } from 'express';

import postRouter from './routes/postRoutes.js';

import userRouter from './routes/userRoutes.js';

import adminRouter from './routes/adminRoutes.js';

const app: Express = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.use('/api/post', postRouter);

app.use('/api/admin', adminRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running!');
});

import 'dotenv/config';

import cors from 'cors';

import express from 'express';

import postRouter from './routes/postRoutes.js';

import userRouter from './routes/userRoutes.js';

import adminRouter from './routes/adminRoutes.js';

let app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.use('/api/post', postRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running!');
});

import 'dotenv/config';

import cors from 'cors';

import express from 'express';

import postRouter from './routes/postRoutes.js';

import userRouter from './routes/userRoutes.js';

let app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);

app.use('/api/post', postRouter);

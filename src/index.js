import 'dotenv/config';

import cors from 'cors';

import express from 'express';

import postRouter from './routes/postRoutes.js';

import userRouter from './routes/userRoutes.js';

let app = express();

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/modules/routes';
import { notFound } from './app/middleware/notFound';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './app/middleware/globalErrorHandle';
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://bike-shop-nine.vercel.app'],
    credentials: true,
  }),
);
app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.send(`Server is running. Please Search on the "/api/products"`);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;

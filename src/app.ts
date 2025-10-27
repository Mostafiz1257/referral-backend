import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import errorMiddleware from './app/errors/errorMiddleware';
const app: Application = express();

//parser
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://e3dn-client-side-task.vercel.app',
    ],
    credentials: true,
  }),
);

app.use('/', router);

const getAController = (req: Request, res: Response) => {
  res.send('Server is running');
};
app.get('/', getAController);

app.use((req: Request, res: Response) => {
  res.status(400).json({
    statusCode: 400,
    success: false,
    message: 'Route not found',
  });
});

app.use(errorMiddleware);

export default app;

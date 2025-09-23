import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express, Router } from 'express';
import helmet from 'helmet';

import authRoute from '@/app/routes/auth.route';
import userRoute from '@/app/routes/user.route';
import bottleRoute from '@/app/routes/bottle.route';

const app: Express = express();
const apiRouter: Router = express.Router();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(helmet());

apiRouter.use(authRoute);
apiRouter.use(userRoute);
apiRouter.use(bottleRoute);

app.use('/api', apiRouter);

export default app;

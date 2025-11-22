import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes/auth.routes';
import categoryRoutes from './routes/category.routes';
import expenseRoutes from './routes/expense.routes';
import summaryRoutes from './routes/summary.routes';

const app = express();

// addable prefix (can be moved to env if desired)
const API_PREFIX = process.env.API_PREFIX || '/api';

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || 'http://localhost:3000';

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// create a single router that holds all route mounts (no need to change individual route files)
const apiRouter = express.Router();

// mount existing route modules on the apiRouter using their current subpaths
apiRouter.use('/auth', authRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/expenses', expenseRoutes);
apiRouter.use('/summary', summaryRoutes);

apiRouter.get('/health', (req, res) => {
  res.json({ ok: true });
});


// mount the entire apiRouter under the API prefix
app.use(API_PREFIX, apiRouter);

export default app;

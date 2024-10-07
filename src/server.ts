import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fileRoutes from './routes/files';
import { connectDB } from './db';

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/files', fileRoutes);


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});

export default app;

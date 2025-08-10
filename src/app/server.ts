import 'dotenv/config';
import app from '@/app/app';
import { connectDB } from '@/utils/connectDB';
const port: string = process.env.APP_PORT || '3000';

const startServer = (port: string) => {
  connectDB()
    .then(() => {
      app
        .listen(port, () => {
          console.log(`Server is listening on http://localhost:${port}`);
        })
        .on('error', (err: { code: string }) => {
          if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use, trying port ${parseInt(port.toString()) + 1}…`);
            startServer((parseInt(port) + 1).toString());
          } else {
            console.error(err);
            process.exit(1);
          }
        });
    })
    .catch((err: Error) => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
};
startServer(port);

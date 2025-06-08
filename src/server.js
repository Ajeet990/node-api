import app from './app.js';
import { disconnectDB } from './config/connection/db.js';

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGINT', async () => {
  await disconnectDB();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  await disconnectDB();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
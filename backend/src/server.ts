console.log('🚀 server.ts loaded');
console.log('ENV PORT =', process.env.PORT);
import app from './app';

const PORT = Number(process.env.PORT || 4000);
console.log(`Starting server on port ${PORT}...`);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});

import path from 'path';
import express from 'express';

const app = express();
const port = 8080;

app.use(express.static(import.meta.dirname));
app.use('/node_modules', express.static(path.resolve(import.meta.dirname, '../node_modules')));

app.listen(port, () => {
  console.log(`To run benchmarks open http://localhost:${port}`);
});

import express from 'express';

const app = express();
const port = 1342;
import routes from './routes';

app.use(routes);

app.listen(port, () => {
  console.log(`Listen ${port}`);
})
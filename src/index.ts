import app from './app';

app.listen(process.env.API_PORT, () => {
  console.log(`Listen ${process.env.API_PORT}`);
})
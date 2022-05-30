import express from 'express';
import cors from 'cors';
import { getData, postData } from './utils/index.mjs';

// dev-server.js
const app = express();
app.use(
  cors({
    origin: '*',
  }),
);
// Import routes
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/*/cart/*.js', async (req, res) => {
  const response = await postData(req.url, req.body);
  res.send(response);
});
app.get('/*/cart.js', async (req, res) => {
  const response = await getData(req.url);
  res.send(response);
});
app.get('/*/products/*', async (req, res) => {
  const response = await getData(req.url);
  res.send(response);
});
app.set('port', 8080);
app.listen(app.get('port'), function () {
  console.log('Node App Started');
});

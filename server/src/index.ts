import express from 'express';
const app = express();
const port = 9000;

const one: number = 1;

app.get('/', (_req, res) => res.send('Hello World'));
app.listen(port);
console.log(`[app]: http://localhost:${port}`);

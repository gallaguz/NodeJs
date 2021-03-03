import express from 'express';
import path from 'path';
import routes from './routes/routes.js';
import cors from 'cors';

import { requestTime, logger } from './middlewares.js'

const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT ?? 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'src/ejs'));

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(requestTime)
app.use(logger)

app.use(routes);

app.get('/', (req, res) => {
    res.render('index', {title: 'Main Page', active: 'main'})
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});
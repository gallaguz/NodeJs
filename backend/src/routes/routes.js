import express from 'express';
import {getCategories, getNews} from "../controllers/NewsController.js";
const {Router} = express;
const router = Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Main Page',
        active: 'main'
    })
})

router.get('/api/categories', getCategories);

router.post('/api/news', getNews);

export default router;


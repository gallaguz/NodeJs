import {Router} from 'express';
import {getCategories, getNews} from "../controllers/NewsController.js";
const router = Router();

router.get('/api/categories', getCategories);

router.post('/api/news', getNews);

export default router;
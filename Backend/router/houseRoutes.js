
import express from 'express';
import { createHouse,getHouse,getAllHouses } from '../controller/houseController.js'; 

const router = express.Router();
router.post('/create-post', createHouse);
router.get('/', getHouse);
router.get('/getallhouses',getAllHouses)

export default router;

import { Router } from "express";
import {query} from '../controllers/index.controller.js';

const router = Router();
router.get('/query', query);

export default router
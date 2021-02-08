import { Router } from "express";
import {add, get, del, edit} from "../controllers/controller";

const router = Router();

router.route('/:id')
    .post(add)
    .delete(del)
    .put(edit)
    .get(get);

export default router;
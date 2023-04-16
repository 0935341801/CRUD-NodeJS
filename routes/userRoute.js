import express from "express";
const router = express.Router();
import { createUser, deleteUser, getUser,searchUser,updateUser,Paginate } from "../controllers/userController.js";

router.post("/", createUser);
router.get("/", getUser);
router.delete("/delete/:id",deleteUser);
router.put("/updates/:id",updateUser);
router.get('/search',searchUser);
router.get('/pagination', Paginate)


export default router;

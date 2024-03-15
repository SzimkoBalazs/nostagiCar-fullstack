import express from "express";
import { createCar, getAllCars, getCar, getAllCarsOfUser, softDeleteCar, getAllDeletedCarsOfUser, recoverDeletedCar, updateCar } from "../controllers/carController.js";
import jwtCheck from "../config/auth0Config.js";


const router = express.Router();

router.post("/create", jwtCheck, createCar)
router.get("/allcars", getAllCars)
router.post("/allCarsOfUser", getAllCarsOfUser)
router.post("/allDeletedCarsOfUser", getAllDeletedCarsOfUser)
router.get("/:id", getCar)
router.put("/:id", jwtCheck, softDeleteCar);
router.put("/recover/:id", jwtCheck, recoverDeletedCar);
router.put("/update/:carId", jwtCheck, updateCar);

export {router as carRoute}
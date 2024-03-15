import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createCar = asyncHandler(async (req, res) => {
    const {
        manufacturer,
        model,
        description,
        price,
        address,
        country,
        city,
        details,
        image,
        userEmail,
      } = req.body.data;

      try {
        const car = await prisma.car.create({
          data: {
            manufacturer,
            model,
            description,
            price,
            address,
            country,
            city,
            details,
            image,
            owner: { connect: { email: userEmail } },
          },
        });
    
        res.send({ message: "Car created successfully", car });
      } catch (err) {
        if (err.code === "P2002") {
          const uniqueConstraint = err.meta.target[0];
    throw new Error(`Unique constraint violation: ${uniqueConstraint}`);
        }
        throw new Error(err.message);
      }
    });

    // function to get all the documents/cars
export const getAllCars = asyncHandler(async (req, res) => {
    const cars = await prisma.car.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(cars);
  });

  // function to get a specific document/car
export const getCar = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const car = await prisma.car.findUnique({
        where: { 
          id,
          isActive: true 
        },
      });
      res.send(car);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  export const getAllCarsOfUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const allCarsOfUser = await prisma.car.findMany({
        where: { 
          userEmail: email,
          isActive: true,
        },
        
      });
      res.status(200).send(allCarsOfUser);
    } catch (err) {
      throw new Error(err.message);
    }
  });
  
  export const softDeleteCar = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const car = await prisma.car.update({
        where: { id },
        data: { isActive: false },
      });
      res.send({ message: "Car deleted successfully", car });
    } catch (err) {
      throw new Error(err.message);
    }
  });

  export const getAllDeletedCarsOfUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const allDeletedCarsOfUser = await prisma.car.findMany({
        where: { 
          userEmail: email,
          isActive: false,
        },
        
      });
      res.status(200).send(allDeletedCarsOfUser);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  export const recoverDeletedCar = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const car = await prisma.car.update({
        where: { id },
        data: { isActive: true },
      });
      res.send({ message: "Car recovered successfully", car });
    } catch (err) {
      throw new Error(err.message);
    }
  });

  export const updateCar = asyncHandler(async (req, res) => {
    const { carId } = req.params; // Extract carId from the URL params
    const {
      manufacturer,
      model,
      description,
      price,
      address,
      country,
      city,
      details,
      image,
    } = req.body.data;
  
    try {
      // Use Prisma's update method to update the car
      const updatedCar = await prisma.car.update({
        where: { id: carId }, // Specify the car to update by its ID
        data: {
          manufacturer,
          model,
          description,
          price,
          address,
          country,
          city,
          details,
          image,
        },
      });
  
      res.send({ message: 'Car updated successfully', car: updatedCar });
    } catch (err) {
      // Handle errors, including unique constraint violations
      if (err.code === 'P2002') {
        const uniqueConstraint = err.meta.target[0];
        throw new Error(`Unique constraint violation: ${uniqueConstraint}`);
      }
      throw new Error(err.message);
    }
  });


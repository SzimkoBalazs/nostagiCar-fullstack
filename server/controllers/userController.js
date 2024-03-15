import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

export const createUser = asyncHandler(async (req, res) => {
    console.log("creating a user");
  
    let { email } = req.body;
    const userExists = await prisma.user.findUnique({ where: { email: email } });
    if (!userExists) {
      const user = await prisma.user.create({ data: req.body });
      res.send({
        message: "User registered successfully",
        user: user,
      });
    } else res.status(201).send({ message: "User already registered" });
  });

  export const getUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const userData = await prisma.user.findUnique({
        where: { email: email }
      });
      res.status(200).send(userData);
    } catch (err) {
      throw new Error(err.message);
    }
  });


// function to book a visit 
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This car is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("your visit is booked successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// funtion to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const bookings = await prisma.user.findUnique({
        where: { email },
        select: { bookedVisits: true },
      });
      res.status(200).send(bookings);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  // function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
        select: { bookedVisits: true },
      });
  
      const index = user.bookedVisits.findIndex((visit) => visit.id === id);
  
      if (index === -1) {
        res.status(404).json({ message: "Booking not found" });
      } else {
        user.bookedVisits.splice(index, 1);
        await prisma.user.update({
          where: { email },
          data: {
            bookedVisits: user.bookedVisits,
          },
        });
  
        res.send("Booking cancelled successfully");
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  // function to add a car in favourite list of a user
export const toFav = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const { cid } = req.params;
  
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (user.favCarsiD.includes(cid)) {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favCarsiD: {
              set: user.favCarsiD.filter((id) => id !== cid),
            },
          },
        });
  
        res.send({ message: "Removed from favorites", user: updateUser });
      } else {
        const updateUser = await prisma.user.update({
          where: { email },
          data: {
            favCarsiD: {
              push: cid,
            },
          },
        });
        res.send({ message: "Updated favorites", user: updateUser });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  // function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const favCars = await prisma.user.findUnique({
        where: { email },
        select: { favCarsiD: true },
      });
      res.status(200).send(favCars);
    } catch (err) {
      throw new Error(err.message);
    }
  });

  //function to get one user's cars
  export const getAllCarsOfUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const allCarsOfUser = await prisma.user.findUnique({
        where: { email },
        select: {ownedCars: true },
      });
      res.status(200).send(allCarsOfUser);
    } catch (err) {
      throw new Error(err.message);
    }
  });

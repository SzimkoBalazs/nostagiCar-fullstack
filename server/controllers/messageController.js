import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createMessage = asyncHandler( async (req, res) => {
  const { content, senderId, receiverId, carId } = req.body;
  console.log(req.body)
  const newMessage = await prisma.message.create({
    data: {
      content,
      sender: { connect: { id: senderId } },
      receiver: { connect: { id: receiverId } },
      car: { connect: { id: carId } },
    },
  });
  res.json(newMessage);
});

export const getMessagesForUser = asyncHandler (async (req, res) => {
  const { userId } = req.params;
  const messages = await prisma.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: true,
      receiver: true,
      car: true,
    },
  });

  const groupedMessages = {};

  messages.forEach((message) => {
    const carId = message.car.id;
    const otherUserId =
      message.senderId === userId ? message.receiverId : message.senderId;
    const conversationKey = `${carId}-${otherUserId}`;

    if (!groupedMessages[conversationKey]) {
      groupedMessages[conversationKey] = [];
    }

    groupedMessages[conversationKey].push(message);
  });

  res.json(groupedMessages);
});
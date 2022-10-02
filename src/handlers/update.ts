import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getUpdates = async (req: Request, res: Response) => {
  const updates = await prisma.update.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({ data: updates });
};

export const getUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.findUnique({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });

  res.json({ data: update });
};

export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.body.productId,
        userId: req.user.id,
      },
    },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      asset: req.body.asset,
      productId: product.id,
      userId: req.user.id,
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findFirst({
    where: {
      userId: req.user.id,
      updates: {
        some: {
          id: req.params.id,
        },
      },
    },
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const update = await prisma.update.update({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
    data: {
      title: req.body.title,
      body: req.body.body,
      asset: req.body.asset,
    },
  });

  res.json({ data: update });
};

export const deleteUpdate = async (req: Request, res: Response) => {
  const update = await prisma.update.delete({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });

  res.json({ data: update });
};

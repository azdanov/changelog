import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProducts = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json({ data: products });
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      userId: req.user.id,
    },
  });

  res.json({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.update({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.delete({
    where: {
      id_userId: {
        id: req.params.id,
        userId: req.user.id,
      },
    },
  });

  res.json({ data: product });
};

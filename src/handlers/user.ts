import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { comparePasswords, createJwt, hashPassword } from "../modules/auth";

const prisma = new PrismaClient();

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });

    const token = createJwt(user);
    res.json({ token });
  } catch (e) {
    if (e instanceof Error) {
      Object.assign(e, { type: "input" });
    }
    next(e);
  }
};

export const signin = async (req: Request, res: Response) => {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.json({ message: "invalid input" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(404).json("User not found");
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401).send("Invalid username or password");
    return;
  }

  const token = createJwt(user);
  res.json({ token });
};

import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const comparePasswords = (password: string, hash: string) => {
  return compare(password, hash);
};

export const hashPassword = (password: string) => {
  return hash(password, 10);
};

export const createJwt = (user: User) => {
  const token = jwt.sign({ id: user.id }, config.jwtSecret);
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    console.log("no bearer");
    res.status(401).send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("no token");
    res.status(401).send("Not authorized");
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(`Error ${e.message}: ${req.headers.authorization}`);
    } else {
      console.error(e);
    }
    res.status(401).send("Not authorized");
    return;
  }
};

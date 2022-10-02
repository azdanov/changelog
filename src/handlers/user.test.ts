import { createNewUser } from "./user";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

describe("user handler", function () {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("should create a new user", async () => {
    const req = { body: { username: "admin", password: "secret" } } as Request;
    const res = { json: jest.fn() } as unknown as Response;

    await createNewUser(req, res, jest.fn());

    expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
  });
});

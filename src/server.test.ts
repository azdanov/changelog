import server from "./server";
import request from "supertest";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("POST /user", function () {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it("responds with json", async () => {
    const res = await request(server)
      .post("/user")
      .send({ username: "admin", password: "secret" })
      .set("Accept", "application/json");

    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body.token).not.toBeNull();
  });
});

import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode, sign, verify } from "hono/jwt";
import { signupInputs } from "@pratikkamble199/medium-common";

export const userRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRoutes.post("/signup", async (c) => {
  console.log(c);
  // Every route get deploy independently. So we can't user global PrismaClient --> that's why we write prisma client in API route
  const prisma = new PrismaClient({
    //@ts-ignore // ignores typescript error
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInputs.safeParse(body);
  
  if(!success){
    c.status(411); // invalid/incorrect inputs
    return c.json({
      error: "invalid inputs",
    });
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
      name: body.name
    },
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    jwt: token,
  });
});

userRoutes.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  console.log(body)
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });
  
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (error) {
    c.status(404)
    return c.json({ message: "user not found" });
  }
});

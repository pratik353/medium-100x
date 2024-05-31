import { Hono } from "hono";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode, sign, verify } from "hono/jwt";
import { createBlogInputs } from "@pratikkamble199/medium-common";

//to get the right types on c.env, when initializing the Hono blogRoutes, pass the types of env as a generic
export const blogRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware in HONO
blogRoutes.use("/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const user = await verify(header, c.env.JWT_SECRET);
  try {
    if (user) {
      //@ts-ignore
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "Unauthorized" });
  }
});

blogRoutes.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const authorId = c.get("userId");
  const body = await c.req.json();

  const { success } = createBlogInputs.safeParse(body);

  if (!success) {
    c.status(411); // invalid/incorrect inputs
    return c.json({
      error: "invalid inputs",
    });
  }

  try {
    const blog = await prisma.blog.create({
      data: {
        content: body.content,
        title: body.title,
        authorId: authorId,
      },
    });

    return c.json({
      id: blog.id,
      message: "Blog is created",
    });
  } catch (error) {
    console.log(error);
    return c.json({
      error: "Blog not created",
    });
  }
});

blogRoutes.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  const body = await c.req.json();

  try {
    const blog = await prisma.blog.update({
      where: {
        id: id,
      },

      data: {
        content: body.content,
        title: body.title,
      },
    });

    return c.json({
      id: blog.id,
      message: "Blog is updated",
    });
  } catch (error) {
    console.log(error);
    return c.json({
      error: "Blog not created",
    });
  }
});

// TODO: Add pagination

blogRoutes.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findMany({
      // select: {
      //   title: true,
      // },
    });

    return c.json({
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      error: "Blogs not found",
    });
  }
});

blogRoutes.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: id,
      },
    });

    return c.json({
      data: blog,
    });
  } catch (error) {
    console.log(error);
    return c.json({
      error: "Blog  not found",
    });
  }
});

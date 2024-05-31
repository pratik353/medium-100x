import { Hono } from "hono";

import { cors } from "hono/cors";

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

import { decode, sign, verify } from "hono/jwt";
import { userRoutes } from "./routes/userRoutes";
import { blogRoutes } from "./routes/blogRoutes";

//to get the right types on c.env, when initializing the Hono app, pass the types of env as a generic
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors())
// c --> context -> you will get all info in context
app.get("/", async (c) => {
  return c.text("Server running");
});

app.route("/api/v1/user", userRoutes)
app.route("/api/v1/blog", blogRoutes)


export default app;
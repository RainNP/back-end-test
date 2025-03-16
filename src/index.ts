import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { UserCreateRequest, UserResponse } from "./model/userModel";
import { PrismaClient } from '@prisma/client'
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const prisma = new PrismaClient()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// just simple api

app.post("/api/users", async (req: Request, res: Response) => {
  try {
    const user: UserCreateRequest = req.body;
    // add user data
    await prisma.users.create({
      data: {
        name: user.name
      }
    });
    res.status(200).json({ message: "User created successfully" });
    return;
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
    return;
  }
});

app.get("/api/users", async (req: Request, res: Response) => {
  try{
    const user = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        profileImage: true,
        status: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    res.status(200).json(user as UserResponse[]);
    return;
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
    return;
  };
});

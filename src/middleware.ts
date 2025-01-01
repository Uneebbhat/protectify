import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MiddlewareOptions } from "./types";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export function protectRoute({
  secretKey,
  role,
  errorMessage = "Access denied. No token provided.",
}: MiddlewareOptions) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(403).send(errorMessage);

    jwt.verify(token, secretKey, (err, user: any) => {
      if (err) return res.status(403).send("Invalid token.");

      if (role && user.role !== role) {
        return res.status(403).send("Access denied. Insufficient permissions.");
      }

      req.user = user;
      next();
    });
  };
}

import { MiddlewareOptions } from "./types";

export function protectRoute({ token, role }: MiddlewareOptions) {
  console.log(`Hello ${role} ${token}`);
}

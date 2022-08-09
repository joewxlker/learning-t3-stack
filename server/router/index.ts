// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { sendgridRouter } from "./routes";

export const appRouter = createRouter()

  //appRouter = main router
  .transformer(superjson)
  .merge("sendgrid.", sendgridRouter)
// .merge merges all routes with merge into appRouter

// export type definition of API
export type AppRouter = typeof appRouter;


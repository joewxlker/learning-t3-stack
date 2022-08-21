// src/server/router/index.ts
import { createRouter } from "./context";
import { z } from "zod";
import { MailDataRequired } from "@sendgrid/mail";

export const appRouter = createRouter()
  //appRouter = main router
  .mutation('send-email', {
    input: z.object({
      email: z.string(),
      firstname: z.string(),
      lastname: z.string(),
      message: z.string()
    }),
    async resolve({ ctx, input }) {
      console.log(input)
      ctx.sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)
      try {
        const contact: MailDataRequired = {
          to: process.env.OWNER!,
          from: process.env.EMAIL!,
          subject: ` New customer contact email sent from ${input.email}`,
          text: `${input.message}  Sent from tRPC Portfolio`
        }
        await ctx.sendgrid.send(contact)
        return true;
      } catch (err) {
        return false
      }
    }
  }
  )
// .merge merges all routes with merge into appRouter

// export type definition of API
export type AppRouter = typeof appRouter;


import { MailDataRequired } from "@sendgrid/mail";
import { createRouter } from "./context";
import { z } from 'zod';

export const sendgridRouter = createRouter()
  .mutation('send-email', {

    input: z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string(),
      message: z.string()
    }),

    async resolve({ ctx }) {

      ctx.sendgrid.setApiKey(process.env.SENDGRID_API_KEY!)
      console.log(ctx.req?.body)
      try {
        const contact: MailDataRequired = {
          to: process.env.OWNER!,
          from: process.env.EMAIL!,
          subject: ` New customer contact email sent from ${ctx.req?.body.email}`,
          text: `${ctx.req?.body.message} <br/> Sent from tRPC Portfolio`
        }
        //TODO add request params and conditional email templates
        await ctx.sendgrid.send(contact)
        return true;
      } catch (err) {
        return { result: false }
      }
    }
  }
  )

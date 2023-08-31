import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const notesRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ ctx, input }) => {
      const { text } = input;
      return ctx.prisma.note.create({ data: { text } });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.note.findMany();
  }),
});

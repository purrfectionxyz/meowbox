import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  user: {
    accounts: r.many.account({
      from: r.user.id,
      to: r.account.userId,
    }),
    sessions: r.many.session({
      from: r.user.id,
      to: r.session.userId,
    }),
    drawings: r.many.drawing({
      from: r.user.id,
      to: r.drawing.userId,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  drawing: {
    user: r.one.user({
      from: r.drawing.userId,
      to: r.user.id,
    }),
  },
}));

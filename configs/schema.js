import { serial, varchar, boolean } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const Users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    imageUrl: varchar('imageUrl').notNull(),
    subscription: boolean('subscription').default(false),
    isRecruiter: boolean('isRecruiter').default(false),
});

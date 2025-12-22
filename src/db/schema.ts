import { pgTable, text, timestamp, integer } from "drizzle-orm/pg-core";

/* ================= USERS ================= */

export const users = pgTable("users", {
  id: text("id").primaryKey(), // clerk userId
  email: text("email").notNull(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ================= INTERVIEW SETUP ================= */

export const interviewSetups = pgTable("interview_setups", {
  id: text("id").primaryKey(),
  userId: text("user_id"),

  role: text("role").notNull(),
  jobDescription: text("job_description").notNull(),
  experience: integer("experience").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

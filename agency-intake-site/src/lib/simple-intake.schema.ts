import { z } from "zod";

export const simpleIntakeSchema = z.object({
	name: z.string().min(2, "Name is required"),
	company: z.string().min(2, "Company is required"),
	role: z.enum(["owner", "manager", "employee", "investor", "other"]),
	email: z.string().email("Valid email required"),
	urgency: z.enum(["soon", "no_rush"]),
	turnstileToken: z.string().optional()
});

export type SimpleIntake = z.infer<typeof simpleIntakeSchema>;



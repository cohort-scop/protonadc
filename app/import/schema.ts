import { z } from 'zod';

const eventSchema = z.object({
  id: z.string(),
  begin_at: z.string(),
  end_at: z.string(),
  title: z.string(),
  description: z.string(),
  verbatims: z.array(z.string()),
  linked_to: z.string().nullable(),
})

const factorSchema = z.object({
  code: z.string(),
  name: z.string(),
  verbatim: z.string(),
})

const qualificationSchema = z.object({
  C1_repetition: z.boolean(),
  C2_impact_negatif: z.boolean(),
  C3_desequilibre_pouvoirs: z.boolean(),
  C4_absence_dialogue: z.boolean(),
})

export const testimonySchema = z.object({
  id: z.string(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  anonymous: z.boolean(),
  statut: z.string(),
  type: z.string(),
  facts: z.array(z.string()),
  events: z.array(eventSchema),
  factors: z.array(factorSchema),
  qualification: qualificationSchema.nullable(),
})

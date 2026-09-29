import { z } from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(
      5,
      "Naslov mora imati najmanje 5 karaktera."
    )
    .max(
      120,
      "Naslov može imati najviše 120 karaktera."
    ),

  excerpt: z
    .string()
    .trim()
    .min(
      20,
      "Kratak opis mora imati najmanje 20 karaktera."
    )
    .max(
      300,
      "Kratak opis može imati najviše 300 karaktera."
    ),

  content: z
    .string()
    .trim()
    .min(
      50,
      "Detaljan tekst mora imati najmanje 50 karaktera."
    ),

  publishedAt: z
    .string()
    .min(
      1,
      "Datum objave je obavezan."
    ),

  category: z.enum(
    ["school", "eco"],
    {
      message:
        "Odaberite vrstu novosti.",
    }
  ),
});

export type NewsFormValues =
  z.infer<typeof newsSchema>;
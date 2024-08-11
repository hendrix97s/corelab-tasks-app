import { z } from "zod";

export const projectStoreSchema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatório."),
  statuses: z
    .array(
      z.object({
        name: z.string().max(255).nonempty(), // equivalent to 'required|string|max:255'
        color: z.string().max(255).nonempty(), // equivalent to 'required|string|max:255'
      })
    )
    .optional(), // equivalent to 'array', making it optional
});

export type projectStoreSchemaFormProps = z.infer<typeof projectStoreSchema>;

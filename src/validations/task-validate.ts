import { z } from "zod";

export const taskStoreSchema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatório."),
  status_id: z.number().nonnegative("O campo status é obrigatório"),
});

export type taskStoreSchemaFormProps = z.infer<typeof taskStoreSchema>;

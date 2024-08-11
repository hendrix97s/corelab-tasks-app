import { z } from "zod";

export const taskListStoreSchema = z.object({
  name: z.string().nonempty("O campo Nome é obrigatório."),
});

export type taskListStoreSchemaFormProps = z.infer<typeof taskListStoreSchema>;

import { EnumTodoFilterType } from "./store";

export const filters = [
  {
    filter: EnumTodoFilterType.ALL,
    label: "Show all"
  },
  {
    filter: EnumTodoFilterType.ACTIVE,
    label: "Active tasks"
  },
  {
    filter: EnumTodoFilterType.COMPLETED,
    label: "Completed tasks"
  }
]
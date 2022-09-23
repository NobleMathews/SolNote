import { useWorkspace } from "@/composables";
import { Note } from "@/models";

export const getNote = async (publicKey) => {
  const { program } = useWorkspace();
  const account = await program.value.account.note.fetch(publicKey);
  return new Note(publicKey, account);
};

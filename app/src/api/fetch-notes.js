import { useWorkspace } from "@/composables";
import { Note } from "@/models";
export const fetchNotes = async (filters = []) => {
  const { program } = useWorkspace();
  const notes = await program.value.account.note.all(filters);
  return notes.map((note) => new Note(note.publicKey, note.account));
};

export const authorFilter = (pub_key) => ({
  memcmp: {
    offset: 8,
    bytes: pub_key,
  },
});

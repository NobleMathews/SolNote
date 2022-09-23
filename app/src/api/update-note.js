import { useWorkspace } from "@/composables";

export const updateNote = async (note, content) => {
  const { wallet, program } = useWorkspace();
  await program.value.rpc.updateNote(content, {
    accounts: {
      author: wallet.value.publicKey,
      note: note.publicKey,
    },
  });

  note.content = content;
};

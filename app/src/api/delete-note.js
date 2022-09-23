import { useWorkspace } from "@/composables";

export const deleteNote = async (note) => {
  const { wallet, program } = useWorkspace();
  await program.value.rpc.deleteNote({
    accounts: {
      author: wallet.value.publicKey,
      note: note.publicKey,
    },
  });
};

import { web3 } from "@project-serum/anchor";
import { useWorkspace } from "@/composables";
import { Note } from "@/models";

export const sendNote = async (content) => {
  const { wallet, program } = useWorkspace();
  const note = web3.Keypair.generate();
  await program.value.rpc.sendNote(content, {
    accounts: {
      author: wallet.value.publicKey,
      note: note.publicKey,
      systemProgram: web3.SystemProgram.programId,
    },
    signers: [note],
  });

  const noteAccount = await program.value.account.note.fetch(note.publicKey);
  return new Note(note.publicKey, noteAccount);
};

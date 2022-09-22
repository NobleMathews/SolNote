import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaNotepad } from "../target/types/solana_notepad";
import * as assert from "assert";

describe("solana-notepad", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.SolanaNotepad as Program<SolanaNotepad>;

  it('can create a new note', async () => {
    // Execute the "SendNote" instruction.
    const note = anchor.web3.Keypair.generate();
    await program.rpc.sendNote('I am a note on the blockchain! WOOHHOOOO', {
        accounts: {
            note: note.publicKey,
            author: program.provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [note],
    });

    // Fetch the account details of the created note.
    const noteAccount = await program.account.note.fetch(note.publicKey);

    // Ensure it has the right data.
    assert.equal(noteAccount.author.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(noteAccount.content, 'I am a note on the blockchain! WOOHHOOOO');
    assert.ok(noteAccount.timestamp);
});

it('can consume sols and create a note', async () => {
  const other = anchor.web3.Keypair.generate();
  const signature = await program.provider.connection.requestAirdrop(other.publicKey, anchor.web3.LAMPORTS_PER_SOL)
  const latestBlockHash = await program.provider.connection.getLatestBlockhash();
  await program.provider.connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: signature,
  });
  const note = anchor.web3.Keypair.generate();
  await program.rpc.sendNote('Sols are tasty!', {
      accounts: {
          note: note.publicKey,
          author: other.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [other, note],
  });

  // Fetch the account details of the created note.
  const noteAccount = await program.account.note.fetch(note.publicKey);

  // Ensure it has the right data.
  assert.equal(noteAccount.author.toBase58(), other.publicKey.toBase58());
  assert.equal(noteAccount.content, 'Sols are tasty!');
  assert.ok(noteAccount.timestamp);
});

it('can reject if content more than 500 characters', async () => {
  try {
      const note = anchor.web3.Keypair.generate();
      await program.rpc.sendNote('x'.repeat(501), {
          accounts: {
              note: note.publicKey,
              author: program.provider.wallet.publicKey,
              systemProgram: anchor.web3.SystemProgram.programId,
          },
          signers: [note],
      });
  } catch (error) {
      assert.equal(error.msg, 'The provided content should not be longer than 500 characters');
      return;
  }

  assert.fail('The instruction should have failed');
});

it('can filter notes by author', async () => {
  const authorPublicKey = program.provider.wallet.publicKey
  const noteAccounts = await program.account.note.all([
      {
          memcmp: {
              offset: 8, // Discriminator.
              bytes: authorPublicKey.toBase58(),
          }
      }
  ]);

  // assert.equal(noteAccounts.length, 1);
  assert.ok(noteAccounts.every(noteAccount => {
      return noteAccount.account.author.toBase58() === authorPublicKey.toBase58()
  }))
});



});

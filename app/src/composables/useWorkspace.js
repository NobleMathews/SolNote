import { useAnchorWallet } from "solana-wallets-vue";
import { Connection, PublicKey } from "@solana/web3.js";
import { Provider, Program } from "@project-serum/anchor";
import idl from "../../../target/idl/solana_notepad.json";
import { computed } from "vue";

const programID = new PublicKey(idl.metadata.address);
const preflightCommitment = "processed";
const commitment = "processed";
let workspace = null;

export const useWorkspace = () => workspace;

export const initWorkspace = () => {
  const wallet = useAnchorWallet();
  const connection = new Connection("http://127.0.0.1:8899", {
    preflightCommitment,
    commitment,
  });
  const provider = computed(() => new Provider(connection, wallet.value, {}));
  const program = computed(() => new Program(idl, programID, provider.value));

  workspace = {
    wallet,
    connection,
    provider,
    program,
  };
};

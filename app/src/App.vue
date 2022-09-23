<script setup>
import { useRoute } from "vue-router";
import MainSidebar from "./components/MainSidebar";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolongWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { initWallet } from "solana-wallets-vue";
import { initWorkspace } from "./composables";

const route = useRoute();

const wallets = [
  new PhantomWalletAdapter(),
  new SolongWalletAdapter(),
  new SolflareWalletAdapter(),
  new SolletWalletAdapter(),
  new SlopeWalletAdapter(),
];

initWallet({ wallets, autoConnect: true });
initWorkspace();
</script>

<template>
  <div class="w-full max-w-4xl lg:max-w-5xl mx-auto">
    <main-sidebar
      class="py-4 md:py-8 md:pl-4 md:pr-8 fixed w-20 md:w-64"
    ></main-sidebar>
    <main class="flex-1 border-r border-l ml-20 md:ml-64 min-h-screen">
      <header
        class="flex space-x-6 items-center justify-between px-8 py-4 border-b"
      >
        <div class="text-xl font-bold" v-text="route.name"></div>
      </header>
      <router-view></router-view>
    </main>
  </div>
</template>

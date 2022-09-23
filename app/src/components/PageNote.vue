<script setup>
import { ref, watchEffect } from "vue";
import { PublicKey } from "@solana/web3.js";
import { getNote } from "@/api";
import { useFromRoute } from "@/composables";
import NoteCard from "@/components/NoteCard";

const noteAddress = ref(null);
useFromRoute((route) => (noteAddress.value = route.params.note));

const loading = ref(false);
const note = ref(null);
watchEffect(async () => {
  try {
    loading.value = true;
    note.value = await getNote(new PublicKey(noteAddress.value));
  } catch (e) {
    note.value = null;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading" class="p-8 text-gray-500 text-center">Loading...</div>
  <div v-else-if="!note" class="p-8 text-gray-500 text-center">
    Note not found
  </div>
  <note-card
    v-else
    :note="note"
    @delete="$router.push({ name: 'SolNote' })"
  ></note-card>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { fetchNotes, authorFilter } from "@/api";
import NoteForm from "@/components/NoteForm";
import NoteList from "@/components/NoteList";
import { useWorkspace } from "@/composables";

const notes = ref([]);
const loading = ref(true);
const { wallet } = useWorkspace();

watchEffect(() => {
  if (!wallet.value) return;
  fetchNotes([authorFilter(wallet.value.publicKey.toBase58())])
    .then((fetchedNotes) => (notes.value = fetchedNotes))
    .finally(() => (loading.value = false));
});

const addNote = (note) => notes.value.push(note);
</script>

<template>
  <note-form @added="addNote"></note-form>
  <div v-if="wallet" class="border-b px-8 py-4 bg-gray-50">
    <note-list :notes="notes" :loading="loading"></note-list>
  </div>
</template>

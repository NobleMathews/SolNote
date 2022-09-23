<script setup>
import { computed, toRefs } from "vue";
import NoteCard from "@/components/NoteCard";

const props = defineProps({
  notes: Array,
  loading: Boolean,
});

const emit = defineEmits(["update:notes"]);

const onDelete = (deletedNote) => {
  const filteredNotes = notes.value.filter(
    (note) => note.publicKey.toBase58() !== deletedNote.publicKey.toBase58()
  );
  emit("update:notes", filteredNotes);
};

const { notes, loading } = toRefs(props);
const orderedNotes = computed(() => {
  return notes.value.slice().sort((a, b) => b.timestamp - a.timestamp);
});
</script>

<template>
  <div v-if="loading" class="p-8 text-gray-500 text-center">Loading...</div>
  <div v-else class="divide-y">
    <note-card
      v-for="note in orderedNotes"
      :key="note.key"
      :note="note"
      @delete="onDelete"
    ></note-card>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  note: Object,
});

const { note } = toRefs(props);
</script>

<template>
  <div class="px-8 py-4">
    <router-link
      :to="{ name: 'Note', params: { note: note.publicKey.toBase58() } }"
    >
      <time class="text-gray-500 text-sm" :title="note.created_at">
        <div>
          {{ note.created_ago }}
        </div>
      </time>
      <p class="whitespace-pre-wrap" v-text="note.content"></p>
    </router-link>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  note: Object,
});

const { note } = toRefs(props);
</script>

<template>
  <div class="px-8 py-4">
    <div>
      <span class="text-gray-500"> • </span>
      <time class="text-gray-500 text-sm" :title="note.created_at">
        <!-- TODO: Link to the note page. -->
        <router-link :to="{ name: 'SolNote' }" class="hover:underline">
          {{ note.created_ago }}
        </router-link>
      </time>
    </div>
    <p class="whitespace-pre-wrap" v-text="note.content"></p>
  </div>
</template>

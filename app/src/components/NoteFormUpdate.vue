<script setup>
import { computed, ref, toRefs } from "vue";
import { useAutoresizeTextarea, useCountCharacterLimit } from "@/composables";
import { updateNote } from "@/api";
import { useWallet } from "solana-wallets-vue";
// Props.
const props = defineProps({
  note: Object,
});
const { note } = toRefs(props);
const content = ref(note.value.content);
const textarea = ref();
useAutoresizeTextarea(textarea);
const characterLimit = useCountCharacterLimit(content, 500);
const characterLimitColour = computed(() => {
  if (characterLimit.value < 0) return "text-red-500";
  if (characterLimit.value <= 10) return "text-yellow-500";
  return "text-gray-400";
});
// Permissions.
const { connected } = useWallet();
const canNote = computed(() => content.value && characterLimit.value > 0);
// Actions.
const emit = defineEmits(["close"]);
const update = async () => {
  if (!canNote.value) return;
  await updateNote(note.value, content.value);
  emit("close");
};
</script>

<template>
  <div v-if="connected">
    <div class="px-8 py-4 border-l-4 border-red-500">
      <div class="py-1">
        <router-link
          :to="{ name: 'Note', params: { note: note.publicKey.toBase58() } }"
        >
          <time class="text-gray-500 text-sm" :title="note.created_at">
            <div>
              {{ note.created_ago }}
            </div>
          </time>
        </router-link>
      </div>

      <!-- Content field. -->
      <textarea
        ref="textarea"
        rows="1"
        class="text-xl w-full focus:outline-none resize-none mb-3"
        placeholder="Editable Area"
        v-model="content"
      ></textarea>

      <div class="flex flex-wrap items-center justify-between -m-2">
        <div class="flex items-center space-x-4 m-2 ml-auto">
          <!-- Character limit. -->
          <div :class="characterLimitColour">{{ characterLimit }} left</div>

          <!-- Close button. -->
          <button
            class="text-gray-500 px-4 py-2 rounded-full border bg-white hover:bg-gray-50"
            @click="emit('close')"
          >
            Cancel
          </button>

          <!-- Note button. -->
          <button
            class="text-white px-4 py-2 rounded-full font-semibold"
            :disabled="!canNote"
            :class="canNote ? 'bg-red-500' : 'bg-red-300 cursor-not-allowed'"
            @click="update"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
    Connect your wallet to start noteing...
  </div>
</template>

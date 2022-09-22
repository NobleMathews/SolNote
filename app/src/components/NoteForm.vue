<script setup>
import { computed, ref } from "vue";
import { useAutoresizeTextarea, useCountCharacterLimit } from "@/composables";
import { sendNote } from "@/api";

// Form data.
const content = ref("");

// Auto-resize the content's textarea.
const textarea = ref();
useAutoresizeTextarea(textarea);

// Character limit / count-down.
const characterLimit = useCountCharacterLimit(content, 500);
const characterLimitColour = computed(() => {
  if (characterLimit.value < 0) return "text-red-500";
  if (characterLimit.value <= 10) return "text-yellow-500";
  return "text-gray-400";
});

// Permissions.
const connected = ref(true); // TODO: Check connected wallet.
const canNote = computed(() => content.value && characterLimit.value > 0);

// Actions.
const emit = defineEmits(["added"]);
const send = async () => {
  if (!canNote.value) return;
  const note = await sendNote(content.value);
  emit("added", note);
  content.value = "";
};
</script>

<template>
  <div v-if="connected" class="px-8 py-4 border-b">
    <!-- Content field. -->
    <textarea
      ref="textarea"
      rows="1"
      class="text-xl w-full focus:outline-none resize-none mb-3"
      placeholder="Your Note 🖊️ here!"
      v-model="content"
    ></textarea>

    <div class="flex flex-wrap items-center justify-between -m-2">
      <div class="flex items-center space-x-6 m-2 ml-auto">
        <!-- Character limit. -->
        <div :class="characterLimitColour">{{ characterLimit }} left</div>

        <!-- Note button. -->
        <button
          class="text-black px-4 py-2 rounded-full font-semibold"
          :disabled="!canNote"
          :class="
            canNote ? 'bg-yellow-500' : 'bg-yellow-300 cursor-not-allowed'
          "
          @click="send"
        >
          Note
        </button>
      </div>
    </div>
  </div>

  <div v-else class="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
    Connect your wallet to start noteing...
  </div>
</template>

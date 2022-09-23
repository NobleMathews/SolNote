<script setup>
import { ref, toRefs, computed } from "vue";
import { useWorkspace } from "@/composables";
import { deleteNote } from "@/api";
import NoteFormUpdate from "./NoteFormUpdate";

import { router } from "../../src/main";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTrash, faEdit, faLink } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
const $toast = useToast();

library.add(faTrash, faEdit, faLink);

const emit = defineEmits(["delete"]);
const props = defineProps({
  note: Object,
});

const onDelete = async () => {
  await deleteNote(note.value);
  emit("delete", note.value);
  $toast.error("Note deleted successfully");
};

const onCopy = (key) => {
  const resolved = router.resolve({
    name: "Note",
    params: { note: key.toBase58() },
  });
  const absoluteURL = new URL(resolved.href, window.location.origin).href;
  navigator.clipboard.writeText(absoluteURL);
  $toast.success("Link to Note copied to clipboard!");
};

const { note } = toRefs(props);
const { wallet } = useWorkspace();
const isMyNote = computed(
  () =>
    wallet.value &&
    wallet.value.publicKey.toBase58() === note.value.author.toBase58()
);
const isEditing = ref(false);
</script>

<template>
  <note-form-update
    v-if="isEditing"
    :note="note"
    @close="isEditing = false"
  ></note-form-update>
  <div class="px-8 py-4" v-else>
    <div class="flex justify-between">
      <div class="py-1">
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
        <br />
        <div class="flex" v-if="isMyNote">
          <button
            @click="isEditing = true"
            class="flex px-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100"
            title="Update Note"
          >
            <font-awesome-icon :icon="['fas', 'edit']" />
          </button>
          <button
            @click="onCopy(note.publicKey)"
            class="flex px-2 rounded-full text-gray-500 hover:text-green-500 hover:bg-gray-100"
            title="Copy Link to Note"
          >
            <font-awesome-icon :icon="['fas', 'link']" />
          </button>
          <button
            @click="onDelete"
            class="flex px-2 rounded-full text-gray-500 hover:text-blue-500 hover:bg-gray-100"
            title="Delete Note"
          >
            <font-awesome-icon :icon="['fas', 'trash']" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

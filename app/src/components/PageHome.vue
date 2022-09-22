<script setup>
import { ref } from 'vue'
import { fetchNotes } from '@/api'
import NoteForm from '@/components/NoteForm'
import NoteList from '@/components/NoteList'

const notes = ref([])
const loading = ref(true)
fetchNotes()
    .then(fetchedNotes => notes.value = fetchedNotes)
    .finally(() => loading.value = false)

const addNote = note => notes.value.push(note)
</script>

<template>
    <note-form @added="addNote"></note-form>
    <note-list :notes="notes" :loading="loading"></note-list>
</template>

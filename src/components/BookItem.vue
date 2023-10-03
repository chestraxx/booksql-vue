<template>
  <div class="px-4 mb-12">
    <div>
      <router-link :to="`/books/${book.id}`">
        <img :src="book.image" alt="" class="h-64 mb-2" />
      </router-link>
    </div>

    <div class="text-lg font-bold text-black hover:text-purple-600 mb-1">
      <router-link :to="`/books/${book.id}`">
        {{ book.title }}
      </router-link>
    </div>

    <div class="text-gray-600">
      {{ book.author }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['book'])
const book = computed(() => props.book || null)
</script>

<style></style>

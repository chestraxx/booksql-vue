<template>
  <div class="book">
    <ApolloQuery :query="queryBook" :variables="{ id: $route.params.id }">
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <div v-else-if="error" class="error apollo">An error occurred {{ error }}</div>

        <div v-else-if="data" class="result apollo">
          <a href="#" class="link-margin"> {{ data.book.id }} | {{ data.book.title }} </a>

          <div>
            {{ data.book.author }}
          </div>

          <div>
            {{ data.book.description }}
          </div>

          <div>
            {{ data.book.link }}
          </div>

          <div>
            {{ data.book.featured }}
          </div>

          <div>
            <img :src="data.book.image" alt="" />
          </div>

          <div>
            <router-link :to="`/books/${data.book.id}/edit`">Edit</router-link>
            <a href="#" @click.prevent="deleteBook">Delete</a>
          </div>
        </div>

        <div v-else class="no-result apollo">No result :</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import router from '@/router'

import { queryBook } from '@/graphql/queries/Book.js'
import { queryBookDelete } from '@/graphql/mutations/BookDelete.js'

const { mutate: doDeleteBook, onDone } = useMutation(queryBookDelete)
onDone((response) => {
  console.log(response)
  router.push('/')
})

const id = ref(router.currentRoute.value.params.id)
function deleteBook() {
  doDeleteBook({ id: id.value })
}
</script>

<style></style>

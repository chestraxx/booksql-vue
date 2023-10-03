<template>
  <div class="flex justify-center">
    <div class="book container">
      <ApolloQuery :query="queryBook" :variables="{ id: $route.params.id }">
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading" class="loading apollo">Loading...</div>

          <div v-else-if="error" class="error apollo">An error occurred {{ error }}</div>

          <div v-else-if="data" class="flex mt-16 flex-col lg:flex-row">
            <div>
              <img :src="data.book.image" alt="" />
            </div>

            <div class="w-full lg:w-2/3 ml-0 mt-8 lg:mt-0 lg:ml-16">
              <div class="text-4xl font-bold">
                {{ data.book.title }}
              </div>

              <div class="text-2xl text-gray-600 mb-8">
                {{ data.book.author }}
              </div>

              <div class="text-xl text-gray-600 leading-normal">
                {{ data.book.description }}
              </div>

              <div class="my-12">
                <a
                  :href="data.book.link"
                  target="_blank"
                  class="border border-solid border-purple-600 text-purple-600 rounded px-4 py-4 mr-4 hover:bg-purple-600 hover:text-white"
                >
                  View link
                </a>
              </div>

              <div>
                <router-link :to="`/books/${data.book.id}/edit`" class="hover:text-purple-600">
                  Edit
                </router-link>
                &middot;
                <a href="#" @click.prevent="deleteBook" class="hover:text-purple-600">Delete</a>
              </div>
            </div>
          </div>

          <div v-else class="no-result apollo">No result :</div>
        </template>
      </ApolloQuery>
    </div>
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

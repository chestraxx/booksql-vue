<template>
  <div class="main">
    <div class="hero bg-gray-200 flex justify-center mb-24">
      <div class="container flex flex-col lg:flex-row lg:justify-center py-10">
        <div class="mt-10 mx-5 lg:mx-0">
          <h1 class="lg:w-3/4 w-full mb-4 text-4xl font-bold">
            Book Recommendation site build with GraphQL
          </h1>
          <p class="lg:w-3/4 mb-6 leading-normal">
            Built with Laravel (lighthouse GraphQL), Vue.js (vue-apollo) and Tailwind CSS
          </p>
          <div class="flex items-center">
            <a href="#" class="bg-purple-600 text-white rounded px-4 py-4 mr-4 hover:bg-purple-600">
              View Books
            </a>

            <a
              href="#"
              class="border border-solid border-purple-600 text-purple-600 rounded px-4 py-4 mr-4 hover:bg-purple-600 hover:text-white"
            >
              View Screencasts
            </a>
          </div>
        </div>
        <div class="mt-10 lg:mt-0 flex lg:justify-normal justify-center">
          <img src="../assets/hero.svg" alt="hero" />
        </div>
      </div>
    </div>

    <div class="flex justify-center">
      <div class="container">
        <div class="flex flex-wrap -mx-4">
          <div class="w-full lg:w-1/4 px-4">
            <ApolloQuery :query="queryCategories">
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>

                <div v-else-if="error" class="error apollo">An error occurred</div>

                <ul v-else-if="data" class="list-reset text-lg">
                  <li class="mb-6">
                    <a
                      href="#"
                      class="hover:text-purple-600"
                      @click.prevent="selectCategory({ id: 'all' })"
                    >
                      All
                    </a>
                  </li>
                  <li class="mb-6">
                    <a
                      href="#"
                      class="hover:text-purple-600"
                      @click.prevent="selectCategory({ id: 'featured' })"
                    >
                      Featured
                    </a>
                  </li>
                  <li v-for="category in data.categories" :key="category.id" class="mb-6">
                    <a
                      href="#"
                      class="hover:text-purple-600"
                      @click.prevent="selectCategory({ id: category.id })"
                    >
                      {{ category.name }}
                    </a>
                  </li>

                  <li class="mb-6">
                    <router-link :to="`/books/create`" class="hover:text-purple-600">
                      Add a book
                    </router-link>
                  </li>
                </ul>

                <div v-else class="no-result apollo">No result :</div>
              </template>
            </ApolloQuery>
          </div>

          <div class="w-full lg:w-3/4 px-4">
            <ApolloQuery v-if="selectedCategory === 'all'" :query="queryToLoadBook">
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>

                <div v-else-if="error" class="error apollo">An error occurred</div>

                <div v-else-if="data" class="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3">
                  <BookItem
                    v-for="book in data.books"
                    :key="book.id"
                    :book="book"
                    class="px-4 mb-12"
                  />
                </div>

                <div v-else class="no-result apollo">No result :</div>
              </template>
            </ApolloQuery>

            <ApolloQuery
              v-else-if="selectedCategory === 'featured'"
              :query="queryToLoadBook"
              :variables="{ featured: true }"
            >
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>

                <div v-else-if="error" class="error apollo">An error occurred {{ error }}</div>

                <div v-else-if="data" class="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3">
                  <BookItem v-for="book in data.booksByFeatured" :key="book.id" :book="book" />
                </div>

                <div v-else class="no-result apollo">No result :</div>
              </template>
            </ApolloQuery>

            <ApolloQuery v-else :query="queryToLoadBook" :variables="{ id: selectedCategory }">
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>

                <div v-else-if="error" class="error apollo">An error occurred</div>

                <div v-else-if="data" class="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-3">
                  <BookItem v-for="book in data.category?.books" :key="book.id" :book="book" />
                </div>

                <div v-else class="no-result apollo">No result :</div>
              </template>
            </ApolloQuery>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { queryCategories } from '@/graphql/queries/Categories.js'
import { queryCategory } from '@/graphql/queries/Category.js'
import { queryBooks } from '@/graphql/queries/Books.js'
import { queryBooksByFeatured } from '@/graphql/queries/BooksByFeatured.js'

import BookItem from '@/components/BookItem.vue'

const selectedCategory = ref('all')
const queryToLoadBook = ref(queryBooks)
const selectCategory = ({ id }) => {
  if (id === 'all') {
    queryToLoadBook.value = queryBooks
  } else if (id === 'featured') {
    queryToLoadBook.value = queryBooksByFeatured
  } else {
    queryToLoadBook.value = queryCategory
  }

  selectedCategory.value = id
}
</script>

<style></style>

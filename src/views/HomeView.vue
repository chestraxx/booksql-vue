<template>
  <div class="main">
    <router-link :to="`/books/create`">Book Create</router-link>

    <ApolloQuery :query="queryCategories">
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <div v-else-if="error" class="error apollo">An error occurred</div>

        <div v-else-if="data" class="result apollo">
          <a href="#" class="link-margin" @click.prevent="selectCategory({ id: 'all' })">All</a>
          <a href="#" class="link-margin" @click.prevent="selectCategory({ id: 'featured' })">
            Featured
          </a>
          <a
            href="#"
            v-for="category in data.categories"
            :key="category.id"
            class="link-margin"
            @click.prevent="selectCategory({ id: category.id })"
          >
            {{ category.id }} {{ category.name }}
          </a>
        </div>

        <div v-else class="no-result apollo">No result :</div>
      </template>
    </ApolloQuery>

    <div v-if="selectedCategory === 'all'">
      <ApolloQuery :query="queryToLoadBook">
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading" class="loading apollo">Loading...</div>

          <div v-else-if="error" class="error apollo">An error occurred</div>

          <div v-else-if="data" class="result apollo">
            <div v-for="book in data.books" :key="book.id">
              <router-link :to="`/books/${book.id}`" class="link-margin">
                {{ book.id }} | {{ book.title }}
              </router-link>

              <div>
                {{ book.author }}
              </div>

              <div>
                <img :src="book.image" alt="" />
              </div>
            </div>
          </div>

          <div v-else class="no-result apollo">No result :</div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else-if="selectedCategory === 'featured'">
      <ApolloQuery :query="queryToLoadBook" :variables="{ featured: true }">
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading" class="loading apollo">Loading...</div>

          <div v-else-if="error" class="error apollo">An error occurred {{ error }}</div>

          <div v-else-if="data" class="result apollo">
            <div v-for="book in data.booksByFeatured" :key="book.id">
              <router-link :to="`/books/${book.id}`" class="link-margin">
                {{ book.id }} | {{ book.title }}
              </router-link>

              <div>
                {{ book.author }}
              </div>

              <div>
                <img :src="book.image" alt="" />
              </div>
            </div>
          </div>

          <div v-else class="no-result apollo">No result :</div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else>
      <ApolloQuery :query="queryToLoadBook" :variables="{ id: selectedCategory }">
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading" class="loading apollo">Loading...</div>

          <div v-else-if="error" class="error apollo">An error occurred</div>

          <div v-else-if="data" class="result apollo">
            <div v-for="book in data.category?.books" :key="book.id">
              <router-link :to="`/books/${book.id}`" class="link-margin">
                {{ book.id }} | {{ book.title }}
              </router-link>

              <div>
                {{ book.author }}
              </div>

              <div>
                <img :src="book.image" alt="" />
              </div>
            </div>
          </div>

          <div v-else class="no-result apollo">No result :</div>
        </template>
      </ApolloQuery>
    </div>

    <!-- <div>
      <a
        href="#"
        v-for="category in categoriesResult?.categories"
        :key="category.id"
        class="link-margin"
        @click="selectCategory({ id: category.id })"
      >
        {{ category.id }} {{ category.name }}
      </a>
    </div> -->

    <!-- <div>
      <a href="#" v-for="book in booksResult?.books" :key="book.id" class="">
        {{ book.id }} {{ book.title }}
      </a>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { queryCategories } from '@/graphql/queries/Categories.js'
import { queryCategory } from '@/graphql/queries/Category.js'
import { queryBooks } from '@/graphql/queries/Books.js'
import { queryBooksByFeatured } from '@/graphql/queries/BooksByFeatured.js'

// const categoriesResponse = useQuery(queryCategories, null)
// const categoriesResult = categoriesResponse.result

// const booksResponse = useQuery(queryBooks, null)
// const booksResult = booksResponse.result

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

<style>
.link-margin {
  margin-right: 24px;
}
</style>

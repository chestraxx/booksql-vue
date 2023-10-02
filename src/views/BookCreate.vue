<template>
  <div class="create container mt-12">
    <h1 class="mb-4">Create Book</h1>
    <form action="#" method="POST" @submit.prevent="createBook">
      <div class="form-group">
        <label class="font-bold mb-2" for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="author">Author</label>
        <input type="text" name="author" id="author" v-model="author" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="image">Image</label>
        <input type="text" name="image" id="image" v-model="image" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          v-model="description"
        ></textarea>
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="link">Link</label>
        <input type="text" name="link" id="link" v-model="link" />
      </div>
      <div class="form-group">
        <label class="font-bold mb-2"
          ><input type="checkbox" name="featured" v-model="featured" class="mr-2" />Featured</label
        >
      </div>
      <div class="form-group">
        <ApolloQuery :query="queryCategories">
          <template v-slot="{ result: { data, loading }, isLoading }">
            <div v-if="isLoading || loading">Loading...</div>
            <select v-else v-model="category">
              <option v-for="category of data.categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </template>
        </ApolloQuery>
      </div>

      <div class="form-group">
        <button type="submit">Add book</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import router from '@/router'

import { queryCategories } from '@/graphql/queries/Categories.js'
import { queryBookCreate } from '@/graphql/mutations/BookCreate.js'

const title = ref('')
const author = ref('')
const image = ref('')
const description = ref('')
const link = ref('')
const featured = ref(false)
const category = ref(1)

const { mutate: doCreateBook, onDone } = useMutation(queryBookCreate)

onDone((response) => {
  console.log(response)
  router.push('/')
})

function createBook() {
  doCreateBook({
    title: title.value,
    author: author.value,
    image: image.value,
    link: link.value,
    description: description.value,
    featured: featured.value,
    category: category.value
  })
}
</script>

<style scoped>
.form-group {
  margin-bottom: 32px;
}
input[type='text'],
textarea {
  padding: 10px 14px;
  border: 1px solid lightgray;
  border-radius: 5px;
}

label {
  display: block;
}

button {
  padding: 16px;
  background: #027bff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}
</style>

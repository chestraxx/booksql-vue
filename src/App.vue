<template>
  <div id="app" class="font-sans antialiased text-black">
    <div id="nav" class="bg-purple-600 flex justify-center">
      <div class="container flex items-center justify-between py-4">
        <div>
          <a href="/">
            <img src="./assets/logo.svg" alt="logo" class="w-10" />
          </a>
        </div>

        <div>
          <router-link to="/" class="text-white hover:text-gray-200">Home</router-link> |
          <router-link to="/login" class="text-white hover:text-gray-200">Login</router-link> |
          <a class="text-white hover:text-gray-200" href="#" @click.prevent="logOut">Logout</a>
        </div>
      </div>
    </div>

    <RouterView />
  </div>
</template>

<script setup>
import router from '@/router'

import { useMutation } from '@vue/apollo-composable'
import { logErrorMessages } from '@vue/apollo-util'
import { queryLogOut } from '@/graphql/mutations/LogOut.js'

const { mutate: doLogOut, onDone, onError } = useMutation(queryLogOut)
onDone(() => {
  router.push(`/`)
})
onError((error) => {
  logErrorMessages(error)
})

function logOut() {
  doLogOut()
}
</script>

<style scoped></style>

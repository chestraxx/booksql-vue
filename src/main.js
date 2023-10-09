import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApolloProvider } from '@vue/apollo-option'

import VueApolloComponents from '@vue/apollo-components'

import App from './App.vue'
import router from './router'

const cache = new InMemoryCache()

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('apollo-token')
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    }
  })

  return forward(operation)
})

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_VUE_APP_GRAPHQL_HTTP}/graphql`
})

const apolloClient = new ApolloClient({
  cache,
  link: authMiddleware.concat(httpLink)
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
  defaultOptions: {
    $query: {
      fetchPolicy: 'no-cache'
    }
  }
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})

app.use(createPinia())
app.use(router)
app.use(apolloProvider)

app.use(VueApolloComponents)

app.mount('#app')

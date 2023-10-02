import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BookView from '@/views/BookView.vue'
import BookCreate from '@/views/BookCreate.vue'
import BookEdit from '@/views/BookEdit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books/create',
      name: 'bookCreate',
      component: BookCreate
    },
    {
      path: '/books/:id/edit',
      name: 'bookEdit',
      component: BookEdit
    },
    {
      path: '/books/:id',
      name: 'book',
      component: BookView
    }
  ]
})

export default router

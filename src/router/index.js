import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import TaskView from '@/views/TaskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks.index',
      component: IndexView
    },
    {
      path: '/:id',
      name: 'tasks.show',
      component: TaskView
    },
  ]
})

export default router;

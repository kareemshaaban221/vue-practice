/**
 * @file src/router/index.js
 * @module router
 * @author Kareem Mohamed <kareemshaaban221@gmail.com>
 * @since 1.0.0
 */

import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import TaskView from '@/views/TaskView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'auth.login',
      component: LoginView
    },
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

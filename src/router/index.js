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
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'auth.login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'auth.register',
      component: RegisterView
    },
    {
      path: '/tasks',
      name: 'tasks.index',
      component: IndexView
      // beforeEnter: (to, from, next) => {
      //   if (localStorage.getItem('token')) {
      //     next({ name: 'tasks.index' });
      //   } else {
      //     next();
      //   }
      // }
    },
    {
      path: '/tasks/:id',
      name: 'tasks.show',
      component: TaskView
      // beforeEnter: (to, from, next) => {
      //   if (localStorage.getItem('token')) {
      //     next({ name: 'tasks.index' });
      //   } else {
      //     next();
      //   }
      // }
    },
  ]
})

export default router;

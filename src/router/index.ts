import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '@/views/LoginView.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import AttendanceDetailsView from '../views/AttendanceDetailsView.vue'
import ModalTestView from '../views/ModalTestView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage,
    },
    {
      path: '/attendanceDetails/:id',
      name: 'AttendanceDetails',
      component: AttendanceDetailsView,
      props: (route) => ({
        id: Number(route.params.id),
        initialName: route.query.name as string,
      }),
    },
    {
      path: '/modalTest',
      name: 'ModalTest',
      component: ModalTestView,
    },
  ],
})

export default router

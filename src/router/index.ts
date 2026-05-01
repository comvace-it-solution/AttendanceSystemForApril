import { createRouter, createWebHistory } from 'vue-router'
// 各画面をインポート
// import LoginView from '@/views/LoginView.vue'
import AttendanceDetailsView from '../views/AttendanceDetailsView.vue'

const router = createRouter({

  history: createWebHistory(),
  routes: [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: LoginView
    // },
    {
      path: '/attendanceDetails',
      name: 'AttendanceDetails',
      component: AttendanceDetailsView
    },
  ]
})

export default router
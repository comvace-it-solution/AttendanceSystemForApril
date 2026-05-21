import { createRouter, createWebHistory } from 'vue-router'
// ログイン画面をインポート
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import EmployeeRegister from '@/views/EmployeeRegister.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView,
    },
    // 従業員登録
    {
      path: '/register',
      name: 'EmployeeRegister',
      component: EmployeeRegister,
    },
  ],
})

export default router

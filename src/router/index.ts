import { createRouter, createWebHistory } from 'vue-router'
// ログイン画面をインポート
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import EmployeeRegister from '@/views/EmployeeRegister.vue'
import EmployeeEdit from '@/views/EmployeeEdit.vue'
import EmployeeDetail from '@/views/EmployeeDetail.vue'

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
    // 従業員編集
    {
      path: '/edit/:id',
      name: 'EmployeeEdit',
      component: EmployeeEdit,
    },
    // 従業員詳細
    {
      path: '/detail/:id',
      name: 'EmployeeDetail',
      component: EmployeeDetail,
    },
  ],
})

export default router

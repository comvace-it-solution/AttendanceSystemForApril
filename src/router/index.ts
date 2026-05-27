import { createRouter, createWebHistory } from 'vue-router'
// 各画面をインポート
import LoginView from '@/views/LoginView.vue'
import DashboardPage from '@/views/DashboardPage.vue'
// import AttendanceDetailsView from '@/views/AttendanceDetailsView.vue'
import EmployeeList from '@/views/EmployeeList.vue'
import EmployeeRegisterView from '@/views/EmployeeRegisterView.vue'
// import EmployeeEditView from '@/views/EmployeeEditView.vue'
import EmployeeDetailView from '@/views/EmployeeDetailView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ログイン
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    // ダッシュボード
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage,
    },
    // 勤怠詳細
    // {
    //   path: '/attendanceDetails/:id',
    //   name: 'AttendanceDetails',
    //   component: AttendanceDetailsView,
    //   props: (route) => ({
    //     id: Number(route.params.id),
    //     initialName: route.query.name as string,
    //   }),
    // },
    // 従業員一覧
    {
      path: '/EmployeeList',
      name: 'EmployeeList',
      component: EmployeeList,
    },
    // 従業員登録
    {
      path: '/register',
      name: 'EmployeeRegister',
      component: EmployeeRegisterView,
    },
    // 従業員編集
    // {
    //   path: '/edit/:id',
    //   name: 'EmployeeEdit',
    //   component: EmployeeEditView,
    // },
    // 従業員詳細
    {
      path: '/detail/:id',
      name: 'EmployeeDetail',
      component: EmployeeDetailView,
    },
  ],
})

export default router

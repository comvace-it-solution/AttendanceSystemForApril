import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
// 各画面をインポート
import LoginView from '@/views/LoginView.vue';
import DashboardPage from '@/views/DashboardPage.vue';
import AttendanceDetailsView from '@/views/AttendanceDetailsView.vue';
import EmployeeList from '@/views/EmployeeList.vue';
import EmployeeRegisterView from '@/views/EmployeeRegisterView.vue';
import EmployeeEditView from '@/views/EmployeeEditView.vue';
import EmployeeDetailView from '@/views/EmployeeDetailView.vue';
import LearningAppView from '@/views/LearningAppView.vue';
import LearningGlossaryView from '@/views/LearningGlossaryView.vue';
// import ModalTestView from '../views/ModalTestView.vue'

const router = createRouter({
  history:
    import.meta.env.BASE_URL === '/'
      ? createWebHistory(import.meta.env.BASE_URL)
      : createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/learning',
    },
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
    {
      path: '/attendanceDetails/:id',
      name: 'AttendanceDetails',
      component: AttendanceDetailsView,
      props: (route) => ({
        id: Number(route.params.id),
        initialName: (window.history.state?.name as string) || '',
      }),
    },
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
    {
      path: '/edit/:id',
      name: 'EmployeeEdit',
      component: EmployeeEditView,
    },
    // 従業員詳細
    {
      path: '/detail/:id',
      name: 'EmployeeDetail',
      component: EmployeeDetailView,
    },
    // TypeScript学習
    {
      path: '/learning',
      name: 'Learning',
      component: LearningAppView,
    },
    {
      path: '/learning/glossary',
      name: 'LearningGlossary',
      component: LearningGlossaryView,
    },
    // モーダルテスト
    // {
    //   path: '/modalTest',
    //   name: 'ModalTest',
    //   component: ModalTestView,
    // },
  ],
});

export default router;

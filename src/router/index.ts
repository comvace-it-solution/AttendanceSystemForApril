import { createRouter, createWebHistory } from "vue-router";
// 各画面をインポート
// import LoginView from '@/views/LoginView.vue'
import AttendanceDetailsView from "../views/AttendanceDetailsView.vue";
import EmployeeList from "../views/EmployeeList.vue";
import EmployeeRegister from "../views/EmployeeRegister.vue";
import EmployeeEdit from "../views/EmployeeEdit.vue";
import EmployeeDetail from "../views/EmployeeDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: LoginView
    // },
    {
      path: "/attendanceDetails/:id",
      name: "AttendanceDetails",
      component: AttendanceDetailsView,
      props: (route) => ({
        id: Number(route.params.id),
        initialName: route.query.name as string,
      }),
    },
    {
      path: "/EmployeeList",
      name: "EmployeeList",
      component: EmployeeList,
    },
    {
      path: "/register",
      name: "EmployeeRegister",
      component: EmployeeRegister,
    },
    {
      path: "/edit/:id",
      name: "EmployeeEdit",
      component: EmployeeEdit,
    },
    {
      path: "/detail/:id",
      name: "EmployeeDetail",
      component: EmployeeDetail,
    },
  ],
});

export default router;

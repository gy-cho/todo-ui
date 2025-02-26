import { createRouter, createWebHistory } from 'vue-router';
import BoardList from '@/components/Board/BoardList.vue';
import BoardDetail from '@/components/Board/BoardDetail.vue'
import TodosList from '@/components/Todo/TodosList.vue';
import Login from '@/components/Login/Login.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

  {
    path: '/todo',
    name: 'Todos',
    component: TodosList,
  },
  {
    path: '/board',
    name: 'Board',
    component: BoardList,
  },
  {
    path: '/board/:boardId',
    name: 'BoardDetail',
    component: BoardDetail,
  },

  {
    path: '/',
    redirect: '/login',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

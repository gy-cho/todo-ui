<template>
  <div class="container">
    <div class="card-s">
      <button @click="login('D209001')">Admin 계정으로 로그인</button>
      <button @click="login('D230057')">조경란 계정으로 로그인</button>
      <button @click="login('D123456')">홍길동 계정으로 로그인</button>
    </div>  
  </div>
</template>

<script>
import { login } from '@/services/loginApi';

export default {
  name: 'TodosList',
  data() {
    return {
      boards: [],
    };
  },
  methods: {
    async login(userId) {
      localStorage.removeItem('token');
      const result = await login(userId);

      localStorage.setItem('token', result.token);
    },
  },
};
</script>
<style scoped>
button {
  width: 100%;
  height: 40px;
  text-align: left;
  background-color: white;
  border: 1px solid #ddd;
  color: black;
  font-weight: 500;
}

button + button {
  margin-top: 10px;
}
</style>
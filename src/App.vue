<template>
  <div id="app">
    <nav>
      <router-link to="/todo">Todo List</router-link> |
      <router-link to="/board">Board List</router-link>
    </nav>
    <router-view></router-view>
  </div>
  <!-- <TodosList msg="Welcome to Your Vue.js App"/> -->
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

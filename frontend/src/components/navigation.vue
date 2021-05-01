<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/news">News</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/todo">ToDo</router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped>
  #nav {
    padding: 30px;
    display: flex;
    justify-content: center;
  }
  #nav a {
    margin: 5px;
  }
</style>

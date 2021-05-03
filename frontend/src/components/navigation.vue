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

<style lang="sass">
  #nav
    padding: 30px
    display: flex
    justify-content: center
    a
      margin: 5px
</style>

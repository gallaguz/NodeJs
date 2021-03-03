<template>
  <div>
    <div v-for="data in categories" class="block">
      <h3>
        {{ data.title }}
      </h3>
      <ul>
        <li
            v-for="el in data.data"
            v-bind:url="el.url"
            v-on:click="handleClick(el)"
        >
          {{ el.title }}
        </li>
      </ul>
    </div>

    <div v-if="newsList.length">
      <h3>
        {{ category}}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      categories: [],
      category: '',
      newsList : []
    }
  },
  methods: {
    handleClick(el) {
      this.category = el.title;
      this.newsList.push('lol');
      console.log(el)

      fetch('http://localhost:3000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(el)
      })
          .then(response => response.json())
          .then((res) => {
            console.log(res)
            //this.categories = res;
          });
    },
    getCategories() {
      fetch('http://localhost:3000/api/categories')
          .then(response => response.json())
          .then((res) => {
            this.categories = res;
          });
    }
  },
  mounted() {
    this.getCategories();
  }
}
</script>

<style scoped>
li {
  display: inline-block;
  padding-right: 5px;
}
</style>
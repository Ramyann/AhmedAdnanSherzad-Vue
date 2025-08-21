<template>
  <div class="search">
    <h1>Search Results</h1>
    <p>Displaying results for: {{ query }}</p>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    query: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.search {
  text-align: center;
  padding: 2rem;
}
</style>

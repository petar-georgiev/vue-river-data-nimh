<template>
  <div id="app">
    <h3>Select a table:</h3>
    <select ref="select" v-model="selectedTable" @change="navigateToTable">
      <option value="">Select a table</option>
      <option value="DunabeBasin">Дунавски басейн</option>
      <option value="BlackSeaBasin">Черноморски басейн</option>
    </select>
    <br><br>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      selectedTable: ''
    }
  },
  methods: {
    navigateToTable() {
      if (this.selectedTable === 'DunabeBasin') {
        this.$router.push({ name: 'riverRoute', params: { basein: 'dunabeBasin' } });
      } else if (this.selectedTable === 'BlackSeaBasin') {
        this.$router.push('/api/blackSeaBasin');
      }
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

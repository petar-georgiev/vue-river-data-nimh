<template>
  <div id="app">
    <h3>Select a table:</h3>
    <select ref="select" v-model="selectedTable" @change="navigateToTable">
      <option value="">Select a table</option>
      <option value="DunabeBasin">Дунавски басейн</option>
      <option value="BlackSeaBasin">Черноморски басейн</option>
      <option value="EasternWhiteSeaBasin">Източнобеломорски басейн</option>
      <option value="WesternWhiteSeaBasin">Западнобеломорски басейн</option>
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
        this.$router.push({ name: 'riverRoute', params: { basein: 'blackSeaBasin' } });
      } else if (this.selectedTable === 'EasternWhiteSeaBasin') {
        this.$router.push({ name: 'riverRoute', params: { basein: 'easternWhiteSeaBasin' } });
      } else if(this.selectedTable === 'WesternWhiteSeaBasin') {
        this.$router.push({ name: 'riverRoute', params: { basein: 'westernWhiteSeaBasin' } });
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

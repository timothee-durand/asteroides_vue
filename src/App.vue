<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created() {
    let params = {
    params : {
      start_date:"2020-11-20",
          end_date: "2020-11-27",
          api_key: "ImcCTL1HchrPNRcUJXadRJdVWCN88bJKvPkINGl2"
    }
    };
    // // params.append("start_date", "2020-11-20");
    // params.append("end_date", "2020-11-27");
    // params.append("api_key", "ImcCTL1HchrPNRcUJXadRJdVWCN88bJKvPkINGl2");

    axios.get("https://api.nasa.gov/neo/rest/v1/feed", params).then(reponse => console.log(reponse));
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

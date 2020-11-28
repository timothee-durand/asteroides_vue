<template>
  <v-app>
    <v-app-bar app>
      <h1>Astéroides</h1>

    </v-app-bar>
    <v-navigation-drawer app>
      <v-date-picker
          v-model="date"
          width="90%"
      ></v-date-picker>
      <v-btn
          color="accent"
          elevation="1"
          large
          outlined
          rounded
          @click="requestAsteroides"
      >Astériodes please
      </v-btn>

    </v-navigation-drawer>


    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card v-for="asteroide in listeAsteroide" :key="asteroide.name">

          <asteroide :asteroide="asteroide" :img="getRandomImg()"/>


        </v-card>

      </v-container>
    </v-main>

    <v-footer app>
      <p>Test de l'API de la NASA. Copyright 2020 - Timothée DURAND</p>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'
import params from "@/params.js";
import Asteroide from "@/Asteroide.vue";

export default {
  name: 'App',

  components: {Asteroide},

  data: () => ({
    listeAsteroide: [],
    numberAsteroide: 0,
    date: "",
    arrayPictures: [],
    param: params
  }),
  created() {
    this.arrayPictures = generateListImgUrl();
  },
  methods: {
    requestAsteroides() {
      console.log("Send");
      axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
        params: {
          start_date: this.date,
          end_date: this.date,
          api_key: params.apiKey,

        }
      }).then(response => {
        this.listeAsteroide = response.data.near_earth_objects[this.date];
        console.log(response.data.near_earth_objects);

      }).catch(error => console.log(error));
    },

    getRandomImg() {
      return this.arrayPictures[Math.floor(Math.random() * this.arrayPictures.length)] ;
    }
  },
};

function generateListImgUrl() {
  let arrayImg = [];

  for (let i = 0; i <= params.numberImageAsteroide - 1; i++) {
    arrayImg.push(params.urlAsteroides + i + ".png");
  }

  return arrayImg;
}


</script>

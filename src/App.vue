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
      >Astériodes please</v-btn>

    </v-navigation-drawer>


    <!-- Sizes your content based upon application components -->
    <v-main>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-card v-for="asteroide in listeAsteroide" :key="asteroide.name">
          <v-card-title>{{asteroide.name}}</v-card-title>
          <v-card-text>
            <p>Distance manquée : {{ parseInt(asteroide.close_approach_data[0].miss_distance.kilometers) | numeral('0.0 a')}} km</p>
            <p>Diamètre estimé : {{ parseInt(asteroide.estimated_diameter.meters.estimated_diameter_max) | numeral('0.0')}} m</p>
            <p v-if="asteroide.is_potentially_hazardous_asteroid">Menace de collision</p>
          </v-card-text>
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

export default {
  name: 'App',

  components: {

  },

  data: () => ({
    listeAsteroide:[],
    numberAsteroide:0,
    date:""
  }),
  created() {

  },
  methods: {
    requestAsteroides() {
      console.log("Send");
      axios.get('https://api.nasa.gov/neo/rest/v1/feed', {
        params:{
          start_date:this.date,
          end_date:this.date,
          api_key:params.apiKey
        }
      }).then(response => {
        this.listeAsteroide = response.data.near_earth_objects[this.date];
        console.log(response.data.near_earth_objects);

      }).catch(error => console.log(error));
    }
  },
};
</script>

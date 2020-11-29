<template>
  <v-app>

    <div class="background">
      <img src="/hero/fly_star.png" alt="" v-parallax.absY="0.3" class="bas" style="left:10%">
      <img src="/hero/planet2.png" alt="" v-parallax.centerx="0.4" class="haut" style="left:40%">

      <img src="/hero/spaceship.png" alt="" v-parallax.absY="0.5" class="bas" style="right:10%">
      <img src="/hero/planet3.png" alt="" v-parallax="0.7" class="bas" style="right: 30%;">
    </div>

    <v-container id="hero">
      <v-row align-content="center" justify="center">
        <v-col cols ="6">
          <v-container  v-parallax="0.2">
            <v-row>
              <v-col cols="4" offset="2"><h1>Astéroides</h1></v-col>
            </v-row>
            <v-row>
              <v-col cols="6" offset="1"><p>Vous avez toujours voulu savoir quels astéroïdes sont passés près de chez nous
                ? Vous êtes au bon endroit. Sélectionnez une date et...</p></v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="3" >
          <v-img src="/hero/main_planet.png" max-width="400px" max-height="400px" contain></v-img>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="5">
          <v-form @submit.prevent="requestAsteroides" data-pointer-events="true" id="formDate">
            <v-date-picker
                v-model="date"
                width="90%"
            ></v-date-picker>
            <v-btn
                color="accent"
                elevation="1"
                large
                dark
                rounded
                type="submit"
            >Astériodes please
            </v-btn>
          </v-form>
        </v-col>
      </v-row>


    </v-container>


    <v-main id="asteroides">
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <v-row align-content="center" justify="center">
          <asteroide :asteroide="asteroide" :img="getRandomImg()" v-for="asteroide in listeAsteroide"
                     :key="asteroide.name"/>
        </v-row>

      </v-container>
    </v-main>
    <p class="text-center">©Timothée DURAND, 2020 - Réalisé avec l'API de la <a href="https://api.nasa.gov/">Nasa</a> et des vecteurs de
      <a href="https://fr.freepik.com/home">Freepiks</a> et <a href="https://fr.vecteezy.com/vecteur-libre">Vecteezy</a>.</p>
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
  mounted() {

    this.arrayPictures = generateListImgUrl();

    this.$vuetify.theme.dark = true;


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
        this.$vuetify.goTo("#asteroides")

      }).catch(error => console.log(error));
    },

    getRandomImg() {
      return this.arrayPictures[Math.floor(Math.random() * this.arrayPictures.length)];
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

<style>
#hero {
  width: 100%;
  position: relative;
  padding-top: 10vh;

}

#formDate {
  background: black;
  border-radius:20px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#formDate> button {
  margin-top: 10px;
}

#app{
  background: none;
}

.background {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: #112341 ;

}

.background > * {
  position: absolute;
  width: 10%;
}

.background > .bas {
  bottom: 10%;
}

.background > .haut {
  top:20%;
}


</style>

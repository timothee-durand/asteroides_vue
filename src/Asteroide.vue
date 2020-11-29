<template>
  <v-card  class="asteroide">
    <v-container  >
      <v-row>
        <v-card-title>{{ asteroide.name }}</v-card-title>
      </v-row>
      <v-row align="center">
        <v-col cols="3">
          <v-img :src="img"></v-img>
        </v-col>

        <v-col cols="8">
          <v-card-text>
            <p>Distance manquée :
              {{ parseInt(asteroide.close_approach_data[0].miss_distance.kilometers) | numeral('0.0 a') }} km</p>
            <p>Diamètre estimé :
              {{ parseInt(asteroide.estimated_diameter.meters.estimated_diameter_max) | numeral('0.0') }} m</p>
            <p v-if="asteroide.is_potentially_hazardous_asteroid">Menace de collision</p>
          </v-card-text>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'asteroide',
  props: {
    asteroide: {},
    img: {
      type: String
    }
  }
}
</script>

<style>
  .asteroide {
    margin: 8px;
  }
</style>
<template>
  <v-footer :padless="true">
    <v-card flat tile width="100%" color="#CBC9BC" class="text-start py-15">
      <v-row class="mx-0 my-0" justify="space-around">
        <v-col cols="12" md="4">
          <v-img
            width="250"
            contain
            src="@/assets/img/edifier-logo-color.svg"
          ></v-img>
          <div class="mt-5">Politica de privacidad - Terminos de uso.</div>
          <div>© EDIFIER 2021 Todos los derechos reservados.</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-start justify-md-end">
            <v-icon class="black--text">mdi-facebook</v-icon>
            <v-icon class="black--text mx-1">mdi-instagram</v-icon>
            <v-icon class="black--text mx-1">mdi-youtube</v-icon>
            <v-icon class="black--text">mdi-whatsapp</v-icon>
          </div>
          <div class="d-md-flex mt-2">
            <span class="text-end mr-5">
              Cumplimos con la Resolución 270/2020 de la Secretaría de Comercio
              Interior del Ministerio de Desarrollo Productivo sobre la
              protección del Consumidor en el Comercio Electrónico
            </span>
            <v-img
              class="mt-2 mt-md-0 d-flex justify-end"
              contain
              width="5em"
              height="7em"
              src="@/assets/img/data-fiscal.jpeg"
            ></v-img>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-footer>
</template>

<script>
export default {};
</script>

<style>
.stadio_title {
  color: #8b8383;
  font-weight: 600;
  font-size: 4em;
}
</style>

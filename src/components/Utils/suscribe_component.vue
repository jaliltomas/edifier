<template>
  <v-responsive>
    <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-row justify="center" style="background-color: #ffffff" class="mt-11">
        <v-col cols="12" md="5">
          <div class="text-center suscribe-title">
            SÉ PARTE DE LA COMUNIDAD EDIFIER
          </div>
          <p class="text-center mt-5 suscribe-description">
            Suscribite a nuestro Newsletter y mantenete informado sobre nuevos
            lanzamientos, ofertas, promociones y más.
          </p>
        </v-col>
      </v-row>
      <v-row justify="center" class="mb-8">
        <v-col cols="12" sm="8" md="5" lg="4" class="mb-0 pb-0">
          <div class="px-5 d-flex">
            <v-text-field
              dense
              outlined
              single-line
              color="#00A0E9"
              label="EMAIL"
              :full-width="$vuetify.breakpoint.smAndDown ? true : false"
              style="
                width: 230px;
                border-color: #c9cdd9;
                border-radius: 0px;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
              "
            ></v-text-field>
            <v-btn
              class="elevation-0"
              style="
                border-radius: 0px;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
              "
              @click="passes(HandlerSuscribe)"
              color="#00A0E9"
              height="40px"
              :width="$vuetify.breakpoint.smAndUp ? '200px' : 'auto'"
              :loading="loading"
              dark
            >
              <span style="font-size: 1.2em">SUSCRIBITE</span>
            </v-btn>
          </div>
          <div class="text-center red--text" v-if="showError">
            El correo debe ser valido
          </div>
        </v-col>
      </v-row>
    </ValidationObserver>
  </v-responsive>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      email: "",
      showError: false,
    };
  },
  methods: {
    async HandlerSuscribe() {
      try {
        this.showError = false;
        if (
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            this.email
          )
        ) {
          this.loading = true;
          const request = {
            email: this.email,
            store_id: 3,
          };
          await this.$store.dispatch("products/SUSCRIBE_EMAIL", request);
          this.email = "";
          this.$refs.obs.reset();
          this.$snotify.success("Solicitud enviada", "Exitos!");
        } else {
          this.showError = true;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>

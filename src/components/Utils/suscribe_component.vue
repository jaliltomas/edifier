<template>
  <v-responsive>
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
        <ValidationObserver ref="obs" v-slot="{ passes }">
          <div class="px-5 d-flex">
            <ValidationProvider name="email" rules="email|required" v-slot="{ errors }">
              <v-text-field dense outlined single-line color="#00A0E9" label="EMAIL" v-model="email"
                :full-width="$vuetify.breakpoint.smAndDown ? true : false" style="
                  width: 230px;
                  border-color: #c9cdd9;
                  border-radius: 0px;
                  border-top-left-radius: 20px;
                  border-bottom-left-radius: 20px;
                "></v-text-field>
              <div class="red--text mt-md-n3" style="font-size: 0.8em">
                {{ errors[0] }}
              </div>
            </ValidationProvider>
            <v-btn class="elevation-0" style="
                border-radius: 0px;
                border-top-right-radius: 20px;
                border-bottom-right-radius: 20px;
              " @click="passes(HandlerSuscribe)" color="#00A0E9" height="40px"
              :width="$vuetify.breakpoint.smAndUp ? '200px' : 'auto'" :loading="loading" dark>
              <span style="font-size: 1.2em">SUSCRIBITE</span>
            </v-btn>
          </div>
        </ValidationObserver>
      </v-col>
    </v-row>
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
        this.loading = true;
        const request = {
          email: this.email,
          store_id: 3,
        };
        await this.$store.dispatch("products/SUSCRIBE_EMAIL", request);
        this.email = "";
        this.$refs.obs.reset();
        this.$snotify.success("Solicitud enviada", "Exitos!");
      } catch (error) {
        console.log(error);
        this.$snotify.error("Ha ocurrido un error intente mas tarde", "Error!");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>

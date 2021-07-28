<template>
  <v-responsive>
    <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-row justify="center" style="background-color: #ffffff" class="my-5">
        <v-col cols="12" md="5">
          <div
            class="text-center"
            style="font-color: #262626; font-size: 1.6em; font-weight: 400"
          >
            SÉ PARTE DE LA COMUNIDAD EDIFIER
          </div>
          <p class="text-center">
            Suscribite a nuestro Newsletter y mantenete informado sobre nuevos
            lanzamientos, ofertas, promociones y más
          </p>
        </v-col>
        <v-col cols="12" md="10">
          <div class="d-sm-flex d-md-flex justify-center">
            <ValidationProvider name="correo" rules="" v-slot="{ errors }">
              <v-text-field
                class="mx-5 mx-sm-0 mx-md-0 mb-0"
                v-model="email"
                outlined
                solo
                dense
                label="CORREO ELECTRÓNICO"
                color="#00A0E9"
                flat
                :full-width="$vuetify.breakpoint.smAndDown ? true : false"
                :style="
                  $vuetify.breakpoint.smAndUp
                    ? 'width: 230px; border-color: #C9CDD9; border-radius: 0px'
                    : 'width: auto; border-color: #C9CDD9; border-radius: 0px'
                "
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <v-btn
              dark
              class="ml-5 ml-sm-0 ml-md-0 mt-n6 mt-sm-0 mt-md-0 elevation-0"
              @click="passes(HandlerSuscribe)"
              color="#00A0E9"
              style="border-radius: 0px"
              height="40px"
              :width="$vuetify.breakpoint.smAndUp ? '230px' : 'auto'"
              :loading="loading"
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
            store_id: 1,
          };
          const response = await this.$store.dispatch(
            "products/SUSCRIBE_EMAIL",
            request
          );
          console.log(response.data);
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

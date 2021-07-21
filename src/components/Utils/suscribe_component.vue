<template>
  <v-responsive>
    <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-row justify="center" style="background-color: #dad8cc">
        <v-col cols="12" md="5" class="my-10">
          <div
            class="text-center"
            style="font-color: #262626; font-size: 1.6em; font-weight: 400"
          >
            SÉ PARTE DE NUESTRA COMUNIDAD
          </div>
          <p class="text-center">
            Suscribite a nuestro Newsletter y mantenete informado sobre nuevos
            lanzamientos, ofertas, promociones y mucho mas
          </p>
          <div class="d-md-flex justify-center">
            <ValidationProvider
              name="correo"
              rules="email|required"
              v-slot="{ errors }"
            >
              <v-text-field
                :full-width="true"
                width="309px"
                v-model="email"
                rounded
                outlined
                solo
                dense
                label="CORREO ELECTRÓNICO"
                color="#AA1A36"
                flat
                style="border-color: red"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
            <v-btn
              @click="passes(HandlerSuscribe)"
              :block="$vuetify.breakpoint.smAndDown ? true : false"
              outlined
              rounded
              color="#AA1A36"
              height="40px"
              :loading="loading"
            >
              <span style="font-size: 1.2em">SUSCRIBITE</span>
            </v-btn>
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
    };
  },
  methods: {
    async HandlerSuscribe() {
      try {
        this.loading = true;
        const request = {
          email: this.email,
          store_id: 1,
        };
        const response = await this.$store.dispatch(
          "products/SUSCRIBE_EMAIL",
          request
        );
        this.email = "";
        this.$refs.obs.reset();
        this.$snotify.success("Solicitud enviada", "Exitos!");
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

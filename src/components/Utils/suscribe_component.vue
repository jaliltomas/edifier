<template>
  <v-responsive class="subscribe-container">
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
      <ValidationObserver ref="obs" v-slot="{ passes }">
        <div class="px-5 d-flex" style="position:relative">
          <ValidationProvider name="email" rules="email|required" v-slot="{ errors }">
            <v-text-field dense outlined single-line color="#00A0E9" label="EMAIL" v-model="email"
              class = "email-input"
              :full-width="$vuetify.breakpoint.smAndDown ? true : false" style="
                border-color: #c9cdd9;
                border-radius: 0px;
                border-top-left-radius: 20px;
                border-bottom-left-radius: 20px;
              "></v-text-field>
            <div class="red--text mt-md-n3 error-message" style="font-size: 0.8em">
              {{ errors[0] }}
            </div>
          </ValidationProvider>
          <v-btn class="elevation-0 btn-input" style="
              border-radius: 0px;
              border-top-right-radius: 20px;
              border-bottom-right-radius: 20px;
            " @click="passes(HandlerSuscribe)" color="#00A0E9" height="40px"
            :loading="loading" dark>
            <span style="font-size: 1.2em">SUSCRIBITE</span>
          </v-btn>
        </div>
      </ValidationObserver>
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
  .subscribe-container{
    padding: 0 20px;
  }
  .email-input{
    width: 330px;
  }
  .btn-input{
    width: 200px;
  }
  .error-message{
    font-size: 0.8em;
    position: absolute;
    margin-top: -14px;
    width: 100%;
  }
  @media only screen and (max-width: 800px) {
    .email-input{
      width: 230px;
    }
    .btn-input{
      width: 135px;
    }
    .btn-input .v-btn__content span{
      font-size: 15px !important;
    }
    .table-list {
    /* Estilos para la lista */
    display: flex;
    flex-direction: column;
    /* ...otros estilos que desees aplicar */
  }
  }
  @media only screen and (max-width: 550px) {
    .email-input{
      width: 180px;
    }
    .btn-input{
      width: 120px;
    }
    .btn-input .v-btn__content span{
      font-size: 14px !important;
    }
  }
</style>

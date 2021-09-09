<template>
  <ValidationObserver ref="obs" v-slot="{ passes }">
    <v-card color="white" tile class="elevation-0">
      <v-card-text v-if="getAuthUser.buyer != null">
        <v-row class="mx-5 my-5" justify="center">
          <v-col cols="12" md="6" class="mt-md-0">
            <label for="nombre" class="font-weight-bold">NOMBRE</label>
            <ValidationProvider
              name="Nombre"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="getAuthUser.buyer.first_name"
                class="mt-2 elevation-0"
                dense
                color="#00A0E9"
                filled
                flat
                placeholder="Ingresa tu nombre"
                :error-messages="errors"
              >
              </v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6" class="mt-md-0">
            <label for="apellido" class="font-weight-bold">APELLIDO</label>
            <ValidationProvider
              name="Nombre"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="getAuthUser.buyer.last_name"
                class="mt-2 elevation-0"
                color="#00A0E9"
                filled
                dense
                flat
                placeholder="Ingresa tu apellido"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6" class="mt-md-n5">
            <label for="tipo documento" class="text-uppercase font-weight-bold">
              Tipo Documento
            </label>
            <ValidationProvider
              name="Tipo de documento"
              rules="required"
              v-slot="{ errors }"
            >
              <v-select
                :items="['DNI', 'CUIT']"
                v-model="getAuthUser.buyer.doc_type"
                class="mt-2"
                color="#00A0E9"
                filled
                dense
                flat
                placeholder="Selecciona tu tipo de documento"
                :error-messages="errors"
              ></v-select>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6" class="mt-md-n5">
            <label for="documento" class="text-uppercase font-weight-bold">
              Numero de Documento
            </label>
            <ValidationProvider
              name="Numero de documento"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="getAuthUser.buyer.doc_number"
                class="mt-2"
                color="#00A0E9"
                filled
                dense
                flat
                placeholder="Ingresa tu documento de identidad"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6" class="mt-md-n5">
            <label for="telefono" class="text-uppercase font-weight-bold">
              Telefono
            </label>
            <ValidationProvider
              name="Numero de telefono"
              rules="required|numeric"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="getAuthUser.buyer.phone"
                class="mt-2"
                color="#00A0E9"
                filled
                dense
                flat
                placeholder="Ingresa tu numero de telefono"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="6" class="mt-md-n5">
            <ValidationProvider
              name="Correo"
              rules="email|required"
              v-slot="{ errors }"
            >
              <label for="email" class="text-uppercase font-weight-bold">
                Correo
              </label>
              <v-text-field
                v-model="getAuthUser.buyer.email"
                class="mt-2"
                color="#00A0E9"
                filled
                dense
                flat
                placeholder="Ingresa tu correo electronico"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <div class="d-flex justify-center my-5">
          <v-btn
            :loading="loading"
            @click="passes(HandlerUpdateProfile)"
            rounded
            elevation="0"
            dark
            color="#00A0E9"
            width="250"
            class="text-capitalize"
          >
            Actualizar
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      errorText: "",
      activeNotificacion: false,
    };
  },
  computed: {
    getAuthUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
  },
  methods: {
    async HandlerUpdateProfile() {
      try {
        this.loading = true;
        const request = {
          fullname: `${this.getAuthUser.buyer.first_name} ${this.getAuthUser.buyer.last_name}`,
          doc_type: this.getAuthUser.buyer.doc_type,
          doc_number: this.getAuthUser.buyer.doc_number,
          phone: this.getAuthUser.buyer.phone,
          email: this.getAuthUser.buyer.email,
          billing_email: this.getAuthUser.buyer.email,
          first_name: this.getAuthUser.buyer.first_name,
          last_name: this.getAuthUser.buyer.last_name,
          store_id: 1,
          contact_phone: this.getAuthUser.buyer.phone,
        };
        await this.$store.dispatch("auth/UPDATE_USER", request);
        this.$snotify.success(
          "Has actualizado tu informacion correctamente",
          "Exitos!"
        );
      } catch (error) {
        console.log(error.response.data.error.err_message);
        this.errorText = error.response.data.error.err_message;
        this.activeNotificacion = true;
        // this.$snotify.error(error.response.data.error.err_message, "Error!");
      } finally {
        this.loading = false;
      }
    },

    HandlerCloseAlert() {
      this.errorText = "";
      this.activeNotificacion = false;
    },
  },
};
</script>

<style>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #00a0e9 !important;
}
</style>
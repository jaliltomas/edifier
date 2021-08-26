<template>
  <v-card
    class="animate__animated animate__backInUp"
    width="600"
    flat
    style="
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
      border-radius: 20px !important;
    "
  >
    <div class="text-center" style="font-size: 2em; font-weight: 380">
      Bienvenido
    </div>
    <div
      class="text-center mt-3 mb-5"
      style="font-size: 0.87em; font-weight: 400; line-height: 1.375rem"
    >
      Registra tu cuenta
    </div>

    <ValidationObserver ref="obsReg" v-slot="{ passes }">
      <v-row>
        <v-col cols="12" md="6" class="mt-2">
          <label
            style="color: #666666"
            class="font-weight-bold ml-3"
            for="nombre"
            >Nombre</label
          >
          <ValidationProvider
            name="nombre"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="first_name"
              class="mt-2 pl-3 pr-3 px-sm-3 pr-md-0"
              color="black"
              dense
              filled
              flat
              placeholder="Ingresa tu nombre"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6" class="mt-2">
          <label
            style="color: #666666"
            class="font-weight-bold ml-3 ml-md-0"
            for="Codigo Postal"
          >
            Codigo Postal
          </label>
          <ValidationProvider
            name="codigo postal"
            rules="required|min:4|max:4|numeric"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="postal_code"
              class="mt-2 ml-3 ml-sm-3 ml-md-0 pr-3"
              color="black"
              dense
              filled
              flat
              placeholder="Ingresa tu codigo postal"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6" class="mt-md-n5">
          <ValidationProvider
            name="correo"
            rules="email|required|confirmed:email_confirmation"
            v-slot="{ errors }"
          >
            <label style="color: #666666" class="font-weight-bold ml-3" for="email">
              Correo Electrónico
            </label>
            <v-text-field
              autocomplete="off"
              v-model="email"
              class="mt-2 pl-3 pr-3 pr-sm-3 pr-md-0"
              color="black"
              dense
              filled
              flat
              placeholder="Ingresa tu correo electronico"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6" class="mt-md-n5">
          <ValidationProvider
            name="confirmar correo"
            rules="email|required"
            v-slot="{ errors }"
            vid="email_confirmation"
          >
            <label
              style="color: #666666"
              class="font-weight-bold ml-3 ml-md-0"
              for="email confirmar"
            >
              Confirmar Correo
            </label>
            <v-text-field
              autocomplete="off"
              v-model="email_confirmation"
              class="mt-2 pr-3 ml-3 ml-sm-3 ml-md-0"
              color="black"
              dense
              filled
              flat
              placeholder="Confrima tu correo electronico"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6" class="mt-md-n5">
          <ValidationProvider
            name="contraseña"
            rules="required|confirmed:confirmation"
            v-slot="{ errors }"
          >
            <label
              style="color: #666666"
              class="font-weight-bold ml-3"
              for="password"
            >
              Contraseña
            </label>
            <v-text-field
              autocomplete="off"
              v-model="password"
              type="password"
              class="mt-2 pl-3 pr-3 pr-sm-3 pr-md-0"
              color="black"
              dense
              filled
              flat
              placeholder="Ingresa tu contraseña"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="6" class="mt-md-n5">
          <ValidationProvider
            name="confirmar contraseña"
            rules="required"
            vid="confirmation"
            v-slot="{ errors }"
          >
            <label
              style="color: #666666"
              class="font-weight-bold"
              for="password confirmar"
            >
              Confirmar Contraseña
            </label>
            <v-text-field
              autocomplete="off"
              v-model="confirm_password"
              type="password"
              class="mt-2 pr-3 ml-3 ml-sm-3 ml-md-0"
              color="black"
              dense
              filled
              flat
              placeholder="Confirma tu nombre contraseña"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>

        <v-col cols="12" md="12">
          <div class="mx-3">
            <v-btn
              block
              :loading="loading"
              @click="passes(HandlerSignUp)"
              tile
              large
              elevation="0"
              dark
              color="#00A0E9"
              class="text-capitalize"
            >
              Registrar
            </v-btn>
          </div>
        </v-col>
        <v-col class="text-center mt-n7 mt-md-n5" cols="12" sm="12" md="12">
          <div
            @click="emitEvent"
            style="cursor: pointer"
            class="mt-6 mb-4 blue--text"
          >
            Ya tienes cuenta? Inicia sesion
          </div>
        </v-col>
      </v-row>
    </ValidationObserver>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      //Register
      doc_type: "",
      doc_number: "",
      store_id: "",
      country_id: "",
      phone: "",
      email: "",
      email_confirmation: "",
      first_name: "",
      postal_code: "",
      last_name: "",
      password: "",
      confirm_password: "",
    };
  },

  methods: {
    async HandlerSignUp() {
      try {
        this.loading = true;
        const request = {
          doc_type: this.doc_type,
          doc_number: this.doc_number,
          store_id: 3,
          country_id: 1,
          state_id: 1,
          phone: this.phone,
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
          billing_zip_code: this.postal_code,
          password: this.password,
        };
        await this.$store.dispatch("auth/REGISTER", request);
        this.emitEvent();
        // this.emitVerification();
      } catch (error) {
        console.log(error);

        this.$snotify.error(error.response.data.error.err_message, "Error!");
      } finally {
        this.loading = false;
      }
    },

    emitEvent() {
      this.$emit("register:change");
    },

    emitVerification() {
      const user = {
        email: this.email,
        password: this.password,
      };
      this.$emit("verification:change", user);
    },
  },
};
</script>

<style>
</style>

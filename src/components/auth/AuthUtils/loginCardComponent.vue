<template>
  <v-card
    width="400"
    flat
    class="px-0 py-0 animate__animated animate__backInDown"
    style="
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
      border-radius: 20px !important;
    "
  >
    <div class="text-center" style="font-size: 2em; font-weight: 380">
            Ingresá a tu cuenta
  
    </div>


    <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-col cols="12" md="12">
        <label style="color: #666666" for="nombre" class="font-weight-bold">
          Correo Electrónico
        </label>
        <ValidationProvider
          name="Nombre"
          rules="email|required"
          v-slot="{ errors }"
        >
          <v-text-field
            v-model="email"
            class="mt-2 elevation-0"
            dense
            color="#00A0E9"
            filled
            flat
            placeholder="ejemplo@mail.com"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="12" class="mt-n5">
        <label style="color: #666666" for="nombre" class="font-weight-bold">
          Contraseña
        </label>
        <ValidationProvider
          name="Contraseña"
          rules="required"
          v-slot="{ errors }"
        >
          <v-text-field
            @keyup.enter="passes(HandlerLogin)"
            type="password"
            v-model="password"
            class="mt-2"
            color="#00A0E9"
            dense
            filled
            flat
            placeholder="Ingresa tu contraseña"
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
      </v-col>
      <v-col cols="12" md="12">
        <v-btn
          :loading="loading"
          @click="passes(HandlerLogin)"
          rounded
          elevation="0"
          large
          block
          dark
          color="#00A0E9"
          class="text-capitalize"
        >
          Ingresar
        </v-btn>
        <v-btn
          :disabled="loading"
          @click="emitEvent"
          rounded
          elevation="0"
          large
          block
          dark
          color="black"
          class="text-capitalize mt-1"
        >
          Registrar
        </v-btn>
      </v-col>
    </ValidationObserver>

    <v-col class="text-center mt-n7 mt-md-n5" cols="12" sm="12" md="12">
      <div
        @click="emitRecovery"
        style="cursor: pointer"
        class="mt-6 blue--text"
      >
        Recuperar contraseña
      </div>
    </v-col>
  </v-card>
</template>

<script>
export default {
  props: {
    emailUser: {
      type: String,
      default: "",
      required: false
    },
    passwordUser: {
      type: String,
      default: "",
      required: false
    },
    redirectOnLogin: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      //Login
      loading: false,
      loadingRegister: false, // Nuevo estado separado
      email: "",
      password: ""
    };
  },

  created() {
    this.email = this.emailUser;
    this.password = this.passwordUser;
  },

  methods: {
    async HandlerLogin() {
      try {
        this.statusRegister = false;
        this.loading = true;
        const request = {
          email: this.email,
          password: this.password,
          store: 3
        };
        await this.$store.dispatch("auth/LOGIN", request);
        this.$snotify.success("Nos encanta tenerte de vuelta", "Bienvenido");
        if (this.redirectOnLogin) {
          this.$router.push({ name: "home" });
        } else {
          this.$emit("login:success");
        }
      } catch (error) {
        console.log(error.response.data);
        if (error.response.status == 401) {
          this.$snotify.error("Usuario no encontrado", "Error!");
        } else if (error.response.status == 622) {
          this.showVerification = true;
        } else {
          this.$snotify.error(error.response.data.error.err_message, "Error!");
        }
      } finally {
        this.loading = false;
      }
    },

    emitEvent() {
      this.$emit("login:change");
    },

    emitRecovery() {
      this.$emit("recovery:change");
    }
  }
};
</script>

<style>
.theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #00a0e9 !important;
}
</style>

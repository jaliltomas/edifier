<template>
  <div class="d-flex flex-column align-center justify-center fill-height pa-4">
    <div class="text-center mb-4">
      <h2 class="text-h6 font-weight-bold mb-2 grey--text text--darken-3">Accedé o registrate</h2>
      <p class="text-body-2 grey--text text--darken-1 mb-0">
        Inicia sesión para guardar tu carrito y continuar con tu compra sin salir de este paso.
      </p>
    </div>

    <div class="d-flex justify-center auth-card-wrapper">
      <login-card-component
        v-if="showLogin"
        :stayOnLogin="true"
        @login:change="toggleMode"
        @recovery:change="showRecoveryDialog = true"
        @login:success="notifyAuthenticated"
      />
      <register-card-component
        v-else
        @register:change="toggleMode"
        @verification:change="handleVerification"
        @register:success="handleRegisterSuccess"
      />
    </div>

    <verification-account-component
      v-if="showVerification"
      :showVerification="showVerification"
      :statusRegister="statusRegister"
      @codeVerification:change="handleVerificationCode"
      :emailUser="email"
    />

    <v-dialog v-model="showRecoveryDialog" max-width="500">
      <ValidationObserver ref="obsRec" v-slot="{ passes }">
        <v-card
          class="animate__animated animate__fadeIn animate__faster"
          :loading="loadingRecovery"
          v-if="!showRecoveryNotification"
        >
          <v-card-title>
            Ingresa tu correo para recuperar tu cuenta
          </v-card-title>
          <v-card-text class="mt-2 mb-0 pb-0">
            <ValidationProvider
              name="correo"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup.enter="passes(handleRecovery)"
                v-model="emailRecovery"
                label="Correo Electrónico"
                dense
                filled
                color="#00A0E9"
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loadingRecovery"
              @click="closeRecoveryDialog"
              dark
              color="grey darken-3"
              text
            >
              Cancelar
            </v-btn>
            <v-btn
              color="#00A0E9"
              :loading="loadingRecovery"
              @click="passes(handleRecovery)"
              dark
              rounded
            >
              Recuperar
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card
          v-else
          class="animate__animated animate__fadeIn animate__faster"
        >
          <v-card-text>
            <v-alert
              class="pt-7"
              icon="mdi-check-outline"
              prominent
              text
              type="success"
            >
              Se ha enviado un correo para que modifique su contraseña
            </v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="resetRecovery">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
  </div>
</template>

<script>
import loginCardComponent from "../../auth/AuthUtils/loginCardComponent.vue";
import RegisterCardComponent from "../../auth/AuthUtils/RegisterCardComponent.vue";
import VerificationAccountComponet from "../../auth/AuthUtils/Dialogs/VerificationAccountComponet.vue";

export default {
  components: {
    "login-card-component": loginCardComponent,
    "register-card-component": RegisterCardComponent,
    "verification-account-component": VerificationAccountComponet,
  },
  data() {
    return {
      showLogin: true,
      showVerification: false,
      statusRegister: false,
      email: "",
      emailRecovery: "",
      loadingRecovery: false,
      showRecoveryDialog: false,
      showRecoveryNotification: false,
    };
  },
  methods: {
    toggleMode() {
      this.showLogin = !this.showLogin;
    },

    notifyAuthenticated() {
      this.$emit("authenticated");
    },

    handleVerification(user) {
      this.showVerification = true;
      this.email = user?.email || "";
    },

    handleVerificationCode(code) {
      this.showVerification = false;
      this.email = code?.email || this.email;
    },

    handleRegisterSuccess() {
      this.$snotify.success("Cuenta creada. Ahora puedes iniciar sesión.", "Registro exitoso");
      this.showLogin = true;
    },

    async handleRecovery() {
      try {
        this.loadingRecovery = true;
        const request = {
          email: this.emailRecovery,
          url_base: process.env.VUE_APP_CHECKOUT,
          store_id: 3,
        };
        await this.$store.dispatch("auth/RECOVERY_PASSWORD", request);
        this.showRecoveryNotification = true;
      } catch (error) {
        this.$snotify.error(error.response?.data?.error?.err_message || "No se pudo procesar la solicitud", "Error!");
      } finally {
        this.loadingRecovery = false;
      }
    },

    closeRecoveryDialog() {
      this.showRecoveryDialog = false;
    },

    resetRecovery() {
      this.showRecoveryDialog = false;
      this.showRecoveryNotification = false;
      this.emailRecovery = "";
    }
  }
};
</script>

<style scoped>
.auth-card-wrapper {
  width: 100%;
}

@media (min-width: 960px) {
  .auth-card-wrapper {
    width: 70%;
  }
}
</style>

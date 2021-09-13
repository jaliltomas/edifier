<template>
  <v-container fluid class="mx-0 px-0 py-0 my-0">
    <v-row justify="center" align="center" no-gutters>
      <information-component
        :message="'Iniciá sesión para mantenerte informado de nuestros modelos, y servicios que tenemos para vos.'"
        :logo="true"
      />
      <v-col cols="12" md="7">
        <v-img
          v-if="$vuetify.breakpoint.smAndDown"
          @click="$router.push('/')"
          style="cursor: pointer"
          class="mx-auto mt-10"
          contain
          width="250"
          src="@/assets/img/edifier-logo-color.svg"
        ></v-img>
        <div class="d-flex justify-center mt-5">
          <!-- LOGIN CARD -->
          <login-card-component
            v-if="show"
            @login:change="HandlerChange"
            @recovery:change="HandlerRecovery"
            :emailUser="email"
            :passwordUser="password"
          />
          <!-- REGISTER CARD -->
          <register-card-component
            v-else
            @register:change="HandlerChangeReg"
            @verification:change="HandlerValidated"
          />
        </div>
      </v-col>
    </v-row>

    <!-- VALIDAR CUENTA -->
    <verification-account-component
      :showVerification="showVerification"
      :statusRegister="statusRegister"
      v-if="showVerification"
      @codeVerification:change="HandlerVerification"
      :emailUser="email"
    />

    <!-- RECUPERAR CONTRASEÑA -->
    <v-dialog v-model="showRecovery" max-width="500">
      <ValidationObserver ref="obsRec" v-slot="{ passes }">
        <v-card
          class="animate__animated animate__fadeIn animate__faster"
          :loading="loading_verification"
          v-if="!showNotificationEmail"
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
                @keyup.enter="passes(HandlerRecoveryAccount)"
                v-model="email_verifiction"
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
              :loading="loading_verification"
              @click="showRecovery = false"
              dark
              color="grey darken-3"
              text
            >
              Cancelar
            </v-btn>
            <v-btn
              color="#00A0E9"
              :loading="loading_verification"
              @click="passes(HandlerRecoveryAccount)"
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
            <v-btn text @click="() => {
              showRecovery = false;
              showNotificationEmail = false;
              email_verifiction = '';
            }">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
  </v-container>
</template>

<script>
import InformationComponent from "./AuthUtils/InformationComponent.vue";
import loginCardComponent from "./AuthUtils/loginCardComponent.vue";
import RegisterCardComponent from "./AuthUtils/RegisterCardComponent.vue";
import VerificationAccountComponet from "./AuthUtils/Dialogs/VerificationAccountComponet.vue";
export default {
  components: {
    "information-component": InformationComponent,
    "login-card-component": loginCardComponent,
    "register-card-component": RegisterCardComponent,
    "verification-account-component": VerificationAccountComponet,
  },
  data() {
    return {
      isLogin: true,
      showVerification: false,
      showNotificationEmail: false,
      showNotification: false,
      showRecovery: false,
      statusRegister: false,

      email: "",
      password: "",

      loading: false,
      loading_verification: false,
      email_verifiction: "",

      //Animation
      show: true,
      canRegister: true,
    };
  },

  methods: {
    HandlerRouter(router) {
      this.$router.push({ name: router });
    },

    async HandlerRecoveryAccount() {
      try {
        this.loading_verification = true;
        const request = {
          email: this.email_verifiction,
          url_base: process.env.VUE_APP_CHECKOUT,
          store_id: 3,
        };
        const response = await this.$store.dispatch(
          "auth/RECOVERY_PASSWORD",
          request
        );
        console.log(response);
        this.showNotificationEmail = true;
      } catch (error) {
        console.log(error);
        this.$snotify.error(error.response.data.error.err_message, "Error!");
      } finally {
        this.loading_verification = false;
      }
    },

    HandlerChange() {
      this.show = !this.show;
    },

    HandlerChangeReg() {
      this.show = !this.show;
    },

    HandlerRecovery() {
      this.showRecovery = !this.showRecovery;
    },

    HandlerValidated(user) {
      this.statusRegister = true;
      this.showVerification = true;
      this.email = user.email;
      this.password = user.password;
    },

    HandlerVerification() {
      this.show = !this.show;
      this.showVerification = false;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

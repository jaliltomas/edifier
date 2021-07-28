<template>
  <v-container fluid class="mx-0 px-0 py-0 my-0">
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="12" md="5">
        <div
          style="width: 100%; height: 100vh; background-color: #ebf1f7"
          class="d-flex flex-column"
        >
          <div>
            <div class="py-15"></div>
            <v-img
              class="mx-auto"
              contain
              width="250"
              src="@/assets/img/edifier-logo-color.svg"
            ></v-img>
          </div>
          <div class="mt-auto">
            <v-img
              class="mx-auto pt-15"
              contain
              width="250"
              src="@/assets/img/destacado/Destacado002.jpeg"
            ></v-img>
            <div class="mx-15 text-center">
              Inicia sesión para mantenerte informado de los productos y
              servicios que tenemos para ti
            </div>
            <div class="py-15"></div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7">
        <ValidationObserver ref="obs" v-slot="{ passes }">
          <div class="d-flex justify-center">
            <v-card
              width="400"
              flat
              class="px-0 py-0"
              style="
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                border-radius: 20px !important;
              "
            >
              <div class="text-center" style="font-size: 2em; font-weight: 380">
                Bienvenido
              </div>
              <div
                class="text-center mt-5"
                style="
                  font-size: 0.87em;
                  font-weight: 400;
                  line-height: 1.375rem;
                "
              >
                Ingresa con tu cuenta
              </div>
              <v-col cols="12" md="12">
                <label for="email">Correo Electrónico</label>
                <ValidationProvider
                  name="Nombre"
                  rules="email|required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="email"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    outlined
                    placeholder="ejemplo@mail.com"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="12" class="mt-n5">
                <label for="email">Contraseña</label>
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
                    outlined
                    placeholder="Ingresa tu contraseña"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="12">
                <v-btn
                  :loading="loading"
                  @click="passes(HandlerLogin)"
                  tile
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
                  :loading="loading"
                  @click="HandlerRouter('signup')"
                  tile
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
              <v-col
                class="text-center mt-n7 mt-md-n5"
                cols="12"
                sm="12"
                md="12"
              >
                <div
                  @click="HandlerRouter('login')"
                  style="cursor: pointer"
                  class="mt-6 blue--text"
                >
                  Recuperar contraseña
                </div>
              </v-col>
            </v-card>
          </div>
        </ValidationObserver>
      </v-col>
    </v-row>

    <!-- VALIDAR CUENTA -->
    <v-dialog v-model="showVerification" max-width="600">
      <ValidationObserver ref="obs" v-slot="{ passes }">
        <v-card>
          <v-card-title>
            Verifica tu cuenta con el codigo enviado al correo
          </v-card-title>
          <v-card-text class="mt-2 mb-0 pb-0">
            <ValidationProvider
              name="Codigo"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                v-model="code"
                label="Codigo de verificación"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </ValidationProvider>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="passes(HandlerValidateLogin)" dark color="black"
              >Validar</v-btn
            >
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>

    <!-- RECUPERAR CONTRASEÑA -->
    <v-dialog v-model="showRecovery" max-width="600">
      <ValidationObserver ref="obs" v-slot="{ passes }">
        <v-card :loading="loading_verification">
          <v-card-title>
            Ingresa tu correo para que recuperar tu cuenta
          </v-card-title>
          <v-card-text class="mt-2 mb-0 pb-0">
            <ValidationProvider
              name="correo"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                @keyup.enter="passes(HandlerRecovery)"
                v-model="email_verifiction"
                label="Correo electronico"
                outlined
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
            >
              Cancelar
            </v-btn>
            <v-btn
              :loading="loading_verification"
              @click="passes(HandlerRecovery)"
              dark
              color="black"
            >
              Recuperar
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
  </v-container>
</template>

<script>
import NavegationComponent from "@/components/Utils/navegation_component";
export default {
  components: {
    "navegtion-component": NavegationComponent,
  },
  data() {
    return {
      isLogin: true,
      showVerification: false,
      showRecovery: false,
      email: "",
      password: "",
      code: "",
      name: "",
      loading: false,
      loading_verification: false,
      email_verifiction: "",
    };
  },

  methods: {
    HandlerRouter(router) {
      this.$router.push({ name: router });
    },

    async HandlerLogin() {
      try {
        this.loading = true;
        const request = {
          email: this.email,
          password: this.password,
          store: 3,
        };
        await this.$store.dispatch("auth/LOGIN", request);
        this.$snotify.success("Nos encanta tenerte de vuelta", "Bienvenido");
        this.$router.push({ name: "products" });
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

    async HandlerValidateLogin() {
      try {
        this.loading = true;
        const request = {
          email: this.email,
          password: this.password,
          code: this.code,
          store: 3,
        };
        await this.$store.dispatch("auth/LOGIN", request);
        this.$snotify.success("Nos encanta tenerte de vuelta", "Bienvenido");
        this.$router.push({ name: "products" });
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

    async HandlerRecovery() {
      try {
        this.loading_verification = true;
        const request = {
          email: this.email_verifiction,
          store_id: 1,
        };
        const response = await this.$store.dispatch(
          "auth/RECOVERY_PASSWORD",
          request
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        this.$snotify.error(error.response.data.error.err_message, "Error!");
      } finally {
        this.loading_verification = false;
      }
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

<template>
  <v-container>
    <ValidationObserver ref="obs" v-slot="{ passes }">
      <v-row>
        <v-col cols="12" md="12">
          <navegtion-component
            title="INICIAR SESIÓN"
            sub_title="INICIAR SESIÓN"
          />
        </v-col>
        <!-- <v-col cols="12" md="12">
          <h1 class="text-center text-md-start font-weight-bold text-uppercase">
            Bienvenidos a MULTIMARCA
          </h1>
          <p>Ingresa tus datos para comenzar a comprar</p>
        </v-col> -->
        <v-row justify="center" class="my-10">
          <v-col cols="12" md="4">
            <v-card
              flat
              class="px-5 py-5"
              style="
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
                border-radius: 20px !important;
              "
            >
              <v-col class="text-center">
                <v-avatar tile size="200">
                  <v-img src="@/assets/img/logo.svg" contain></v-img>
                </v-avatar>
              </v-col>
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
                    color="black"
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
                    color="black"
                    dense
                    outlined
                    placeholder="Ingresa tu contraseña"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="12">
                <!-- <div class="d-md-flex justify-md-space-between"> -->
                <!-- <div class="d-flex justify-center"> -->
                <v-btn
                  :loading="loading"
                  @click="passes(HandlerLogin)"
                  tile
                  elevation="0"
                  large
                  block
                  dark
                  color="#A81331"
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
                <!-- </div> -->
                <!-- </div> -->
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

                <!-- <div
                    @click="HandlerRouter('signup')"
                    style="cursor: pointer"
                    class="mt-2 blue--text"
                    >Registrate
                  </div> -->

                <!-- <span
                  @click="showRecovery = true"
                  style="cursor: pointer; font-size: 12px"
                >
                  Recuperar contraseña?
                </span>
                <span
                  @click="HandlerRouter('signup')"
                  style="cursor: pointer; font-size: 12px"
                >
                  No tienes cuenta? Registrate
                </span> -->
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-col cols="12" md="6" class="d-flex justify-end mt-md-n10">
          <v-img
            class="d-none d-sm-flex"
            contain
            src="@/assets/img/login 2.svg"
          ></v-img>
        </v-col> -->
      </v-row>
    </ValidationObserver>

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

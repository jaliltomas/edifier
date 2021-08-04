<template>
  <v-container fluid class="mx-0 px-0 py-0 my-0">
    <v-row justify="center" align="center" no-gutters>
      <information-component />
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
          <v-card
            v-if="show"
            width="400"
            flat
            class="px-0 py-0 animate__animated animate__backInDown"
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
              style="font-size: 0.87em; font-weight: 400; line-height: 1.375rem"
            >
              Ingresa con tu cuenta
            </div>

            <ValidationObserver ref="obs" v-slot="{ passes }">
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
                  @click="show = !show"
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
            </ValidationObserver>

            <v-col class="text-center mt-n7 mt-md-n5" cols="12" sm="12" md="12">
              <div
                @click="showRecovery = !showRecovery"
                style="cursor: pointer"
                class="mt-6 blue--text"
              >
                Recuperar contraseña
              </div>
            </v-col>
          </v-card>
          <!-- REGISTER CARD -->
          <v-card
            v-else
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
              class="text-center mt-5"
              style="font-size: 0.87em; font-weight: 400; line-height: 1.375rem"
            >
              Registra tu cuenta
            </div>

            <ValidationObserver ref="obsReg" v-slot="{ passes }">
              <v-row>
                <v-col cols="12" md="6" class="mt-2">
                  <label for="nombre" class="ml-3">Nombre</label>
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
                      outlined
                      placeholder="Ingresa tu nombre"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" md="6" class="mt-2">
                  <label for="Codigo Postal" class="ml-3 ml-sm-3 ml-md-0">
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
                      outlined
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
                    <label for="email" class="ml-3"> Correo Electrónico </label>
                    <v-text-field
                      autocomplete="off"
                      v-model="email"
                      class="mt-2 pl-3 pr-3 pr-sm-3 pr-md-0"
                      color="black"
                      dense
                      outlined
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
                    <label for="email confirmar" class="ml-3 ml-sm-3 ml-md-0">
                      Confirmar Correo
                    </label>
                    <v-text-field
                      autocomplete="off"
                      v-model="email_confirmation"
                      class="mt-2 pr-3 ml-3 ml-sm-3 ml-md-0"
                      color="black"
                      dense
                      outlined
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
                    <label for="password" class="ml-3"> Contraseña </label>
                    <v-text-field
                      autocomplete="off"
                      v-model="password"
                      type="password"
                      class="mt-2 pl-3 pr-3 pr-sm-3 pr-md-0"
                      color="black"
                      dense
                      outlined
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
                    <label for="password confirmar" class="ml-3">
                      Confirmar Contraseña
                    </label>
                    <v-text-field
                      autocomplete="off"
                      v-model="confirm_password"
                      type="password"
                      class="mt-2 pr-3 ml-3 ml-sm-3 ml-md-0"
                      color="black"
                      dense
                      outlined
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
                <v-col
                  class="text-center mt-n7 mt-md-n5"
                  cols="12"
                  sm="12"
                  md="12"
                >
                  <div
                    @click="show = !show"
                    style="cursor: pointer"
                    class="mt-6 mb-4 blue--text"
                  >
                    Ya tienes cuenta? Inicia sesion
                  </div>
                </v-col>
              </v-row>
            </ValidationObserver>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- VALIDAR CUENTA -->
    <v-dialog v-model="showVerification" max-width="480">
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

            <!-- <v-btn
              v-if="statusRegister"
              @click="passes(HandlerValidateCode)"
              dark
              color="black"
              >Reenviar Codigo</v-btn
            > -->

            <v-btn
              v-if="statusRegister"
              @click="passes(HandlerValidateCode)"
              dark
              color="black"
              >Validar</v-btn
            >

            <v-btn
              v-else
              @click="passes(HandlerValidateLogin)"
              dark
              color="black"
              >Validar</v-btn
            >
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>

    <!-- RECUPERAR CONTRASEÑA -->
    <v-dialog v-model="showRecovery" max-width="500">
      <ValidationObserver ref="obsRec" v-slot="{ passes }">
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
                label="Correo Electrónico"
                dense
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
              color="#00A0E9"
              :loading="loading_verification"
              @click="passes(HandlerRecovery)"
              dark
            >
              Recuperar
            </v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>

    <v-dialog v-model="showNotification" max-width="600" persistent>
      <v-card>
        <v-card-title> Confirma tu cuenta para continuar </v-card-title>
        <v-card-text>
          <p class="mb-0 mt-10 black--text">
            Se ha enviado un correo para confirmar su cuenta, porfavor copie el
            codigo en el mismo e inicie sesion para validar.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            dark
            color="black"
            tile
            @click="
              () => {
                show = !show;
                showNotification = false;
              }
            "
          >
            Continuar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import InformationComponent from './AuthUtils/InformationComponent.vue'
export default {
  components: {
    "information-component": InformationComponent,
  },
  data() {
    return {
      isLogin: true,
      showVerification: false,
      showNotification: false,
      showRecovery: false,
      statusRegister: false,
      email: "",
      password: "",
      code: "",
      name: "",
      loading: false,
      loading_verification: false,
      email_verifiction: "",

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

      //Animation
      show: true,
      canRegister: true,
      mode: "out-in",
    };
  },

  methods: {
    HandlerRouter(router) {
      this.$router.push({ name: router });
    },

    async HandlerLogin() {
      try {
        this.statusRegister = false;
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
        this.$router.push({ name: "home" });
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

    async HandlerValidateCode() {
      try {
        this.loading = true;
        const request = {
          code: this.code,
          email: this.email,
          store_id: 3,
        };
        await this.$store.dispatch("auth/CODE_VERIFICATION", request);
        this.$snotify.success(
          "Su codigo fue verificado con exito",
          "Felicidades"
        );
        this.showVerification = false;
        this.show = true;
      } catch (error) {
        console.log(error.response.data);
        // if (error.response.status == 401) {
        //   this.$snotify.error("Usuario no encontrado", "Error!");
        // } else if (error.response.status == 622) {
        //   this.showVerification = true;
        // } else {
        this.$snotify.error(error.response.data.error.err_message, "Error!");
        // }
      } finally {
        this.loading = false;
      }
    },

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
        this.statusRegister = true;
        this.showVerification = true;
        // this.$router.push({ name: "login" });
      } catch (error) {
        console.log(error);

        this.$snotify.error(error.response.data.error.err_message, "Error!");
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

    changeState() {
      console.log(this.show);
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

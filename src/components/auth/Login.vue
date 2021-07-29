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
              @click="$router.push('/')"
              style="cursor: pointer"
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
        <div class="d-flex justify-center">
          <!-- :width="!show ? 800 : 400" -->
          <Animated
            name="pulse"
            :duration="{ enter: 2000, leave: 2000 }"
            :mode="mode"
          >
            <v-card
              v-if="show"
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

              <ValidationObserver ref="obs" v-slot="{ passes }">
                <!-- <Animated
                enter="fadeIn"
                leave="FadeOut"
                appear
                :duration="{ enter: 1000, leave: 0 }"
              >
                <div v-if="show"> -->
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
                <v-col cols="12" md="12" class="mb-0">
                  <v-btn
                    :loading="loading"
                    @click="passes(HandlerLogin)"
                    tile
                    elevation="0"
                    large
                    block
                    dark
                    color="#00A0E9"
                    class="text-capitalize mb-0"
                  >
                    Ingresar
                  </v-btn>
                </v-col>
                <!-- </div>
              </Animated> -->
              </ValidationObserver>

              <!-- <ValidationObserver ref="obs" v-slot="{}">
              <Animated
                enter="fadeIn"
                leave="FadeOut"
                :duration="{ enter: 2000, leave: 0 }"
              >
                <div v-if="!show">
                  <v-row>
                    <v-col cols="12" md="6" class="mt-md-n5">
                      <label for="nombre">Nombre</label>
                      <ValidationProvider
                        name="nombre"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="first_name"
                          class="mt-2"
                          color="black"
                          dense
                          outlined
                          placeholder="Ingresa tu nombre"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" md="6" class="mt-md-n5">
                      <label for="Codigo Postal">Codigo Postal</label>
                      <ValidationProvider
                        name="codigo postal"
                        rules="required|min:4|max:4|numeric"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          v-model="postal_code"
                          class="mt-2"
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
                        <label for="email"> Correo Electrónico </label>
                        <v-text-field
                          autocomplete="off"
                          v-model="email"
                          class="mt-2"
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
                        <label for="email confirmar"> Confirmar Correo </label>
                        <v-text-field
                          autocomplete="off"
                          v-model="email_confirmation"
                          class="mt-2"
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
                        <label for="password"> Contraseña </label>
                        <v-text-field
                          autocomplete="off"
                          v-model="password"
                          type="password"
                          class="mt-2"
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
                        <label for="password confirmar">
                          Confirmar Contraseña
                        </label>
                        <v-text-field
                          autocomplete="off"
                          v-model="confirm_password"
                          type="password"
                          class="mt-2"
                          color="black"
                          dense
                          outlined
                          placeholder="Confirma tu nombre contraseña"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>

                    <v-col cols="12" md="12">
                      <div class="d-md-flex justify-md-space-between">
                        <div class="d-flex justify-center">
                          <v-btn
                            :loading="loading"
                            @click="passes(HandlerSignUp)"
                            tile
                            elevation="0"
                            large
                            dark
                            color="black"
                            class="text-capitalize"
                          >
                            Continuar
                          </v-btn>
                        </div>
                        <span
                          @click="HandlerRouter('login')"
                          style="cursor: pointer"
                          class="d-flex justify-center mt-2 blue--text"
                          >Ya tienes cuenta? Inicia sesion
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </Animated>
            </ValidationObserver> -->

              <v-col cols="12" md="12" class="mt-0">
                <v-btn
                  :loading="loading"
                  @click="changeState"
                  tile
                  elevation="0"
                  large
                  block
                  dark
                  color="black"
                  class="text-capitalize mt-0"
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
          </Animated>
          <Animated :duration="{ enter: 4000, leave: 4000 }">
            <v-card>
              <v-btn @click="changeState">registrar</v-btn>
              <v-btn @click="changeState">Actualizar</v-btn>
            </v-card>
          </Animated>
        </div>
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

      //Animation
      show: true,
      canRegister: true,
      mode: "out-in"
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

    changeState() {
      console.log(this.show)
    }
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

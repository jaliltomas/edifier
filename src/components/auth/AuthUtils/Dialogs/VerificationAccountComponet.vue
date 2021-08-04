<template>
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
          <v-btn
            v-if="statusRegister"
            @click="passes(HandlerValidateAccount)"
            dark
            color="black"
          >
            Validar
          </v-btn>

          <v-btn
            v-else
            @click="passes(HandlerValidateLogin)"
            dark
            color="black"
          >
            Validar
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showVerification: {
      type: Boolean,
      required: true,
      default: false,
    },
    statusRegister: {
      type: Boolean,
      required: true,
      default: false,
    },
    emailUser: {
      type: String,
      default: "",
      required: false,
    },
  },

  data() {
    return {
      loading: false,
      code: "",
    };
  },

  methods: {
    async HandlerValidateAccount() {
      try {
        this.loading = true;
        const request = {
          code: this.code,
          email: this.emailUser,
          store_id: 3,
        };
        await this.$store.dispatch("auth/CODE_VERIFICATION", request);
        this.$snotify.success(
          "Su codigo fue verificado con exito",
          "Felicidades"
        );
        this.$emit("codeVerification:change");
      } catch (error) {
        console.log(error.response);
        this.$snotify.error(error.response.data.error.err_message, "Error!");
        // }
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
  },
};
</script>

<style>
</style>
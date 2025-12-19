<template>
  <ValidationObserver ref="obs" v-slot="{ passes }">
    <v-card
      color="white"
      tile
      class="elevation-0 py-2 px-0 d-flex justify-center"
    >
      <v-card-text>
        <v-row class="mx-0">
          <!-- MOSTRAR MENSAJE NO HAY DIRECCION -->
          <v-col
            cols="12"
            sm="12"
            md="12"
            class="d-flex justify-center"
            v-if="dataAddress.length == 0 && !canRegister"
          >
            <v-card flat>
              <v-card-text>
                <span class="black--text">
                  Parece que aun no has registrado una dirección
                </span>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- MOSTRAR DIRECCIONES REGISTRADAS -->
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            v-for="(item, index) in dataAddress"
            :key="index"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                :class="hover ? 'custom-card-border-address' : ''"
                flat
                v-if="dataAddress.length > 0 && !canRegister"
              >
                <v-card-text class="my-0 py-0">
                  <v-list-item v-show="dataAddress.length > 0" two-line>
                    <v-list-item-content>
                      <v-list-item-title
                        style="cursor: pointer"
                        @click="HandlerEdit(item)"
                        class="text-capitalize"
                      >
                        <v-icon color="black">mdi-home</v-icon>
                        <span class="ml-1 font-weight-bold title-address-card">
                          Dirección:
                        </span>
                        {{ item.street }}
                        {{ item.street_number }}
                        {{ item.floor_number }}
                        {{ item.department_number }}
                        {{ item.location }}
                      </v-list-item-title>
                      <v-list-item-title>
                        <v-icon color="black">mdi-account</v-icon>
                        <span class="ml-1 font-weight-bold title-address-card">
                          Quien recibe:
                        </span>
                        {{ item.contact_name }}
                      </v-list-item-title>
                      <v-list-item-title>
                        <v-icon color="black">mdi-phone</v-icon>
                        <span class="ml-1 font-weight-bold title-address-card">
                          Teléfono:
                        </span>
                        {{ item.contact_phone }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <div class="d-flex flex-column">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-bind="attrs" v-on="on">
                              <v-icon
                                @click="HandlerUpdate(item, 1)"
                                :class="
                                  item.status
                                    ? 'animate__animated animate__pulse animate__infinite'
                                    : ''
                                "
                                :color="item.status ? '#6C63FF' : ''"
                              >
                                mdi-map-marker
                              </v-icon>
                            </v-btn>
                          </template>
                          <span>Dirección principal</span>
                        </v-tooltip>

                        <v-btn @click="HandlerEdit(item)" icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click="HandlerDelete(item)" icon>
                          <v-icon>mdi-delete-forever</v-icon>
                        </v-btn>
                      </div>
                    </v-list-item-icon>
                  </v-list-item>
                </v-card-text>
              </v-card>
            </v-hover>

            <v-divider class="mx-15 px-15"></v-divider>
          </v-col>
          <!-- MOSTRAR FORMULARIO PARA REGISTRAR DIRECCION -->
          <v-col cols="12" sm="12" md="12" lg="12" v-if="canRegister">
            <v-row class="mx-5 my-5">
              <v-col cols="12" sm="6" md="6" lg="6" class="mt-md-0">
                <label for="zip-code" class="text-uppercase font-weight-bold">
                  Código postal
                </label>
                <ValidationProvider
                  name="Código Postal"
                  rules="required|numeric|max:4|min:4"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="zipcode"
                    class="mt-2 elevation-0"
                    color="#00A0E9"
                    filled
                    dense
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-0">
                <label for="provincia" class="text-uppercase font-weight-bold">
                  provincia
                </label>
                <ValidationProvider
                  name="Provincia"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    :items="dataState"
                    item-text="name"
                    item-value="id"
                    v-model="state_id"
                    class="mt-2 elevation-0"
                    color="#00A0E9"
                    filled
                    dense
                    flat
                    :error-messages="errors"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-n5">
                <label for="localidad" class="text-uppercase font-weight-bold">
                  Localidad
                </label>
                <ValidationProvider
                  name="Tipo de documento"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="localite_id"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-n5">
                <label for="email" class="text-uppercase font-weight-bold">
                  Calle
                </label>
                <ValidationProvider
                  name="Calle"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="street"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="mt-md-n5">
                <label for="email" class="text-uppercase font-weight-bold">
                  Numero
                </label>
                <ValidationProvider
                  name="Numero"
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="street_number"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="mt-md-n5">
                <ValidationProvider
                  name="Piso"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label for="email" class="text-uppercase font-weight-bold">
                    Piso
                  </label>
                  <v-text-field
                    v-model="floor_number"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="4" class="mt-md-n5">
                <ValidationProvider
                  name="Departamento"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label for="email" class="text-uppercase font-weight-bold">
                    Departamento
                  </label>
                  <v-text-field
                    v-model="department_number"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-n5">
                <ValidationProvider
                  name="Entre calles"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label for="email" class="text-uppercase font-weight-bold">
                    Entre calles
                  </label>
                  <v-text-field
                    v-model="between_streets"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-n5">
                <ValidationProvider
                  name="Observaciones"
                  v-slot="{ errors }"
                >
                  <label for="email" class="text-uppercase font-weight-bold">
                    Observaciones del domicilio
                  </label>
                  <v-text-field
                    v-model="observations"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                    hint="Opcional"
                    persistent-hint
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-n5">
                <ValidationProvider
                  name="Nombre"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label for="email" class="text-uppercase font-weight-bold">
                    Quien recibe
                  </label>
                  <v-text-field
                    v-model="contact_name"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="mt-md-n5">
                <ValidationProvider
                  name="Telefono"
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <label for="email" class="text-uppercase font-weight-bold">
                    Telefono de contacto
                  </label>
                  <v-text-field
                    v-model="contact_phone"
                    class="mt-2"
                    color="#00A0E9"
                    dense
                    filled
                    flat
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" class="mt-md-n10">
                <div class="d-flex">
                  <v-checkbox
                    color="#00A0E9"
                    v-model="isFirst"
                    type="checkbox"
                    required
                  >
                    <template v-slot:label>
                      <label
                        style="font-size: 14px"
                        class="text-uppercase font-weight-bold"
                      >
                        Registrar como principal
                      </label>
                    </template>
                  </v-checkbox>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div class="d-flex justify-center mt-5">
          <v-btn
            v-if="!canRegister"
            :loading="loading"
            @click="
              () => {
                canRegister = !canRegister;
                goUpdate = false;
                clearFill();
              }
            "
            rounded
            elevation="0"
            dark
            width="250"
            color="#00A0E9"
            class="text-capitalize"
          >
            Agregar dirección
          </v-btn>
          <v-btn
            v-if="canRegister && !goUpdate"
            :loading="loading"
            @click="passes(HandlerRegister)"
            elevation="0"
            dark
            rounded
            width="250"
            color="#00A0E9"
            class="text-capitalize"
          >
            Registrar
          </v-btn>
          <v-btn
            v-if="canRegister && goUpdate"
            :loading="loading"
            @click="passes(() => HandlerUpdate({}, 0))"
            elevation="0"
            dark
            rounded
            width="250"
            color="#00A0E9"
            class="text-capitalize"
          >
            Actualizar
          </v-btn>
          <v-btn
            v-if="canRegister"
            :loading="loading"
            @click="canRegister = !canRegister"
            elevation="0"
            rounded
            dark
            width="250"
            color="#00A0E9"
            class="text-capitalize ml-2"
          >
            Cancelar
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
      zipcode: "",
      state_id: "",
      localite_id: "",
      street: "",
      street_number: "",
      floor_number: "",
      department_number: "",
      between_streets: "",
      observations: "",
      contact_name: "",
      contact_phone: "",
      dataAddress: [],
      dataState: [],
      dataLocalites: [],
      isFirst: null,
      isUpdate: false,
      goUpdate: false,
      selectItem: {},

      // Register
      canRegister: true,
    };
  },

  created() {
    this.HandlerGetAddress();
    this.HandlerGetStates();
  },

  watch: {
    state_id(state) {
      this.HandlerGetLocalities(state);
    },
  },

  computed: {
    getAuthUser() {
      return this.$store.getters["auth/GET_PROFILE"];
    },
  },

  methods: {
    async HandlerGetAddress(action = 0) {
      try {
        const response = await this.$store.dispatch("auth/GET_ADDRESS");
        this.dataAddress = response.data.data;
        if (action == 0) {
          this.canRegister = !this.canRegister;
          this.goUpdate = true;
        }
        // if (this.dataAddress.length > 0) {
        //   const principalAddress = response.data.data.find(
        //     (addrr) => addrr.status == true
        //   );
        //   // this.HandlerEdit(principalAddress);
        // } else {
        //   this.zipcode = this.getAuthUser.zipcode;
        // }
        await this.$store.dispatch("auth/AUTH_USER");
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetStates() {
      try {
        const response = await this.$store.dispatch("country/GET_STATES");
        this.dataState = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerGetLocalities(id) {
      try {
        const request = {
          state_id: id,
        };

        const response = await this.$store.dispatch(
          "country/GET_LOCALITIES",
          request
        );

        this.dataLocalites = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },

    async HandlerRegister() {
      try {
        this.loading = true;
        const request = {
          country_id: 1,
          state_id: this.state_id,
          location: this.localite_id,
          zipcode: this.zipcode,
          department_number: this.department_number,
          contact_phone: this.contact_phone,
          contact_name: this.contact_name,
          street: this.street,
          street_number: this.street_number,
          between_streets: this.between_streets,
          floor_number: this.floor_number,
          observations: this.observations,
          status: this.isFirst == null ? false : true,
        };

        await this.$store.dispatch("auth/REGISTER_ADDRESS", request);

        this.$snotify.success("Exitos has registrado tu dirección", "Exitos!");
        this.HandlerGetAddress();
        this.clearFill();
      } catch (error) {
        console.log(error);
        if (error.response.status == 422) {
          this.$snotify.error(error.response.data.error.err_message, "Error.");
        } else {
          this.$snotify.error("Ha ocurrido un error con el registro", "Error.");
        }
      } finally {
        this.loading = false;
      }
    },

    HandlerEdit(item) {
      this.canRegister = !this.canRegister;
      this.goUpdate = true;
      this.selectItem = item;
      this.state_id = parseInt(item.state_id);
      this.localite_id = item.location;
      this.zipcode = item.zipcode;
      this.department_number = item.department_number;
      this.contact_phone = item.contact_phone;
      this.contact_name = item.contact_name;
      this.street = item.street;
      this.street_number = item.street_number;
      this.between_streets = item.between_streets;
      this.floor_number = item.floor_number;
      this.observations = item.observations;
      this.isFirst = item.status == true ? 1 : 0;
      // this.isUpdate = false;
    },

    async HandlerUpdate(item = {}, action) {
      try {
        console.log(action);
        this.loading = true;
        const request = {
          data: {
            country_id: 1,
            state_id: item.state_id || this.state_id,
            location: item.location || this.localite_id,
            zipcode: item.zipcode || this.zipcode,
            department_number: item.department_number || this.department_number,
            contact_phone: item.contact_phone || this.contact_phone,
            contact_name: item.contact_name || this.contact_name,
            street: item.street || this.street,
            street_number: item.street_number || this.street_number,
            between_streets: item.between_streets || this.between_streets,
            floor_number: item.floor_number || this.floor_number,
            observations: item.observations || this.observations,
            status: action == 1 ? true : this.isFirst,
          },
          id: item.id || this.selectItem.id,
        };
        await this.$store.dispatch("auth/UPDATE_ADDRESS", request);

        this.$snotify.success("Exitos has editado tu dirección", "Exitos!");
        this.HandlerGetAddress(1);
        if (action == 0) {
          this.canRegister = !this.canRegister;
          this.goUpdate = true;
          // this.clearFill();
        }
      } catch (error) {
        console.log(error);
        if (error.response.status == 422) {
          this.$snotify.error(error.response.data.error.err_message, "Error.");
        } else {
          this.$snotify.error("Ha ocurrido un error con el registro", "Error.");
        }
      } finally {
        this.loading = false;
      }
    },

    async HandlerDelete(item) {
      try {
        this.loading = true;
        const request = {
          id: item.id,
        };

        await this.$store.dispatch("auth/DELETE_ADDRESS", request);

        this.$snotify.success("Exitos has eliminado tu dirección", "Exitos!");
        this.HandlerGetAddress();
        this.clearFill();
      } catch (error) {
        console.log(error);
        if (error.response.status == 422) {
          this.$snotify.error(error.response.data.error.err_message, "Error.");
        } else {
          this.$snotify.error("Ha ocurrido un error con el registro", "Error.");
        }
      } finally {
        this.loading = false;
      }
    },

    HandlerNotUpdate() {
      this.clearFill();
      console.log(this.isUpdate);
      this.isUpdate = !this.isUpdate;
    },

    clearFill() {
      this.state_id = "";
      this.localite_id = "";
      this.zipcode = "";
      this.department_number = "";
      this.contact_phone = "";
      this.contact_name = "";
      this.street = "";
      this.street_number = "";
      this.between_streets = "";
      this.floor_number = "";
      this.observations = "";
      this.isFirst = false;
      this.isUpdate = false;
      this.$refs.obs.reset();
    },
  },
};
</script>

<style>
.title-address-card {
  font-size: 0.9em;
}

.custom-card-border-address {
  border-left: 3px #00a0e9 solid !important;
}
</style>

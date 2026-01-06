<template>
  <ValidationObserver ref="obs" v-slot="{ passes }">
    <v-card flat>
      <v-card-text>
        <div class="font-weight-bold mb-4">Agrega una nueva dirección de entrega</div>
        <v-row>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Código postal</label>
            <ValidationProvider name="Código Postal" rules="required|numeric|max:4|min:4" v-slot="{ errors }">
              <v-text-field v-model="zipcode" class="mt-2" color="#00A0E9" filled dense flat :error-messages="errors"></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Provincia</label>
            <ValidationProvider name="Provincia" rules="required" v-slot="{ errors }">
              <v-autocomplete :items="dataState" item-text="name" item-value="id" v-model="state_id" class="mt-2" color="#00A0E9" filled dense flat :error-messages="errors"></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Localidad</label>
            <ValidationProvider name="Localidad" rules="required" v-slot="{ errors }">
              <v-text-field v-model="localite_id" class="mt-2" color="#00A0E9" dense filled flat :error-messages="errors"></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Calle</label>
            <ValidationProvider name="Calle" rules="required" v-slot="{ errors }">
              <v-text-field v-model="street" class="mt-2" color="#00A0E9" dense filled flat :error-messages="errors"></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="text-uppercase font-weight-bold">Numero</label>
            <ValidationProvider name="Numero" rules="required|numeric" v-slot="{ errors }">
              <v-text-field v-model="street_number" class="mt-2" color="#00A0E9" dense filled flat :error-messages="errors"></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="text-uppercase font-weight-bold">Piso</label>
            <v-text-field v-model="floor_number" class="mt-2" color="#00A0E9" dense filled flat></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <label class="text-uppercase font-weight-bold">Departamento</label>
            <v-text-field v-model="department_number" class="mt-2" color="#00A0E9" dense filled flat></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Entre calles</label>
            <v-text-field v-model="between_streets" class="mt-2" color="#00A0E9" dense filled flat></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Observaciones</label>
            <v-text-field v-model="observations" class="mt-2" color="#00A0E9" dense filled flat hint="Opcional" persistent-hint></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Quien recibe</label>
            <ValidationProvider name="Nombre" rules="required" v-slot="{ errors }">
              <v-text-field v-model="contact_name" class="mt-2" color="#00A0E9" dense filled flat :error-messages="errors"></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" sm="6">
            <label class="text-uppercase font-weight-bold">Telefono</label>
            <ValidationProvider name="Telefono" rules="required|numeric" v-slot="{ errors }">
              <v-text-field v-model="contact_phone" class="mt-2" color="#00A0E9" dense filled flat :error-messages="errors"></v-text-field>
            </ValidationProvider>
          </v-col>
        </v-row>
        <div class="d-flex justify-end mt-4">
          <v-btn :loading="loading" @click="passes(HandlerRegister)" color="#00A0E9" dark rounded class="text-capitalize">
            Guardar Dirección
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
      dataState: [],
    };
  },
  created() {
    this.HandlerGetStates();
  },
  methods: {
    async HandlerGetStates() {
      try {
        const response = await this.$store.dispatch("country/GET_STATES");
        this.dataState = response.data.data;
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
          observations: this.observations || "sin observacion",
          status: true, // Set as default since it's the first one
        };

        await this.$store.dispatch("auth/REGISTER_ADDRESS", request);
        this.$snotify.success("Dirección registrada con éxito", "Exitos!");
        this.$emit('address-added');
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status == 422) {
          this.$snotify.error(error.response.data.error.err_message, "Error.");
        } else {
          this.$snotify.error("Error al registrar la dirección", "Error.");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


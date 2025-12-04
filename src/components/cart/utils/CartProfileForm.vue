<template>
  <ValidationObserver ref="obs" v-slot="{ passes }">
    <v-card flat>
      <v-card-text>
        <div class="font-weight-bold mb-4 text-h6 black--text">Completa tu perfil</div>
        <p class="mb-4 grey--text text--darken-1">
          Para finalizar tu compra, necesitamos algunos datos adicionales.
        </p>
        
        <v-row dense>
          <v-col cols="12" sm="6" v-if="missingFields.includes('first_name')">
            <label class="text-caption font-weight-bold text-uppercase">Nombre</label>
            <ValidationProvider name="Nombre" rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="form.first_name"
                placeholder="Tu nombre"
                dense
                outlined
                color="#00A0E9"
                :error-messages="errors"
                background-color="white"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" v-if="missingFields.includes('last_name')">
            <label class="text-caption font-weight-bold text-uppercase">Apellido</label>
            <ValidationProvider name="Apellido" rules="required" v-slot="{ errors }">
              <v-text-field
                v-model="form.last_name"
                placeholder="Tu apellido"
                dense
                outlined
                color="#00A0E9"
                :error-messages="errors"
                background-color="white"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" v-if="missingFields.includes('doc_number')">
            <label class="text-caption font-weight-bold text-uppercase">DNI / CUIT / CUIL</label>
            <ValidationProvider name="DNI" rules="required|numeric" v-slot="{ errors }">
              <v-text-field
                v-model="form.doc_number"
                placeholder="Sin puntos ni guiones"
                dense
                outlined
                color="#00A0E9"
                :error-messages="errors"
                background-color="white"
              ></v-text-field>
            </ValidationProvider>
          </v-col>

          <v-col cols="12" sm="6" v-if="missingFields.includes('phone')">
             <label class="text-caption font-weight-bold text-uppercase">Teléfono</label>
             <ValidationProvider name="Telefono" rules="required|numeric" v-slot="{ errors }">
               <v-text-field
                 v-model="form.phone"
                 placeholder="Ej: 1112345678"
                 dense
                 outlined
                 color="#00A0E9"
                 :error-messages="errors"
                 background-color="white"
               ></v-text-field>
             </ValidationProvider>
          </v-col>
        </v-row>

        <div class="d-flex justify-end mt-4">
          <v-btn text color="grey darken-1" @click="$emit('cancel')" class="mr-2 text-capitalize">
            Cancelar
          </v-btn>
          <v-btn
            :loading="loading"
            @click="passes(updateProfile)"
            color="#00A0E9"
            dark
            rounded
            class="text-capitalize shadow-blue"
          >
            Guardar y Continuar
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </ValidationObserver>
</template>

<script>
export default {
  props: {
    missingDetails: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      form: {
        first_name: '',
        last_name: '',
        doc_number: '',
        doc_type: 'DNI', // Default to DNI
        email: '',
        phone: '',
        // These might not be in the form but needed for payload
      }
    };
  },
  computed: {
    missingFields() {
      return ['first_name', 'last_name', 'doc_number', 'phone']; 
    },
    userProfile() {
        // The user object structure might vary, check how it's accessed in PersonalData.vue
        // It uses getAuthUser.buyer.first_name
        const profile = this.$store.getters["auth/GET_PROFILE"];
        return profile.buyer || profile; // Handle both structures just in case
    }
  },
  created() {
      this.initializeForm();
  },
  methods: {
    initializeForm() {
        // Pre-fill with existing data
        this.form.first_name = this.userProfile.first_name || '';
        this.form.last_name = this.userProfile.last_name || '';
        this.form.doc_number = this.userProfile.doc_number || '';
        this.form.doc_type = this.userProfile.doc_type || 'DNI';
        this.form.phone = this.userProfile.phone || '';
        this.form.email = this.userProfile.email || '';
    },
    async updateProfile() {
      try {
        this.loading = true;
        
        // Construct payload matching PersonalData.vue
        const payload = {
          fullname: `${this.form.first_name} ${this.form.last_name}`,
          doc_type: this.form.doc_type,
          doc_number: this.form.doc_number,
          phone: this.form.phone,
          email: this.form.email || this.userProfile.email, // Ensure email is sent
          billing_email: this.form.email || this.userProfile.email,
          first_name: this.form.first_name,
          last_name: this.form.last_name,
          store_id: 3, // Hardcoded as in PersonalData.vue
          contact_phone: this.form.phone,
        };
        
        await this.$store.dispatch("auth/UPDATE_PROFILE", payload);
        
        this.$snotify.success("Perfil actualizado correctamente", "Éxito");
        this.$emit('profile-updated');
      } catch (error) {
        console.error(error);
        // Show more specific error if available
        const msg = error.response?.data?.error?.err_message || "No se pudo actualizar el perfil";
        this.$snotify.error(msg, "Error");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


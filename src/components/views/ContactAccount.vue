<template>
  <div>
    <v-row justify="center" align="center" no-gutters>
      <information-component
        :message="'Contactanos y dejanos tus sugerencias'"
        :logo="false"
      />
      <v-col cols="12" md="7" class="d-flex justify-space-around">
        <div style="width: 70%">
          <remaze-component />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import InformationComponent from "../auth/AuthUtils/InformationComponent.vue";
import RemazeContact from "./RemazeContact.vue";
export default {
  components: {
    "information-component": InformationComponent,
    "remaze-component": RemazeContact,
  },
  created() {
    window.fbq("trackCustom", "ContactView");
  },
};
</script>

<style>
</style>
<template>
  <div>
    <v-row justify="center" align="center" no-gutters>
      <v-col
        cols="12"
        md="5"
        v-if="!$vuetify.breakpoint.smAndDown"
        class="py-0 px-0"
      >
        <div
          style="width: 100%; padding-bottom: 20px;"
        >
          <div >
            <v-img
              contain
              src="@/assets/img/contact-image.webp"
              lazy-src="@/assets/img/contact-image.webp"
            ></v-img>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="7" class="d-flex align-center flex-column justify-center">
        <div style="width: 70%">
          <div class="contact-title">Envíanos tus consultas y sugerencias</div>
        </div>
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
  .contact-title{
    font-size: 20px;
    text-align: center;
    max-width: 640px;
    color: black;
    margin-bottom: 20px;
  }
</style>
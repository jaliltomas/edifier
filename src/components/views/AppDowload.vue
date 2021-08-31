<template>
  <div>
    <v-sheet>
      <v-img src="@/assets/img/banners/app.webp">
        <v-container fill-height>
          <v-row justify="center">
            <v-col cols="12" class="pt-15 mt-15">
              <div style="height: 200px">
                <div class="white--text text-center" style="font-size: 1.8em">
                  EDIFIER CONNECT
                </div>
                <v-img
                  class="mx-auto mt-15"
                  width="75"
                  height="75"
                  contain
                  src="@/assets/img/profileImage.svg"
                ></v-img>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-sheet>
    <v-sheet color="#F1F1F1">
      <div class="py-10"></div>
      <v-img
        class="mx-auto"
        :width="$vuetify.breakpoint.name == 'xs' ? '100%' : '30%'"
        contain
        src="@/assets/img/sections/edifier-connect.webp"
      ></v-img>
      <div class="text-center">
        Descargá la App EDIFIER Connect para Android o iOS desde los siguientes
        enlaces.
      </div>
      <div class="d-flex justify-center mt-5">
        <img
          style="width: 100%: height: auto; cursor: pointer"
          src="@/assets/img/sections/iosdown.png"
          class="mr-2"
          @click="goTo('itms-apps://itunes.apple.com/app/id1403293252')"
        />
        <img
          style="width: 100%: height: auto; cursor: pointer"
          src="@/assets/img/sections/androiddown.png"
          @click="
            goTo(
              'https://play.google.com/store/apps/details?id=com.edifier.edifierconnect'
            )
          "
        />
      </div>
      <div class="py-10"></div>
    </v-sheet>
    <suscribe-component />
  </div>
</template>

<script>
import Suscribe from "../Utils/suscribe_component.vue";
export default {
  components: {
    "suscribe-component": Suscribe,
  },

  methods: {
    goTo(item) {
      window.open(item);
    },
  },
};
</script>

<style>
</style>
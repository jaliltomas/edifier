import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
// import '@mdi/font/css/materialdesignicons.css';
// idioma
import es from "vuetify/es5/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
    // icons: {
    //   iconfont: 'mdi'
    // },
    lang: {
        locales: { es },
        current: "es"
    },
});

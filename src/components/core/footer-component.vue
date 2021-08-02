<template>
  <v-footer :padless="true">
    <v-card flat tile width="100%" color="#EBF1F7" class="text-start py-15">
      <v-row class="mx-0 my-0" justify="space-around">
        <v-col cols="12" md="4">
          <v-img
            width="250"
            contain
            src="@/assets/img/edifier-logo-gris.svg"
          ></v-img>
          <div class="mt-5">
            <a
              @click.prevent="() => {}"
              style="color: black; text-decoration: none"
              href=""
            >
              Política de privacidad
            </a>
          </div>
          <div class="mt-0" @click.prevent="showTerms = true">
            <a style="color: black; text-decoration: none" href="">
              Términos de uso
            </a>
          </div>
          <div>© EDIFIER 2021 Todos los derechos reservados</div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex justify-start justify-md-end">
            <v-icon class="black--text">mdi-facebook</v-icon>
            <v-icon class="black--text mx-1">mdi-instagram</v-icon>
            <v-icon class="black--text mx-1">mdi-youtube</v-icon>
          </div>
          <div class="d-md-flex mt-2">
            <span class="text-end mr-5" style="font-size: 15px">
              Cumplimos con la Resolución 270/2020 de la Secretaría de Comercio
              Interior del Ministerio de Desarrollo Productivo sobre la
              protección del Consumidor en el Comercio Electrónico
            </span>
            <a
              href="http://qr.afip.gob.ar/?qr=r7epRpZXgrfD0k_uD6_73w,,"
              target="_F960AFIPInfo"
            >
              <v-img
                style="cursor: pointer; filter: grayscale(100%)"
                class="mt-2 mt-md-0 d-flex justify-end"
                contain
                width="5em"
                height="7em"
                src="@/assets/img/data-fiscal.jpeg"
              ></v-img>
            </a>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-if="showTerms" v-model="showTerms" max-width="800">
      <v-card style="padding: 0 17px 17px">
        <v-card-text>
          <div class="d-flex justify-end">
            <v-btn @click="showTerms = false" icon class="pt-0 mt-2">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <p style="font-weight: 500">
            La compra está sujeta a disponibilidad de stock, así como también a
            condiciones de logística y distribución. En caso de no poder hacerse
            la entrega del o de los productos solicitados debido a la falta de
            disponibilidad se dará por anulada la compra. Si el cliente desea
            adquirir un nuevo producto, la compra estará regida por las
            condiciones comerciales correspondientes al momento.
          </p>
          <p style="font-weight: 500" class="">
            La empresa se reserva el derecho de cancelación dentro las 72hs con
            la devolución del pago por el mismo medio en que se efectuó la
            compra, sin perjucio o daño.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      showTerms: false,
    };
  },
  methods: {
    goTO() {
      window.open(
        "https://serviciosweb.afip.gob.ar/clavefiscal/qr/publicInfoD.aspx"
      );
    },
  },
};
</script>

<style>
.stadio_title {
  color: #8b8383;
  font-weight: 600;
  font-size: 4em;
}
</style>

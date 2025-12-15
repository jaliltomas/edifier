<template>
  <v-container>
    <div v-if="!loadingAutorize">
      <v-row justify="center" v-if="isValid">
        <v-col cols="12" sm="12" md="4">
          <v-img contain src="@/assets/img/notificationGood.svg"></v-img>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="4"
          class="d-flex align-self-center justify-center"
        >
          <div>
            <span
              style="font-size: 18px; color: #6c63ff"
              class="font-weight-bold text-center"
              v-html="messageNotification"
            ></span>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="12" class="d-flex justify-center mt-5">
          <v-btn
            @click="$router.push({ name: 'home' })"
            color="#6c63ff"
            dark
            class="text-capitalize"
          >
            Seguir Comprando
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="12" sm="12" md="4">
          <v-img contain src="../../assets/img/notificationBad.svg"></v-img>
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <v-row justify="center">
        <v-col cols="12" sm="12" md="4" class="d-flex justify-center mt-5">
          <v-progress-circular
            size="300"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      loadingAutorize: false,
      isValid: false,
      messageNotification: "",
    };
  },

  created() {
    if (this.$route.query?.preference_id) {
      this.HandlerGetAutorize();
    }
    window.fbq("trackCustom", "CheckoutNotificationView");
  },

  methods: {
    async HandlerGetAutorize() {
      try {
        this.loadingAutorize = true;
        const request = this.$route.query;
        const response = await this.$store.dispatch(
          "products/GET_ANSWER",
          request
        );



        if (response.data.message == "approved") {
          this.isValid = true;
          this.messageNotification =
            "<p>Enviamos un email con la factura y detalles de la operación</p><p style='margin-top:5px'>En 24hs hábiles vas a recibir un correo con los datos de envío.</p>";
          this.$store.commit("cart/CLEAN_CART");
          // Asegurar limpieza completa de localStorage
          localStorage.removeItem('guest_cart');
          localStorage.removeItem('pending_checkout_cart_id');
          this.notifyParent("approved");
        } else {
          this.notifyParent(response.data.message);
          this.showMPError(response.data);
        }
      } catch (error) {
        this.notifyParent("error");
        Swal.fire({
          width: 550,
          icon: "warning",
          title: "¡Oh Oh ha ocurrido un error!",
          html: "<p>Ha ocurrido un error con tu compra por favor intenta de nuevo</p>",
          showConfirmButton: true,
          confirmButtonColor: "#80c35d",
          confirmButtonText: "Oki doki",
        });
      } finally {
        this.loadingAutorize = false;
      }
    },
    showMPError(response) {
      let messageTitle = "";
      let messageBody = "";
      const mpResponse = response.data.order.payment[0];
      switch (mpResponse.status_detail) {
        case "cc_rejected_insufficient_amount":
          messageTitle = "Pago Rechazado";
          messageBody = "Fondos insuficientes.";
          break;
        case "pending_contingency":
          messageTitle = "Pago pendiente";
          messageBody = `<p>Estamos procesando tu pago.</p>
          <p>No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó.</p>`;
          break;
        case "pending_review_manual":
          messageTitle = "Pago pendiente";
          messageBody = `<p>Estamos procesando tu pago.</p>
          <p>No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó o si necesitamos más información.</p>`;
          break;
        case "cc_rejected_bad_filled_card_number":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Revisa el número de tarjeta.</p>`;
          break;
        case "cc_rejected_bad_filled_date":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Revisa la fecha de vencimiento.</p>`;
          break;
        case "cc_rejected_bad_filled_other":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Revisa los datos.</p>`;
          break;
        case "cc_rejected_bad_filled_security_code":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Revisa el código de seguridad de la tarjeta.</p>`;
          break;
        case "cc_rejected_blacklist":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>No pudimos procesar tu pago.</p>`;
          break;
        case "cc_rejected_call_for_authorize":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Debes autorizar ante el metodo de pago.</p>`;
          break;
        case "cc_rejected_card_disabled":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Llama a tu metodo de pago para activar tu tarjeta o usa otro medio de pago.</p>
          <p>El teléfono está al dorso de tu tarjeta.</p>`;
          break;
        case "cc_rejected_card_error":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>No pudimos procesar tu pago.</p>`;
          break;
        case "cc_rejected_duplicated_payment":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Ya hiciste un pago por ese valor.</p>
          <p>Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.</p>`;
          break;
        case "cc_rejected_high_risk":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Tu pago fue rechazado.</p>
          <p>Elige otro de los medios de pago, te recomendamos con medios en efectivo.</p>`;
          break;
        case "cc_rejected_invalid_installments":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>El metodo de pago no procesa pagos en ${mpResponse.installment} cuotas.</p>
          <p>Elige otro de los medios de pago, te recomendamos con medios en efectivo.</p>`;
          break;
        case "cc_rejected_max_attempts":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>Llegaste al límite de intentos permitidos.</p>
          <p>Elige otra tarjeta u otro medio de pago.</p>`;
          break;
        case "cc_rejected_other_reason":
          messageTitle = "Pago Rechazado.";
          messageBody = `<p>No seprocesó el pago.</p>`;
          break;
      }
      Swal.fire({
        width: 600,
        icon: "error",
        title: messageTitle,
        html: messageBody,
        showConfirmButton: true,
        confirmButtonColor: "#80c35d",
      });
    },

    notifyParent(status) {
      const resultData = {
        type: "mp-checkout-result",
        status,
        success: status === "approved",
        query: this.$route.query
      };

      // Guardar en localStorage para comunicación entre pestañas (Safari/iOS)
      try {
        localStorage.setItem('checkout_completed', JSON.stringify(resultData));
      } catch (e) {
        console.log("localStorage error", e);
      }

      // PostMessage para comunicación con iframe (Chrome/Windows/Android)
      try {
        window.parent?.postMessage(resultData, window.location.origin);
      } catch (error) {
        console.log("mp-checkout-result-notify", error);
      }

      // Si estamos en una ventana abierta con window.open, intentar cerrarla después de mostrar el resultado
      // Solo si fue abierta desde otra ventana y el pago fue exitoso
      if (status === "approved" && window.opener) {
        setTimeout(() => {
          // No cerrar automáticamente, dejar que el usuario vea el mensaje
        }, 2000);
      }
    },
  },
};
</script>

<style>
</style>
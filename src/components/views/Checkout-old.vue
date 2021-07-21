<template>
  <div id="checkout">

    <div id="header">

      <h1>{{ form.name.toUpperCase() }}</h1>

      <div id="links">
        <router-link to="/">INICIO</router-link> / <span>{{ form.name.toUpperCase() }}</span>
      </div>
    </div>

    <div id="content">
      <div id="forms-wrapper">

        <h2>{{ form.subtitle.toUpperCase() }}</h2>
        <ValidationObserver class="form" v-slot="flags">

          <ValidationProvider tag="fieldset" :rules="field.rules" v-slot="{ errors }"
            class="field" :class="field.classes" v-for="field in form.fields" :key="field.name">

            <label :for="field._name">{{ field.name.toUpperCase() }}</label>
            <input :type="field.type" :name="field._name" :id="field._name" :placeholder="field.placeholder" v-model="field.value">
            <span class="errors">{{ errors[0] }}</span>

          </ValidationProvider>

          <button type="submit" @click="submitForm" v-if="form.submitButton && !displayAlternateForm"
            :disabled="flags.invalid">{{ form.buttonText }}</button>

        </ValidationObserver>

        <div id="alternate-shipping-address-form">
          <input id="alternate-shipping-address" type="checkbox" v-model="displayAlternateForm">
          <label for="alternate-shipping-address">Direccion de envio alternativa</label>
        </div>

        <h2 v-if="displayAlternateForm">{{ alternateShippingForm.subtitle.toUpperCase() }}</h2>
        <ValidationObserver class="form" v-slot="flags" v-if="displayAlternateForm">

          <ValidationProvider tag="fieldset" :rules="field.rules" v-slot="{ errors }"
            class="field" :class="field.classes" v-for="field in alternateShippingForm.fields" :key="field.name">

            <label :for="field._name">{{ field.name.toUpperCase() }}</label>
            <input :type="field.type" :name="field._name" :id="field._name" :placeholder="field.placeholder" v-model="field.value">
            <span class="errors">{{ errors[0] }}</span>

          </ValidationProvider>

          <button type="submit" @click="submitForm" v-if="form.submitButton"
            :disabled="flags.invalid">{{ alternateShippingForm.buttonText }}</button>

        </ValidationObserver>

      </div>

      <div id="order-details">
        <h4>DETALLES DE ORDEN</h4>

        <div id="order-details-wrappers">
          <div class="cart-item" v-for="item in getCartItems()" :key="item.id">
            <span class="item-name">{{ item.title }} ({{ item.quantity }})</span>
            <span class="item-price">${{ item.retail_price }}</span>
          </div>
          <div id="order-total" class="cart-item">
            <div><b>TOTAL:</b></div>
            <div>${{ orderTotal }}</div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable camelcase */

import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, alpha_num, alpha_spaces } from 'vee-validate/dist/rules'
import { mapGetters } from 'vuex'

extend('email', { ...email, message: 'Este correo electronico no es valido' })
extend('required', { ...required, message: 'Este campo es requerido' })
extend('alpha_num', { ...alpha_num, message: 'Este campo debe contener solo caracteres alfa-numericos' })
extend('alpha_spaces', { ...alpha_spaces, message: 'Este campo solo puede contener letras' })

export default {
  name: 'Checkout',
  components: {
    ValidationProvider,
    ValidationObserver
  },

  data () {
    return {
      displayAlternateForm: false,
      form: {
        name: 'Checkout',
        subtitle: 'Detalles de pago',
        fields: [
          {
            name: 'Nombre',
            _name: 'name',
            type: 'text',
            placeholder: 'Nombre de la persona que recibe',
            value: '',
            rules: {
              required: true,
              alpha: true
            },
            classes: ['short']
          },
          {
            name: 'Apellidos',
            _name: 'last_name',
            type: 'text',
            placeholder: 'Apellido de la persona que recibe',
            value: '',
            rules: {
              required: true,
              alpha: true
            },
            classes: ['short']
          },
          {
            name: 'Correo electronico',
            _name: 'email',
            type: 'email',
            placeholder: 'Ejemplo@stadio.com.ar',
            value: '',
            rules: {
              required: true,
              email: true
            },
            classes: ['short']
          },
          {
            name: 'Numero de telefono',
            _name: 'phone_number',
            type: 'text',
            placeholder: 'Ejemplo: +58 1234567',
            value: '',
            rules: {
              required: true,
              numeric: true
            },
            classes: ['short']
          },
          {
            name: 'Nombre de empresa (Opcional)',
            _name: 'company_name',
            type: 'text',
            placeholder: 'Ingresa el nombre de la empresa que recibe',
            value: '',
            rules: {
              required: false,
              alpha_num: true
            },
            classes: ['short']
          },
          {
            name: 'Pais',
            _name: 'country',
            type: 'text',
            placeholder: 'Ingresa el pais asociado a la cuenta',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Codigo Postal',
            _name: 'zip',
            type: 'number',
            placeholder: 'Ingresa tu codigo postal',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Provincia',
            _name: 'province',
            type: 'text',
            placeholder: 'Ingresa tu provincia',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Calle',
            _name: 'street',
            type: 'text',
            placeholder: 'Ingresa el nombre de la calle',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Numero',
            _name: 'street',
            type: 'number',
            placeholder: 'Ingresa el numero de casa',
            value: '',
            rules: {
              required: false,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Departamento',
            _name: 'city',
            type: 'text',
            placeholder: 'Ingresa el departamento',
            value: '',
            rules: {
              required: false,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Entre calles',
            _name: 'between',
            type: 'text',
            placeholder: 'Ingresa calles referenciales',
            value: '',
            rules: {
              required: false,
              alpha_spaces: true
            },
            classes: ['short']
          }
        ],
        submitButton: true,
        buttonText: 'Confirmar orden'
      },
      alternateShippingForm: {
        name: 'Direccion de envio',
        subtitle: 'Direccion de envio alternativa',
        fields: [
          {
            name: 'Nombre',
            _name: 'name',
            type: 'text',
            placeholder: 'Nombre de la persona que recibe',
            value: '',
            rules: {
              required: true,
              alpha: true
            },
            classes: ['short']
          },
          {
            name: 'Apellidos',
            _name: 'last_name',
            type: 'text',
            placeholder: 'Apellido de la persona que recibe',
            value: '',
            rules: {
              required: true,
              alpha: true
            },
            classes: ['short']
          },
          {
            name: 'Correo electronico',
            _name: 'email',
            type: 'email',
            placeholder: 'Ejemplo@stadio.com.ar',
            value: '',
            rules: {
              required: true,
              email: true
            },
            classes: ['short']
          },
          {
            name: 'Numero de telefono',
            _name: 'phone_number',
            type: 'text',
            placeholder: 'Ejemplo: +58 1234567',
            value: '',
            rules: {
              required: true,
              numeric: true
            },
            classes: ['short']
          },
          {
            name: 'Nombre de empresa (Opcional)',
            _name: 'company_name',
            type: 'text',
            placeholder: 'Ingresa el nombre de la empresa que recibe',
            value: '',
            rules: {
              required: false,
              alpha_num: true
            },
            classes: ['short']
          },
          {
            name: 'Pais',
            _name: 'country',
            type: 'text',
            placeholder: 'Ingresa el pais asociado a la cuenta',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Codigo Postal',
            _name: 'zip',
            type: 'number',
            placeholder: 'Ingresa tu codigo postal',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Provincia',
            _name: 'province',
            type: 'text',
            placeholder: 'Ingresa tu provincia',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Calle',
            _name: 'street',
            type: 'text',
            placeholder: 'Ingresa el nombre de la calle',
            value: '',
            rules: {
              required: true,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Numero',
            _name: 'street',
            type: 'number',
            placeholder: 'Ingresa el numero de casa',
            value: '',
            rules: {
              required: false,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Departamento',
            _name: 'city',
            type: 'text',
            placeholder: 'Ingresa el departamento',
            value: '',
            rules: {
              required: false,
              alpha_spaces: true
            },
            classes: ['short']
          },
          {
            name: 'Entre calles',
            _name: 'between',
            type: 'text',
            placeholder: 'Ingresa calles referenciales',
            value: '',
            rules: {
              required: false,
              alpha_spaces: true
            },
            classes: ['short']
          }
        ],
        submitButton: true,
        buttonText: 'Confirmar orden con detalles alternativos'
      }
    }
  },

  computed: {
    orderTotal: function () {
      let result = 0
      this.getCartItems().forEach(item => {
        result += (item.retail_price * item.quantity)
      })
      return result
    }
  },

  methods: {
    ...mapGetters({
      getCartItems: 'cart/GET_ITEMS'
    }),

    submitForm: function () {
      console.log('Checkout Form submitted')
    }
  }
}
</script>

<style lang="scss" scoped>

.short {
  flex: 1 0 20%;
}

#content {
  display: flex;
}

#forms-wrapper {
  flex: 3 0;
}

.form {
  display: flex;
  flex-wrap: wrap;
}

.field {
  flex: 1 0 40%;
  margin: 0 1em 0 0;
}

#order-details {
  background-color: #f5f5f5;
  margin: 3em 0 0 0;
  padding: 2em;
  flex: 1 0;
  height: fit-content;

  h4 {
    margin: 0 0 1em 0;
  }
}

#order-details-wrapper {
  display: flex;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin: 0 0 .3em 0;
  padding: 0 0 .2em 0;
  border-bottom: 1px solid #dddddd;
}

.item-price {
  color: #909090;
}

#order-total {
  display: flex;
  border: none;
  margin-bottom: 0;
}

</style>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <navegation-component title="CHECKOUT" sub_title="CHECKOUT" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <h2 class="font-weight-bold">DETALLES DEL PAGO</h2>
      </v-col>
      <v-col cols="12" md="9">
        <v-row>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">NOMBRE</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Nombre de la persona que recibe"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">APELLIDOS</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Apellidos de la persona que recibe"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">CORREO ELECTRONICO</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="ejemplo@mail.com"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">NUMERO DE TELEFONO</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="+5788990011"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">NOMBRE DE LA EMPRESA (OPCIONAL)</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Mi empresa"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">PAIS</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Pais"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">CODIGO POSTAL</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="1020"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">PROVINCIA</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="San Martin"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">CALLE</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Mi calle"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">NUMERO</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="110022"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">DEPARTAMENTO</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Departamento"
              outlined
              tile
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" class="mb-n5">
            <label for="name">ENTRE CALLE</label>
            <v-text-field
              class="mt-3"
              dense
              placeholder="Calle"
              outlined
              tile
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3">
        <v-card class="elevation-0" color="#FAFAFA">
          <v-card-text>
            <h3 class="black--text text-center">Detalles de la orden</h3>
            <div class="d-flex justify-space-between mt-5">
              <p>Nombre de producto</p>
              <p>$339988</p>
            </div>
            <div class="d-flex justify-space-between">
              <p>Detalle</p>
              <p>$0</p>
            </div>
            <div class="d-flex justify-space-between">
              <p>Detalle</p>
              <p>$0</p>
            </div>
            <div class="d-flex justify-space-between">
              <p>Detalle</p>
              <p>$0</p>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between">
              <p class="font-weight-bold black--text">TOTAL</p>
              <p>$339988</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col></v-col>
      <v-col cols="12" md="12">
        <div class="d-flex justify-center justify-md-start">
          <v-btn large dark tile color="black" class="text-capitalize">
            Continuar orden
          </v-btn>
        </div>
        <div class="d-flex justify-center justify-md-start">
          <v-checkbox
            label="Direccion alternativa"
          ></v-checkbox>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NavegationComponent from "@/components/Utils/navegation_component";
export default {
  components: {
    "navegation-component": NavegationComponent,
  },
};
</script>

<style>
</style>
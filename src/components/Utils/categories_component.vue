<template>
  <v-row>
    <v-col cols="12" md="12">
      <v-card flat class="elevation-0" color="#F5F5F5">
        <v-row class="my-10">
          <v-col cols="12" md="4" v-for="(item, index) in list" :key="index">
            <v-row class="ml-5 my-7">
              <v-col cols="2">
                <v-icon size="55" color="black">mdi-{{ item.icon }}</v-icon>
              </v-col>
              <v-col cols="10" md="10">
                <span style="font-weight: 800; font-size: 22px">
                  {{ item.title }}
                </span>
                <br />
                <span class="mt-n5" style="color: #909090; font-size: 16px">{{
                  item.description
                }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          title: "Title 1",
          description: "Description 1",
          icon: "dump-truck",
        },
        {
          title: "Title 2",
          description: "Description 2",
          icon: "tag",
        },
        {
          title: "Title 3",
          description: "Description 3",
          icon: "currency-usd",
        },
      ],
    };
  },
};
</script>

<style>
</style>
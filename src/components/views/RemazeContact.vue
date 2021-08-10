<template>
  <div data-reamaze-embed="contact" data-reamaze-embed-form-id="27495"></div>
</template>

<script>
export default {
  mounted() {
    const remaze = window._support || { ui: {}, user: {} };
    remaze["account"] = "edifier";
    remaze["contact_custom_fields"] = remaze["contact_custom_fields"] || {};
    remaze["contact_custom_fields"]["rmz_form_id_27495"] = {};
  },
};
</script>

<style>
</style>
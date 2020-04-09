<template>
  <v-alert
    border="left"
    colored-border
    color="red"
    elevation="2"
  >
    <div class="card-title">
      {{ firstName }} {{ lastName }}
    </div>
    <div>{{ addressLine1 }}</div>
    <div>{{ addressline2 }}</div>
    <div>{{ city }} {{ plz }}</div>
    <div>
      Email:{{ email }}
    </div>
    <div>
      Phone:{{ tel }}
    </div>
    <div>
      {{ date }} {{ time }}
    </div>
    <div>
      {{ note }}
    </div>
  </v-alert>
</template>

<script>
  export default {
    name: 'AddressInfoBlock',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      addressInfo: Object,
    },
    data: function () {
      return {
        ...this.addressInfo,
      }
    },
  }
</script>

<style scoped>

</style>

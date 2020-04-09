<template>
  <v-chip
    class="ma-1"
    elevation="2"
    color="green"
    text-color="white"
  >
    {{ name }}
    <v-avatar
      right
      class="green darken-4"
    >
      {{ sumCount }}
    </v-avatar>
  </v-chip>
</template>

<script>
  export default {
    name: 'SmallDish',
    props: {
      // eslint-disable-next-line vue/require-default-prop
      dishOrderDetail: Object,
    },
    data: function () {
      return {
        ...this.dishOrderDetail,
      }
    },
  }
</script>

<style scoped>

</style>

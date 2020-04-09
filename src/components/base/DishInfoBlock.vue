<template>
  <v-alert
    elevation="2"
  >
    <div class="subtitle-2">
      菜品列表
    </div>
    <template
      v-for=" dish in dishes"
    >
      <small-dish
        :key="dish.dishesId"
        :dish-order-detail="dish"
      />
    </template>
  </v-alert>
</template>

<script>
  import SmallDish from './SmallDish'

  export default {
    name: 'DishInfoBlock',
    components: { SmallDish },
    props: {
      // eslint-disable-next-line vue/require-default-prop
      dishOrders: Array,
    },
    data: function () {
      return {
        dishes: this.dishOrders,
      }
    },
    watch: {
      dishes: function () {

      },
    },
  }
</script>

<style scoped>

</style>

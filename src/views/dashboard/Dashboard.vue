<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="8"
        sm="8"
      >
        <v-card
          class="mx-auto my-12"
        >
          <v-img
            height="600"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>

          <v-card-title>Now Begin to Manage Your Restaurants!</v-card-title>

          <v-card-text>
            <div class="my-4 subtitle-1">
              Aaden Staff Management System
            </div>

            <div>SIMPLE, BUT NOT SIMPLER.</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
        sm="4"
      >
        <v-col
          v-for="item in desserts"
          :key=item
          class="d-flex child-flex"
        >
          <template>
            <base-material-stats-card
              color="primary"
              icon="mdi-store"
              sub-icon="mdi-tag"
              :sub-text="item.address.addressLine + ' ' + item.address.city + ' ' + item.address.state + ', ' + item.address.postcode + ' ' + item.address.country"
              :title="'Staff: ' + item.personCount"
              :value="item.name"
            />
          </template>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { getHomepageRestaurantInfo } from '../../components/Utlis/api'

  export default {
    name: 'Dashboard',
    data () {
      return {
        desserts: [],
      }
    },

    computed: {
    },
    created () {
      this.onceData()
    },
    methods: {
      onceData () {
        getHomepageRestaurantInfo().then(res => {
          this.desserts = res.content
        })
      },
    },
  }
</script>

<style lang="sass">
  #coloured-line
    .ct-series-a .ct-line,
    .ct-series-a .ct-point
      stroke: #00cae3 !important

    #multiple-bar
      .ct-series-a .ct-bar
        stroke: #00cae3 !important

      .ct-series-b .ct-bar
        stroke: #f44336 !important

    #pie
      .ct-series-a .ct-slice-pie
        fill: #00cae3 !important

      .ct-series-b .ct-slice-pie
        fill: #f44336 !important
</style>

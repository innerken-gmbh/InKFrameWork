<template>
  <v-container
    id="data-tables"
    class="fill-height align-start"
    fluid
    tag="section"
  >
    <v-container
      fluid
    >
      <base-material-card
        class="px-5 py-3 "
        color="indigo"
        icon="mdi-table-chair"
        inline
      >
        <template v-slot:after-heading>
          <div class="display-2 font-weight-light">
            {{ $t("My Restaurants") }}
          </div>
        </template>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          class="ml-auto"
          hide-details
          label="Search"
          single-line
          style="max-width: 250px;"
        />
        <v-divider class="mt-3"/>
        <v-data-table
          :fixed-header="true"
          :headers="headers"
          :items="desserts"
          :items-per-page="15"
          :loading="loading"
          :search.sync="search"
          multi-sort
        >
          <template v-slot:footer>
            <v-toolbar
              color="white"
              flat
            >
              <v-spacer/>
              <v-dialog
                v-model="dialog"
                max-width="500px"
              >
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mb-2"
                    color="primary"
                    dark
                    v-on="on"
                  >
                    {{ $t("New Restaurant") }}
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            item-text="name"
                            :label="$t('restaurantname')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-switch
                            v-model="editedItem.flag"
                            :label="$t('isOpen')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="12"
                          sm="6"
                        >
                          <span class="subtitle-1 font-weight-bold">{{ $t('Enter the Address') }}</span>
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="addressItem.addressLine"
                            :label="$t('addressLine')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="addressItem.city"
                            :label="$t('city')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="addressItem.state"
                            :label="$t('state')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="addressItem.postcode"
                            :label="$t('postcode')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="addressItem.country"
                            :label="$t('country')"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer/>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="close"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="save"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              class="mr-2"
              small
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn
              color="primary"
              @click="initialize"
            >
              Reset
            </v-btn>
          </template>
          <template v-slot:item.flag="{ item }">
            <v-checkbox
              :readonly="true"
              :input-value="item.flag==='1'"
              disabled
            />
          </template>
        </v-data-table>
      </base-material-card>
    </v-container>
  </v-container>
</template>

<script>

  import { addRestaurant, addAddress, deleteRestaurant, updateRestaurant, getAllRestaurantInfo, updateAddress } from '../../components/Utlis/api'
  import Utils from '../../components/Utlis/Utils'

  export default {
    data: function () {
      return ({
        loading: true,
        dialog: false,
        headers: [
          {
            text: 'Id',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          {
            text: this.$i18n.t('restaurantname'),
            value: 'name',
          },
          {
            text: this.$i18n.t('address'),
            value: 'addressinfo',
          },
          {
            text: this.$i18n.t('isOpen'),
            value: 'flag',
          },
          {
            text: this.$i18n.t('action'),
            value: 'action',
            sortable: false,
          },
        ],
        search: '',
        desserts: [],
        sourcedata: [],
        editedIndex: -1,
        editedItem: {
          id: -1,
          name: '',
          flag: '',
          addressID: -1,
          addressinfo: '',
        },
        defaultItem: {
          id: -1,
          name: '',
          flag: '',
          addressID: -1,
          addressinfo: '',
        },
        addressItem: {
          id: -1,
          addressLine: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          adjustSign: 0,
        },
        defaultAddressItem: {
          id: -1,
          addressLine: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          adjustSign: 0,
        },
        newItemaddressId: -1,
      })
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? this.$i18n.t('New Restaurant') : this.$i18n.t('Edit')
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      async initialize () {
        await getAllRestaurantInfo().then(res => {
          this.desserts = res.content
          this.getItemAddress()
          // console.log(res)
        })
      },
      getItemAddress () {
        for (const i of this.desserts) {
          i.addressinfo = i.address.addressLine + ' ' + i.address.city + ' ' + i.address.state + ', ' + i.address.postcode + ' ' + i.address.country
        }
        this.loading = false
      },
      reloadItem () {
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.addressItem = Object.assign({}, item.address)
        // console.log(this.desserts.indexOf(item))
        this.dialog = true
      },

      deleteItem (item) {
        Utils.showConfirm('Are you sure?', 'you want to delete this item?', () => {
          deleteRestaurant(item.id).then(() => {
            Utils.toast('删除成功')
            this.initialize()
          })
        })
      },

      close () {
        this.dialog = false
        this.editedIndex = -1
      },

      save () {
        if (this.editedIndex > -1) {
          console.log(this.editedIndex)
          updateAddress(this.addressItem.addressLine, this.addressItem.city, this.addressItem.state, this.addressItem.postcode, this.addressItem.country, this.addressItem.adjustSign, this.addressItem.id).then((res) => {
            Utils.toast('添加成功')
            this.editedItem.addressID = res.content.id
            updateRestaurant(this.editedItem.name, this.editedItem.addressID, this.editedItem.flag, this.editedItem.id).then((res) => {
              Utils.toast('添加成功')
              this.initialize()
            })
          })
          //  Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          addAddress(this.addressItem.addressLine, this.addressItem.city, this.addressItem.state, this.addressItem.postcode, this.addressItem.country, this.addressItem.adjustSign).then((res) => {
            Utils.toast('添加成功')
            this.editedItem.addressID = res.content.id
            addRestaurant(this.editedItem.name, this.editedItem.addressID, this.editedItem.flag).then((res) => {
              Utils.toast('添加成功')
              this.initialize()
            })
          })
        }
        this.close()
      },
    },
  }
</script>

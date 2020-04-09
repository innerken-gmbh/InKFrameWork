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
        icon="mdi-account"
        inline
      >
        <template v-slot:after-heading>
          <div class="display-2 font-weight-light">
            {{ $t('Staff Management') }}
          </div>
        </template>
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="6"
          >
            <v-select
              v-model="ResItem.restaurantId"
              :items="RestaurantList"
              item-text="name"
              item-value="id"
              :label="$t('Choose your restaurant')"
              @change="reloadItem (ResItem.restaurantId)"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
            sm="6"
          >
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              class="ml-auto"
              hide-details
              label="Search"
              single-line
              style="max-width: 250px;"
            />
          </v-col>
        </v-row>
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
              <v-btn
                class="mb-2"
                color="primary"
                dark
                @click = "create()"
              >
                {{ $t('New Staff') }}
              </v-btn>
            </v-toolbar>
          </template>
          <template v-slot:item.action2="{ item }">
            <v-btn
              color="blue darken-1"
              text
              left
              @click="goWorkRecord(item)"
            >
              Staff record
            </v-btn>
          </template>
          <template v-slot:item.action1="{ item }">
            <v-btn
              color="primary darken-1"
              text
              left
              @click="goCheckRecord(item)"
            >
              Check-in record
            </v-btn>
          </template>
          <template v-slot:item.action="{ item }">
            <v-icon
              class="mr-2"
              small
              @click="goNext(item)"
            >
              mdi-arrow-right
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
          <template v-slot:item.isActive="{ item }">
            <v-checkbox
              :readonly="true"
              :input-value="item.isActive==='1'"
              disabled
            />
          </template>
        </v-data-table>
      </base-material-card>
    </v-container>
  </v-container>
</template>

<script>

  import {
    addTable,
    deleteTable,
    getAllRestaurantInfo,
    getEmployeeByResId,
    updateTable,
  } from '../../components/Utlis/api'
  import Utils from '../../components/Utlis/Utils'

  export default {
    data: function () {
      return ({
        loading: true,
        dialog: false,
        showLabel: false,
        headers: [
          {
            text: this.$i18n.t('firstName'),
            align: 'start',
            value: 'firstName',
          },
          {
            text: this.$i18n.t('lastName'),
            value: 'lastName',
          },
          {
            text: this.$i18n.t('position'),
            value: 'position',
          },
          {
            text: this.$i18n.t('powerBW'),
            value: 'powerBW',
          },
          {
            text: this.$i18n.t('workNumber'),
            value: 'workNumber',
          },
          {
            text: this.$i18n.t('gender'),
            value: 'gender',
          },
          {
            text: this.$i18n.t('Active'),
            value: 'isActive',
          },
          {
            text: this.$i18n.t('action2'),
            value: 'action2',
            align: 'center',
            sortable: false,
          },
          {
            text: this.$i18n.t('action1'),
            value: 'action1',
            align: 'center',
            sortable: false,
          },
          {
            text: this.$i18n.t('action'),
            value: 'action',
            sortable: false,
          },
        ],
        search: '',
        desserts: [],
        RestaurantList: [],
        editedIndex: -1,
        ResItem: {
          restaurantId: -1,
          restaurantName: '',
        },
        editedItem: {
          name: '',
          seatCount: '',
          sectionId: -1,
          sectionName: '',
          id: -1,
        },
        defaultItem: {
          name: '',
          seatCount: '',
          sectionId: -1,
          sectionName: '',
          id: -1,
        },
      })
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? this.$i18n.t('New Staff') : this.$i18n.t('Edit')
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
          this.RestaurantList = res.content
        })
        this.ResItem.restaurantId = this.RestaurantList[0].id
        this.reloadItem(this.ResItem.restaurantId)
      },
      reloadItem (id) {
        this.desserts = []
        getEmployeeByResId(id).then(res => {
          // console.log(res)
          this.loading = false
          for (const item of res.content.members) {
            for (const staffItem of item) {
              if (staffItem.gender === '1') {
                staffItem.gender = '男'
              } else {
                staffItem.gender = '女'
              }
              if (staffItem.powerBW === '1') {
                staffItem.powerBW = '员工'
              } else {
                staffItem.powerBW = '经理'
              }
              this.desserts.push(staffItem)
            }
          }
        })
      },
      editItem (item) {
        this.showLabel = true
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        Utils.showConfirm('Are you sure?', 'you want to delete this item?', () => {
          deleteTable(item.id).then(() => {
            Utils.toast('删除成功')
            this.reloadItem()
          })
        })
      },
      goCheckRecord (item) {
        console.log(item.id)
        this.$router.push({
          name: 'Staff Check-in Record',
          params: { id: item.id },
        })
      },
      goWorkRecord (item) {
        console.log(item.id)
        this.$router.push({
          name: 'Staff Work Record',
          params: { id: item.id },
        })
      },
      goNext (item) {
        console.log(item.id)
        this.$router.push({
          name: 'Staff Infomation',
          params: { id: item.id },
        })
      },
      create () {
        this.$router.push({
          name: 'Staff Infomation',
          params: { id: -1 },
        })
      },
      close () {
        this.dialog = false
        this.editedIndex = -1
      },

      save () {
        if (this.editedIndex > -1) {
          console.log(this.editedIndex)
          updateTable(this.editedItem.sectionId, this.editedItem.name, this.editedItem.seatCount, this.editedItem.id).then(
            () => {
              Utils.toast('编辑成功')
              this.reloadItem()
            },
          )
          //  Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          console.log(this.editedItem)
          addTable(this.editedItem.sectionId, this.editedItem.name, this.editedItem.seatCount).then((res) => {
            Utils.toast('添加成功')
            this.reloadItem()
          })
        }
        this.close()
      },
    },
  }
</script>

<template>
  <base-material-card
    class="px-5 py-3 "
    color="indigo"
    icon="mdi-account-switch"
    inline
  >
    <template v-slot:after-heading>
      <div class="display-2 font-weight-light">
        {{ $t('人员管理') }}
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
      :items="tableItem"
      :items-per-page="15"
      :loading="loading"
      :search.sync="search"
      multi-sort
    >
      <template v-slot:footer>
        <general-form
          title="人员管理"
          :dialog="dialog"
          :edited-item="editedItem"
          :edited-index="editedIndex"
          :form-field="exampleFormField"
          @change-general-form="dialogChange"
        />
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
          @click="reload"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </base-material-card>
</template>

<script>

  import GeneralForm from './GeneralForm'
  import Utils from '../Utlis/Utils'
  import { deleteOneServant, getServantList } from '../Utlis/api'

  export default {
    name: 'InnerKenDataTable',
    components: { GeneralForm },
    props: {
      headers: {
        type: Array,
        default: () => [],
      },
      items: {
        type: Array,
        default: () => [],
      },
      editedItemProp: {
        type: Object,
        default: () => {
        },
      },
    },
    data: function () {
      return {
        search: '',
        dialog: false,
        loading: true,
        tableItem: this.items,
        editedIndex: -1,
        editedItem: this.editedItemProp,
        defaultItem: {
          photo: '',
          id: 0,
          name: '',
          permission: 0,
          password: '',
          isPartTime: 0,
        },
      }
    },
    created () {
      this.initialize()
      this.uploadFile = null
    },
    methods: {
      async initialize () {
        await getServantList().then(res => {
          this.tableItem = res.content
          this.loading = false
          // console.log(res)
        })
      },
      dialogChange (val) {
        console.log(val)
        this.dialog = val
      },
      close () {
        console.log('should close')
        this.dialog = false
      },
      editItem (item) {
        this.editedIndex = this.tableItem.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if (this.editedItem.permission === '0') {
          this.editedItem.permission = 0
        }
        if (this.editedItem.permission === '1') {
          this.editedItem.permission = 1
        }
        if (this.editedItem.isPartTime === '0') {
          this.editedItem.isPartTime = 0
        }
        if (this.editedItem.isPartTime === '1') {
          this.editedItem.isPartTime = 1
        }
        this.dialog = true
      },
      deleteItem (item) {
        Utils.showConfirm('Are you sure?', 'you want to delete this item?', () => {
          deleteOneServant(item.id).then(() => {
            Utils.toast('删除成功')
            this.initialize()
          })
        })
      },
      reload: function () {

      },
    },
  }
</script>

<style scoped>

</style>

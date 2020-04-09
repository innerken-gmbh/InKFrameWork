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
        icon="mdi-card-account-details-outline"
        inline
      >
        <template v-slot:after-heading>
          <div class="display-2 font-weight-light">
            {{ $t("过敏源设置") }}
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
                    {{ $t("添加过敏源") }}
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
                            label="ID"
                            value="Auto"
                            disabled
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.name"
                            :label="$t('allergName')"
                            item-text="name"
                            item-value="id"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.icon"
                            :label="$t('icon')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.shortName"
                            :label="$t('shortName')"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          sm="6"
                        >
                          <v-text-field
                            v-model="editedItem.displayText"
                            :label="$t('displayText')"
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
          <template v-slot:item.usageStatus="{ item }">
            <v-checkbox
              :readonly="true"
              :input-value="item.usageStatus==='1'"
              disabled
            />
          </template>
        </v-data-table>
      </base-material-card>
    </v-container>
  </v-container>
</template>

<script>

  import { addAllergen, deleteAllergen, getAllAllergen, updateAllergen } from '../../components/Utlis/api'
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
            text: this.$i18n.t('allergName'),
            value: 'name',
          },
          {
            text: this.$i18n.t('icon'),
            value: 'icon',
          },
          {
            text: this.$i18n.t('shortName'),
            value: 'shortName',
          },
          {
            text: this.$i18n.t('displayText'),
            value: 'displayText',
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
        sectionlist: [],
        editedIndex: -1,
        editedItem: {
          name: '',
          icon: '',
          displayText: '',
          shortName: '',
          id: -1,
        },
        defaultItem: {
          name: '',
          icon: '',
          shortName: '',
          displayText: '',
          id: -1,
        },
      })
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? this.$i18n.t('添加过敏源') : this.$i18n.t('编辑')
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
        await getAllAllergen().then(res => {
          this.loading = false
          this.desserts = res.content
          // console.log(res)
        })
      },
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        Utils.showConfirm('Are you sure?', 'you want to delete this item?', () => {
          deleteAllergen(item.id).then(() => {
            Utils.toast('删除成功')
            this.initialize()
          })
        })
      },

      goNext (item) {
        console.log(item.name)
        this.$router.push({ name: '桌子详情页', params: { id: item.id } })
      },
      close () {
        this.dialog = false
        this.editedIndex = -1
      },

      save () {
        if (this.editedIndex > -1) {
          console.log(this.editedIndex)
          updateAllergen(this.editedItem.name, this.editedItem.icon, this.editedItem.shortName, this.editedItem.displayText, this.editedItem.id).then(
            () => {
              Utils.toast('编辑成功')
              this.initialize()
            },
          )
          //  Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          console.log(this.editedItem)
          addAllergen(this.editedItem.name, this.editedItem.icon, this.editedItem.shortName, this.editedItem.displayText).then((res) => {
            Utils.toast('添加成功')
            this.initialize()
          })
        }
        this.close()
      },
    },
  }
</script>

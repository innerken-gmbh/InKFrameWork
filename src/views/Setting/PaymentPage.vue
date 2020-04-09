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
        icon="mdi-credit-card-outline"
        inline
      >
        <template v-slot:after-heading>
          <div class="display-2 font-weight-light">
            {{ $t('支付设置') }}
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
          :items-per-page="30"
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
                    {{ $t('添加新的支付方式') }}
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form
                      ref="form"
                      v-model="valid"
                      :lazy-validation="false"
                    >
                      <v-container>
                        <v-row>
                          <template>
                            <v-col
                              v-for="lang in editedItem.langs"
                              :key="lang.id"
                              cols="12"
                              sm="6"
                            >
                              <v-text-field
                                v-model="lang.name"
                                :rules="Utils.ValidateRules.NotEmpty"
                                :label="$t(lang.lang.toLowerCase())"
                                required
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              md="6"
                              sm="6"
                            >
                              <v-text-field
                                v-model="editedItem.apiKey"
                                :label="$t('apiKey')"
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              md="6"
                              sm="6"
                            >
                              <v-switch
                                v-model="editedItem.isOnline"
                                :label="$t('isOnline')"
                              />
                            </v-col>
                          </template>
                        </v-row>
                      </v-container>
                    </v-form>
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
                      :disabled="!valid"
                      color="blue darken-1"
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
          <template v-slot:item.isOnline="{ item }">
            <v-checkbox
              :readonly="true"
              :input-value="item.isOnline==='1'"
              disabled
            />
          </template>
        </v-data-table>
      </base-material-card>
    </v-container>
  </v-container>
</template>

<script>

  import { addPayment, deletePayment, getAllPayment, updatePayment } from '../../components/Utlis/api'
  import Utils from '../../components/Utlis/Utils'
  import i18n from '../../i18n'

  const config = require('@/assets/config.json')

  export default {
    data: function () {
      return ({
        dialog: false,
        categoryTypes: [],
        valid: true,
        headers: [
          {
            text: 'Id',
            align: 'start',
            value: 'id',
          },
          {
            text: this.$i18n.t('paymentname'),
            value: 'name',
          },
          {
            text: this.$i18n.t('isOnline'),
            value: 'isOnline',
          },
          {
            text: this.$i18n.t('apiKey'),
            value: 'apiKey',
          },
          {
            text: this.$i18n.t('action'),
            value: 'action',
            sortable: false,
          },
        ],
        Utils: Utils,
        search: '',
        desserts: [],
        editedIndex: -1,
        editedItem: {
          id: -1,
          dishesCategoryTypeId: -1,
          langs: Utils.deepCopy(config.supportLang),
          isOnline: 0,
          apiKey: '',
        },
        defaultItem: {
          id: -1,
          dishesCategoryTypeId: -1,
          langs: Utils.deepCopy(config.supportLang),
          isOnline: 0,
          apiKey: '',
        },
      })
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增支付方式' : '编辑'
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
      initialize () {
        this.reloadItem()
      },

      reloadItem () {
        getAllPayment().then(res => {
          // console.log(res)
          this.desserts = res.content
          this.formatItem()
        })
      },
      findLangInArray (langArray, target = i18n.locale) {
        return langArray.find((item) => {
          return item.lang.toLowerCase() === target.toLowerCase()
        })
      },
      formatItem () {
        for (const i of this.desserts) {
          i.name = this.findLangInArray(i.langs).name
        }
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)
        if (this.editedItem.isOnline === '0') {
          this.editedItem.isOnline = 0
        }
        if (this.editedItem.isOnline === '1') {
          this.editedItem.isOnline = 1
        }
        this.dialog = true
      },

      deleteItem (item) {
        Utils.showConfirm('Are you sure?', 'you want to delete this item?', () => {
          deletePayment(item.id).then(() => {
            Utils.toast('删除成功')
            this.reloadItem()
          })
        })
      },
      close () {
        this.formatItem()
        this.dialog = false
        this.editedItem = Utils.deepCopy(this.defaultItem)
        console.log(this.defaultItem)
        this.editedIndex = -1
      },
      save () {
        if (!this.$refs.form.validate()) {
          return
        }
        console.log(this.editedItem.isOnline)
        if (this.editedItem.isOnline === false) {
          this.editedItem.isOnline = 0
        }
        if (this.editedItem.isOnline === true) {
          this.editedItem.isOnline = 1
        }
        if (this.editedIndex > -1) {
          console.log(this.editedIndex)
          updatePayment(this.editedItem.langs, this.editedItem.isOnline, this.editedItem.apiKey, this.editedItem.id).then(
            () => {
              Utils.toast('编辑成功!')
              this.reloadItem()
            },
          )
          //  Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          addPayment(this.editedItem.langs, this.editedItem.isOnline, this.editedItem.apiKey).then((res) => {
            Utils.toast('添加成功!')
            this.reloadItem()
          })
        }
        this.close()
      },
    },
  }
</script>

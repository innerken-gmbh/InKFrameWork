<template>
  <v-container
    fluid
  >
    <base-material-card
      class="px-5 py-3 "
      color="indigo"
      icon="mdi-desktop-tower-monitor"
      inline
    >
      <template v-slot:after-heading>
        <div class="display-2 font-weight-light">
          {{ $t('餐馆身份') }}
        </div>
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="6"
          >
            <span class="subtitle-1 font-weight-bold">{{ $t('餐馆信息') }}</span>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.name"
              :label="$t('username')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.adress1"
              :label="$t('adress1')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.adress2"
              :label="$t('adress2')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.postCode"
              :label="$t('postCode')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.city"
              :label="$t('city')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.state"
              :label="$t('state')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.taxNumber"
              :label="$t('taxNumber')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.telephone"
              :label="$t('telephone')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="6"
          >
            <span class="subtitle-1 font-weight-bold">{{ $t('法人信息') }}</span>
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.inhalterName"
              :label="$t('inhalterName')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.inhalterLastName"
              :label="$t('inhalterLastName')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.inhalterTitle"
              :label="$t('inhalterTitle')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.emailAddress"
              :label="$t('emailAddress')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.totalRound"
              :label="$t('totalRound')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.maxDineTime"
              :label="$t('maxDineTime')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.roundTime"
              :label="$t('roundTime')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.roundDishCount"
              :label="$t('roundDishCount')"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.takeawayPriceModification"
              :label="$t('takeawayPriceModification')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-spacer/>
          <v-btn
            class="mb-2"
            color="primary"
            dark
            @click="summit()"
          >
            {{ $t('提交') }}
          </v-btn>
        </v-row>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>

  import { updateRestaurantInfo, getRestaurantInfo } from '../../components/Utlis/api'
  import Utils from '../../components/Utlis/Utils'

  export default {
    data: function () {
      return ({
        loading: true,
        search: '',
        desserts: [],
        resinfo: {},
        editedIndex: -1,
        editedItem: {
          name: '',
          adress1: '',
          adress2: '',
          postCode: '',
          city: '',
          state: '',
          taxNumber: '',
          telephone: '',
          inhalterName: '',
          inhalterLastName: '',
          inhalterTitle: '',
          emailAddress: '',
          totalRound: '',
          maxDineTime: '',
          roundTime: '',
          roundDishCount: '',
          takeawayPriceModification: '',
        },
        defaultItem: {
          name: '',
          adress1: '',
          adress2: '',
          postCode: '',
          city: '',
          state: '',
          taxNumber: '',
          telephone: '',
          inhalterName: '',
          inhalterLastName: '',
          inhalterTitle: '',
          emailAddress: '',
          totalRound: '',
          maxDineTime: '',
          roundTime: '',
          roundDishCount: '',
          takeawayPriceModification: '',
        },
      })
    },

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? this.$i18n.t('添加新的分区') : this.$i18n.t('编辑')
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
        await getRestaurantInfo().then(res => {
          this.desserts = res.content
          this.editedItem = this.desserts[0]
        })
      },
      summit () {
        Utils.showConfirm('Are you sure?', 'you want to summit', () => {
          updateRestaurantInfo(this.editedItem.name, this.editedItem.adress1, this.editedItem.adress2, this.editedItem.postCode, this.editedItem.city, this.editedItem.state, this.editedItem.taxNumber, this.editedItem.telephone, this.editedItem.inhalterName, this.editedItem.inhalterLastName, this.editedItem.inhalterTitle, this.editedItem.emailAddress, this.editedItem.totalRound, this.editedItem.maxDineTime, this.editedItem.roundTime, this.editedItem.roundDishCount, this.editedItem.takeawayPriceModification).then(() => {
            Utils.toast('修改成功')
            this.initialize()
          })
        })
      },
      close () {
        this.dialog = false
        this.editedIndex = -1
      },
    },
  }
</script>

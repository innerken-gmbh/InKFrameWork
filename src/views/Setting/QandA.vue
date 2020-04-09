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
          Q&A
        </div>
      </template>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="6"
          >
            <span class="subtitle-1 font-weight-bold">{{ $t('title') }}</span>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="6"
          >
            <v-text-field
              v-model="editedItem.title"
              :label="$t('title')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="6"
          >
            <span class="subtitle-1 font-weight-bold">{{ $t('description') }}</span>
          </v-col>
          <v-col
            cols="12"
            md="12"
            sm="6"
          >
            <v-textarea
              v-model="editedItem.content"
              :label="$t('problem')"
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
            {{ $t('Submit') }}
          </v-btn>
        </v-row>
      </v-container>
    </base-material-card>
  </v-container>
</template>

<script>

  import { sendMsg } from '../../components/Utlis/api'
  import Utils from '../../components/Utlis/Utils'

  export default {
    data: function () {
      return ({
        loading: true,
        desserts: [],
        editedIndex: -1,
        editedItem: {
          title: '',
          content: '',
        },
        defaultItem: {
          title: '',
          content: '',
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
      },
      summit () {
        Utils.showConfirm('Are you sure?', 'you want to summit', () => {
          sendMsg(this.editedItem.title, this.editedItem.content).then(() => {
            Utils.toast('提交成功')
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

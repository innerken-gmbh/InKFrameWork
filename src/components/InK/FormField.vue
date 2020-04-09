<template>
  <v-col
    v-if="(currentState===-1&&realField.inNew)||(currentState>-1&&realField.inEdit)"
    :cols="realField.cols"
    :md="realField.md"
    :sm="realField.sm"
  >
    <template v-if="realField.type.name==='text'">
      <v-text-field
        v-model="editedItem[realField.model]"
        :disabled="shouldDisable"
        :rules="rules"
        :label="realField.title"
      />
    </template>
    <template v-else-if="realField.type.name==='select'">
      <v-select
        v-model="editedItem[realField.model]"
        :disabled="shouldDisable"
        :items="realField.type.selectItems"
        :item-text="realField.type.itemText"
        :item-value="realField.type.itemValue"
        :label="realField.title"
        :rules="rules"
      />
    </template>
    <template v-else-if="realField.type.name==='switch'">
      <v-switch
        v-model="editedItem[realField.model]"
        :disabled="shouldDisable"
        :label="realField.title"
        :rules="rules"
      />
    </template>
    <template v-else-if="realField.type.name==='file'">
      <div
        v-if="currentState>-1"
      >
        <img-with-loading
          :height="200"
          :img-src="realField.type.root + editedItem[realField.model]"
        />
      </div>

      <v-file-input
        v-model="editedItem[realField.type.fileStorage]"
        :disabled="shouldDisable"
        :label="realField.title"
        :rules="rules"
        show-size
        counter
      />
    </template>
    <template v-else>
      <slot/>
    </template>
  </v-col>
</template>

<script>
  /*
  select type:
   {
    name:'',
    selectItems:'',
    itemText:'',
    itemValue:'',
   }
    file type:
   {
    name:'',
    root:'',
    fileStorge:'',
    itemValue:'',
   }
  *
  * */

  import ImgWithLoading from './ImgWithLoading'
  import Utils from '../Utlis/Utils'

  export default {
    name: 'FormField',
    components: { ImgWithLoading },
    props: {
      field: {
        type: Object,
        default: () => {
        },
      },
      editedItem: {
        type: Object,
        default: () => {
        },
      },
      currentState: {
        type: Number,
        default: -1,
      },
    },
    data: function () {
      // console.log(this.field)
      return {
        defaultField: {
          default: '',
          cols: 12,
          md: 6,
          sm: 12,
          title: 'not Set',
          type: { name: 'text' },
          inNew: true,
          inEdit: true,
          disableNew: false,
          disableEdit: false,
          model: {},
          rule: [],
          requiredEdit: true,
          requiredNew: true,
          required: true,
        },
        realField: {},
      }
    },
    computed: {
      isNew: function () {
        return this.currentState === -1
      },
      shouldDisable: function () {
        return (this.realField.disableNew && this.isNew) ||
          (this.realField.disableEdit && !this.isNew)
      },
      rules: function () {
        let rules = this.realField.rule
        if (this.realField.required && this.realField.type.name !== 'switch') {
          if (this.isNew && this.realField.requiredNew) {
            rules = rules.concat(Utils.ValidateRules.NotEmpty)
          } else if (!this.isNew && this.realField.requiredEdit) {
            rules = rules.concat(Utils.ValidateRules.NotEmpty)
          }
        }
        return rules
      },
    },
    created () {
      this.realField = Object.assign({}, this.defaultField, this.field)
    },
    methods: {
      processFile (event) {
        this.realField.type.uploadFile = event
      },
    },
  }
</script>

<style scoped>

</style>

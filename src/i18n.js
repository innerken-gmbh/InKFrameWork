import Vue from 'vue'
import VueI18n from 'vue-i18n'

import de from 'vuetify/lib/locale/de'
import en from 'vuetify/lib/locale/en'
import zhHans from 'vuetify/es5/locale/zh-Hans'

const config = require('@/assets/config.json')
Vue.use(VueI18n)

const messages = {
  en: {
    ...require('@/locales/en.json'),
    $vuetify: en,
  },
  de: {
    ...require('@/locales/de.json'),
    $vuetify: de,
  },
  zh: {
    ...require('@/locales/zh.json'),
    $vuetify: zhHans,
  },
}

export default new VueI18n({
  locale: config.DefaultLocale || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages,
})

<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          class="px-5 py-3"
          color="success"
          light
          max-width="100%"
          width="400"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon
                  v-text="social.icon"
                />
              </v-btn>
            </div>
          </template>
          <v-form v-model="valid">
            <v-card-text class="text-center">
              <validation-provider
                v-slot="{ errors }"
                name="username"
                rules="required|max:10"
              >
                <v-text-field
                  v-model="username"
                  :error-messages="errors"
                  :counter="10"
                  color="secondary"
                  class="mt-10"
                  label="Your user name..."
                  prepend-icon="mdi-face"
                  type="text"
                  required
                />
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="password"
                rules="required|max:10"
              >
                <v-text-field
                  v-model="password"
                  :error-messages="errors"
                  :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show3 ? 'text' : 'password'"
                  color="secondary"
                  class="mb-8"
                  label="Password..."
                  prepend-icon="mdi-lock-outline"
                  @click:append.prevent="show3 = !show3"
                />
              </validation-provider>
              <pages-btn
                class="v-btn--text success--text"
                color=""
                :disabled="!valid"
                depressed
                large
                @click="login"
              >
                Let's Go
              </pages-btn>
            </v-card-text>
          </v-form>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import Utils from '../../components/Utlis/Utils'
  import { Login } from '../../components/Utlis/api'

  export default {
    name: 'PagesLogin',
    components: {
      PagesBtn: () => import('./components/Btn'),
    },

    data: () => ({
      socials: [],
      valid: false,
      GS: Utils,
      show3: false,
      username: '',
      password: '',
    }),
    created () {
      // this.$store.commit('SAVE_CURRENT_DEVICE', -1)
    },

    methods: {
      login () {
        Login(this.password).then(res => {
          // this.$store.commit('SAVE_CURRENT_DEVICE', res.content[0].id)
          this.$router.push({ path: '/' })
        })
      },
    },
  }
</script>

<template>
  <v-container
    id="validation-forms"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Forms"
      link="components/forms"
    />

    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          class="py-3 px-5"
          color="success"
          icon="mdi-mail"
          title="Register Form"
        >
          <v-form>
            <v-text-field
              color="secondary"
              label="Email Address*"
            />

            <v-text-field
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              color="secondary"
              label="Password*"
              @click:append.prevent="show = !show"
            />

            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              color="secondary"
              label="Confirm Password*"
              @click:append.prevent="show2 = !show2"
            />

            <div class="body-2 font-weight-light">
              * Required Fields
            </div>

            <v-card-actions class="pa-0">
              <v-checkbox label="Subscribe to newsletter"/>
              <v-spacer/>

              <v-btn
                color="success"
                default
              >
                Register
              </v-btn>
            </v-card-actions>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          class="py-3 px-5"
          color="success"
          icon="mdi-camera-account"
          title="Login Form"
        >
          <v-form>
            <v-text-field
              color="secondary"
              label="Email Address*"
            />

            <v-text-field
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show3 ? 'text' : 'password'"
              color="secondary"
              label="Password*"
              @click:append.prevent="show3 = !show3"
            />

            <v-card-actions class="pa-0">
              <v-spacer/>

              <v-btn
                color="success"
                default
              >
                Login
              </v-btn>
            </v-card-actions>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12">
        <validation-observer v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(validateForm)">
            <base-material-card
              class="px-5 py-3"
              color="success"
              inline
              title="Type Validation"
            >
              <v-row
                align="center"
                dense
              >
                <v-col
                  class="text-right body-1 grey--text"
                  cols="2"
                >
                  Required Text
                </v-col>

                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required"
                  >
                    <v-text-field
                      v-model="required"
                      :error-messages="errors"
                      color="secondary"
                    />
                  </validation-provider>
                </v-col>

                <v-col>
                  <code>required</code>
                </v-col>
              </v-row>

              <v-row
                align="center"
                dense
              >
                <v-col
                  class="text-right body-1 grey--text"
                  cols="2"
                >
                  Email
                </v-col>

                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="email"
                    rules="required|email"
                  >
                    <v-text-field
                      v-model="email"
                      :error-messages="errors"
                      color="secondary"
                      type="email"
                    />
                  </validation-provider>
                </v-col>

                <v-col>
                  <code>type="email"</code>
                </v-col>
              </v-row>

              <v-row
                align="center"
                dense
              >
                <v-col
                  class="text-right body-1 grey--text"
                  cols="2"
                >
                  Number
                </v-col>

                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="number"
                    rules="required|numeric"
                  >
                    <v-text-field
                      v-model="number"
                      :error-messages="errors"
                      color="secondary"
                      type="number"
                    />
                  </validation-provider>
                </v-col>

                <v-col>
                  <code>type="number"</code>
                </v-col>
              </v-row>

              <v-row
                align="center"
                dense
              >
                <v-col
                  class="text-right body-1 grey--text"
                  cols="2"
                >
                  Url
                </v-col>

                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="url"
                    rules="required"
                  >
                    <v-text-field
                      v-model="url"
                      :error-messages="errors"
                      color="secondary"
                      type="url"
                    />
                  </validation-provider>
                </v-col>

                <v-col>
                  <code>type="url"</code>
                </v-col>
              </v-row>

              <div class="pa-3 text-center">
                <v-btn
                  color="success"
                  default
                  type="submit"
                >
                  Validate Inputs
                </v-btn>
              </div>
            </base-material-card>
          </form>
        </validation-observer>
      </v-col>

      <v-col cols="12">
        <validation-observer v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(validateForm)">
            <base-material-card
              color="success"
              inline
              title="Range Validation"
            >
              <v-row
                align="center"
                dense
              >
                <v-col
                  class="text-right body-1 grey--text"
                  cols="2"
                >
                  Min Length
                </v-col>

                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="min length"
                    rules="required|min:5"
                  >
                    <v-text-field
                      v-model="min"
                      :error-messages="errors"
                      color="secondary"
                    />
                  </validation-provider>
                </v-col>

                <v-col>
                  <code>minLength="5"</code>
                </v-col>
              </v-row>

              <v-row
                align="center"
                dense
              >
                <v-col
                  class="text-right body-1 grey--text"
                  cols="2"
                >
                  Max Length
                </v-col>

                <v-col cols="8">
                  <validation-provider
                    v-slot="{ errors }"
                    name="max length"
                    rules="required|max:5"
                  >
                    <v-text-field
                      v-model="max"
                      :error-messages="errors"
                      color="secondary"
                    />
                  </validation-provider>
                </v-col>

                <v-col>
                  <code>maxLength="5"</code>
                </v-col>
              </v-row>

              <div class="pa-3 text-center">
                <v-btn
                  color="success"
                  default
                  type="submit"
                >
                  Validate Inputs
                </v-btn>
              </div>
            </base-material-card>
          </form>
        </validation-observer>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardFormsValidationForms',

    $_veeValidate: {
      validator: 'new',
    },

    data: () => ({
      email: '',
      max: '',
      min: '',
      number: null,
      url: '',
      required: '',
      show: false,
      show2: false,
      show3: false,
    }),

    methods: {
      validateForm (scope) {
        alert('Form Submitted!')
      },
    },
  }
</script>

<template>
  <v-container
    id="regular-forms"
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
          class="px-5 py-3"
          color="success"
          icon="mdi-email"
          title="Stacked Form"
        >
          <v-form class="mt-5">
            <v-text-field label="Email Address"/>

            <v-text-field
              class="pt-0"
              label="Password"
              type="password"
            />

            <v-checkbox
              class="mt-0"
              label="Subscribe to newsletter"
            />
          </v-form>

          <v-card-actions class="pl-0">
            <v-btn
              color="success"
              min-width="100"
            >
              Submit
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <base-material-card
          class="px-5 py-3"
          color="success"
          icon="mdi-email-outline"
          title="Horizontal Form"
        >
          <v-form>
            <v-container fluid>
              <v-row
                align="center"
                class="text-no-wrap"
              >
                <v-col
                  class="text-right grey--text"
                  cols="3"
                >
                  Email
                </v-col>

                <v-col>
                  <v-text-field/>
                </v-col>
              </v-row>

              <v-row
                align="center"
                class="text-no-wrap"
              >
                <v-col
                  class="text-right grey--text"
                  cols="3"
                >
                  Password
                </v-col>

                <v-col>
                  <v-text-field
                    class="pt-0"
                    type="password"
                  />
                </v-col>
              </v-row>

              <v-row
                align="center"
                class="text-no-wrap"
                no-gutters
              >
                <v-col cols="3"/>

                <v-col>
                  <v-checkbox
                    class="mt-0"
                    label="Subscribe to newsletter"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-form>

          <v-card-actions>
            <v-btn
              class="pl-0"
              color="success"
              min-width="100"
            >
              Sign In
            </v-btn>
          </v-card-actions>
        </base-material-card>
      </v-col>

      <v-col cols="12">
        <base-material-card
          class="px-5 py-3"
          color="success"
          inline
          title="Form Elements"
        >
          <v-subheader class="display-1 mt-3">
            Text fields
          </v-subheader>

          <v-form class="pt-1">
            <v-text-field
              class="ml-4"
              label="With help"
              outlined
            />

            <v-text-field
              class="ml-4"
              label="Password"
              outlined
              type="password"
            />

            <v-subheader class="display-1 mt-3">
              Checkboxes
            </v-subheader>

            <v-row no-gutters>
              <v-col cols="2">
                <v-checkbox
                  class="mt-0 ml-4"
                  input-value="true"
                  label="On"
                  value
                />
              </v-col>

              <v-col cols="2">
                <v-checkbox
                  class="mt-0 ml-4"
                  label="Off"
                />
              </v-col>

              <v-col cols="4">
                <v-checkbox
                  class="mt-0 ml-4"
                  indeterminate
                  label="Indeterminate"
                  value
                />
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="2">
                <v-checkbox
                  class="mt-0 ml-4"
                  disabled
                  input-value="true"
                  label="On Disabled"
                />
              </v-col>

              <v-col cols="4">
                <v-checkbox
                  class="mt-0 ml-4"
                  disabled
                  label="Off Disabled"
                  value
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col
                cols="12"
                lg="3"
              >
                <v-subheader class="display-1 mt-3">
                  Radios
                </v-subheader>

                <v-radio-group
                  class="ml-4 mt-0"
                  column
                >
                  <v-radio
                    label="Column Option 1"
                    value="radio-1"
                  />

                  <v-radio
                    label="Column Option 2"
                    value="radio-2"
                  />
                </v-radio-group>
              </v-col>

              <v-col
                cols="12"
                lg="3"
              >
                <v-subheader class="display-1 mt-3">
                  Inline Radios
                </v-subheader>

                <v-radio-group
                  class="ml-4 mt-0"
                  row
                >
                  <v-radio
                    label="Row Option 1"
                    value="radio-1"
                  />

                  <v-radio
                    label="Row Option 2"
                    value="radio-2"
                  />
                </v-radio-group>
              </v-col>
            </v-row>

            <v-subheader class="display-1 mt-3">
              Switches
            </v-subheader>

            <v-row
              class="ml-4"
              no-gutters
            >
              <v-col cols="2">
                <v-switch
                  input-value="true"
                  label="On"
                  value
                />
              </v-col>

              <v-col cols="2">
                <v-switch label="Off"/>
              </v-col>

              <v-col cols="2">
                <v-switch
                  disabled
                  input-value="true"
                  label="On Disabled"
                  value
                />
              </v-col>

              <v-col cols="2">
                <v-switch
                  disabled
                  label="Disabled"
                />
              </v-col>

              <v-col cols="2">
                <v-switch
                  input-value="true"
                  label="Loading"
                  loading="primary"
                  value
                />
              </v-col>
            </v-row>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col cols="12">
        <base-material-card
          class="px-5 py-3"
          color="success"
          inline
          title="Input Variants"
        >
          <v-subheader class="display-1 mt-3">
            Selects
          </v-subheader>

          <v-row
            align="center"
            class="ml-1"
          >
            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                label="Standard"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                filled
                label="Filled style"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                label="Outlined style"
                outlined
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <v-select
                :items="items"
                label="Solo field"
                solo
              />
            </v-col>
          </v-row>

          <v-subheader class="display-1 mt-3">
            Sliders
          </v-subheader>

          <v-slider
            class="ml-4"
            color="secondary"
            prepend-icon="mdi-volume-plus"
            track-color="secondary lighten-3"
          />

          <v-slider
            append-icon="mdi-alarm"
            class="ml-4"
          />

          <v-slider
            v-model="zoom"
            append-icon="mdi-magnify-plus-outline"
            class="ml-4"
            prepend-icon="mdi-magnify-minus-outline"
            @click:append="zoomIn"
            @click:prepend="zoomOut"
          />

          <v-subheader class="display-1 mt-3">
            Textareas
          </v-subheader>

          <v-row class="ml-1">
            <v-col
              cols="12"
              md="6"
            >
              <v-textarea
                hint="Hint text"
                label="Default style"
                name="input-7-1"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-textarea
                label="Solo textarea"
                name="input-7-4"
                solo
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-textarea
                filled
                label="Filled textarea"
                name="input-7-4"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              />
            </v-col>
            <v-col
              cols="12"
              md="6"
            >
              <v-textarea
                label="Outlined textarea"
                name="input-7-4"
                outlined
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              />
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardFormsRegularForms',

    data: () => ({
      checkbox: true,
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      radioGroup: 1,
      switch1: true,
      zoom: 0,
    }),

    methods: {
      zoomOut () {
        this.zoom = (this.zoom - 10) || 0
      },
      zoomIn () {
        this.zoom = (this.zoom + 10) || 100
      },
    },
  }
</script>

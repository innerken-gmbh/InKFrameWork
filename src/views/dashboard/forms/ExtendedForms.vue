<template>
  <v-container
    id="extended-forms"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Date Pickers"
      link="components/date-pickers"
    />

    <v-row>
      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <base-material-card
          color="success"
          icon="mdi-calendar-today"
        >
          <template v-slot:after-heading>
            <div class="display-1 mt-2 font-weight-light">
              Date Picker <span class="body-1">— labeled</span>
            </div>
          </template>

          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            min-width="290px"
            offset-y
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                color="secondary"
                label="Select date"
                prepend-icon="mdi-calendar-outline"
                readonly
                v-on="on"
              />
            </template>

            <v-date-picker
              v-model="date"
              color="secondary"
              landscape
              scrollable
            >
              <v-spacer/>
              <v-btn
                color="secondary"
                large
                @click="menu = false"
              >
                Cancel
              </v-btn>

              <v-btn
                color="secondary"
                large
                @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <base-material-card
          color="success"
          icon="mdi-calendar-today"
        >
          <template v-slot:after-heading>
            <div class="display-1 mt-2 font-weight-light">
              Date Picker <span class="body-1">— date selected</span>
            </div>
          </template>

          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="date"
            min-width="290px"
            offset-y
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date2"
                color="secondary"
                label="Select date"
                prepend-icon="mdi-calendar-outline"
                readonly
                v-on="on"
              />
            </template>

            <v-date-picker
              v-model="date"
              color="secondary"
              landscape
              scrollable
            >
              <v-spacer/>
              <v-btn
                color="secondary"
                large
                @click="menu2 = false"
              >
                Cancel
              </v-btn>
            </v-date-picker>
          </v-menu>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
        sm="6"
      >
        <base-material-card
          color="success"
          icon="mdi-calendar-today"
        >
          <template v-slot:after-heading>
            <div class="display-1 mt-2 font-weight-light">
              Date Picker <span class="body-1">— close on select</span>
            </div>
          </template>

          <v-menu
            ref="menu2"
            v-model="menu3"
            :close-on-content-click="false"
            :return-value.sync="date"
            min-width="290px"
            offset-y
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date3"
                color="secondary"
                prepend-icon="mdi-calendar-outline"
                readonly
                v-on="on"
              />
            </template>

            <v-date-picker
              v-model="date3"
              color="secondary"
              landscape
              scrollable
              @input="menu3 = false"
            >
              <v-spacer/>

              <v-btn
                color="secondary"
                large
                @click="menu3 = false"
              >
                Cancel
              </v-btn>
            </v-date-picker>
          </v-menu>
        </base-material-card>
      </v-col>

      <v-col cols="12">
        <v-card class="pa-6">
          <v-row>
            <v-col
              cols="12"
              md="6"
            >
              <base-subheading>
                Switches
              </base-subheading>

              <v-switch
                hide-details
                input-value="true"
                label="Toggle is on"
              />

              <v-switch
                hide-details
                label="Toggle is off"
              />

              <div class="my-6"/>

              <base-subheading>
                Tags
              </base-subheading>

              <v-combobox
                v-model="items"
                color="secondary"
                multiple
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    :input-value="selected"
                    close
                    color="secondary"
                    small
                    v-bind="attrs"
                    @click="select"
                    @click:close="remove(item)"
                  >
                    {{ item }}
                  </v-chip>
                </template>
              </v-combobox>

              <div class="my-6"/>

              <base-subheading class="mb-6">
                Progress Bar
              </base-subheading>

              <v-progress-linear
                :value="30"
                color="secondary"
              />

              <div class="my-6"/>

              <v-progress-linear
                :value="60"
                color="info"
              />

              <div class="my-6"/>

              <v-progress-linear
                :value="40"
                buffer-value="0"
                color="warning"
                stream
              />

              <div class="my-6"/>

              <base-subheading class="mb-6">
                File Input
              </base-subheading>

              <v-file-input
                v-model="files"
                :display-size="1000"
                color="deep-purple accent-4"
                counter
                label="File input"
                multiple
                outlined
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip
                    v-if="index < 2"
                    color="deep-purple accent-4"
                    dark
                    label
                    small
                  >
                    {{ text }}
                  </v-chip>

                  <span
                    v-else-if="index === 2"
                    class="overline grey--text text--darken-3 mx-2"
                  >
                    +{{ files.length - 2 }} File(s)
                  </span>
                </template>
              </v-file-input>
            </v-col>

            <v-col
              cols="12"
              md="6"
            >
              <base-subheading>
                Customizable Select
              </base-subheading>

              <v-select
                :items="movies"
                color="secondary"
                item-color="secondary"
                label="Movie"
              >
                <template v-slot:item="{ attrs, item, on }">
                  <v-list-item
                    active-class="secondary elevation-4 white--text"
                    class="mx-3 mb-3 v-sheet"
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item"/>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>

              <v-select
                :items="movies"
                color="secondary"
                item-color="secondary"
                label="Movie"
                multiple
              >
                <template v-slot:item="{ attrs, item, on }">
                  <v-list-item
                    active-class="secondary elevation-4 white--text"
                    class="mx-3 mb-2 v-sheet"
                    elevation="0"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-list-item-content>
                      <v-list-item-title v-text="item"/>
                    </v-list-item-content>

                    <v-scale-transition>
                      <v-list-item-icon
                        v-if="attrs.inputValue"
                        class="my-3"
                      >
                        <v-icon>mdi-check</v-icon>
                      </v-list-item-icon>
                    </v-scale-transition>
                  </v-list-item>
                </template>
              </v-select>

              <div class="my-3"/>

              <base-subheading class="mb-6">
                Dropdown & Dropup
              </base-subheading>

              <v-row
                class="mb-6"
                dense
              >
                <v-col cols="auto">
                  <base-material-dropdown
                    :items="dropdown"
                    color="success"
                    default
                  >
                    MultiLevel Dropdown
                  </base-material-dropdown>
                </v-col>

                <v-col cols="auto">
                  <base-material-dropdown
                    :items="dropdown"
                    color="success"
                    origin="top right"
                  >
                    Dropdown
                  </base-material-dropdown>
                </v-col>

                <v-col cols="auto">
                  <base-material-dropdown
                    :items="dropdown"
                    color="success"
                    origin="bottom right"
                    top
                  >
                    Dropup
                  </base-material-dropdown>
                </v-col>
              </v-row>

              <base-subheading>
                Sliders
              </base-subheading>

              <v-slider
                v-model="slider"
                :max="max"
                :min="min"
                color="secondary"
              />

              <v-range-slider
                v-model="slider2"
                color="info"
                track-color="info lighten-4"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardFormsExtendedForms',

    data: () => ({
      date: '',
      date2: '2019-09-26',
      date3: '',
      dropdown: [
        {
          id: 1,
          text: 'Action',
        },
        {
          id: 2,
          text: 'Another Action',
        },
        {
          id: 3,
          text: 'A Third Action',
        },
      ],
      files: [],
      items: [
        'Amsterdam',
        'Washington',
        'Sydney',
        'Beijing',
      ],
      menu: false,
      menu2: false,
      menu3: false,
      min: -50,
      max: 90,
      slider: 40,
      slider2: [30, 70],
      range: [-20, 70],
      movies: [
        'Fight Club',
        'Godfather',
        'Godfather II',
        'Godfather III',
        'Goodfellas',
        'Pulp Fiction',
        'Scarface',
      ],
    }),
  }
</script>

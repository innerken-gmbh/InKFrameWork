<template>
  <v-container
    id="grid"
    fluid
    tag="section"
  >
    <base-v-component
      heading="Grid System"
      link="components/grid"
    />

    <v-row class="text-center">
      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="XS Grid"
        text="Always Horizontal"
      />

      <v-col
        v-for="n in 3"
        :key="`cols-${n}`"
        class="pt-0"
        cols="4"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-4
          </v-card-text>
        </v-card>
      </v-col>

      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="SM Grid"
        text="Collapsed at 600px"
      />

      <v-col
        v-for="n in 3"
        :key="`sm-${n}`"
        class="pt-0"
        cols="12"
        sm="4"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-sm-4
          </v-card-text>
        </v-card>
      </v-col>

      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="MD Grid"
        text="Collapsed at 960px"
      />

      <v-col
        v-for="n in 3"
        :key="`md-${n}`"
        class="pt-0"
        cols="12"
        md="4"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-md-4
          </v-card-text>
        </v-card>
      </v-col>

      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="LG Grid"
        text="Collapsed at 1280px"
      />

      <v-col
        v-for="n in 3"
        :key="`lg-${n}`"
        class="pt-0"
        cols="12"
        lg="4"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-lg-4
          </v-card-text>
        </v-card>
      </v-col>

      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="XL Grid"
        text="Collapsed at 1920px"
      />

      <v-col
        v-for="n in 3"
        :key="`xl-${n}`"
        class="pt-0"
        cols="12"
        xl="4"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-xl-4
          </v-card-text>
        </v-card>
      </v-col>

      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="Mixed Grid"
        text="Showing different sizes on different screens"
      />

      <v-col
        v-for="n in 4 "
        :key="`mixed-${n}`"
        class="pt-0"
        lg="3"
        sm="6"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-xl-4
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <base-subheading
        class="pb-0 pl-3 mt-5"
        subheading="Offset Grid"
        text="Adding some space when neede"
      />

      <v-col
        class="pt-0"
        md="3"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-md-3
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        class="ml-auto"
        md="3"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-md-4 ml-auto mr-auto
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col
        v-for="n in 2"
        :key="`offset-${n}`"
        class="ml-auto mr-auto"
        md="4"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-md-4 ml-auto mr-auto
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="text-center mb-12">
      <v-col
        class="ml-auto mr-auto"
        md="6"
      >
        <v-card class="mt-0">
          <v-card-text class="red--text text--darken-4">
            col-md-6 ml-auto mr-auto
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <paragraph-heading class="text-center pb-0">
        <h4 class="font-weight-light">
          Paragraphs
        </h4>
      </paragraph-heading>

      <v-col cols="12 pt-0">
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col
                cols="12"
                md="6"
              >
                <paragraph-heading>Some Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the
                  size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="6"
              >
                <paragraph-heading>Another Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the
                  size of the rest of him, waved about helplessly as he looked. "What's happened to me?" he thought.
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <paragraph-heading>Some Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment.
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <paragraph-heading>Another Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment.
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <paragraph-heading>Another Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment.
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="4"
              >
                <paragraph-heading>Some Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment.
                </v-card-text>
              </v-col>

              <v-col
                cols="12"
                md="8"
              >
                <paragraph-heading>Another Title Here</paragraph-heading>

                <v-card-text class="font-weight-light">
                  One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into
                  a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his
                  brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to
                  cover it and seemed ready to slide off any moment. One morning, when Gregor Samsa woke from troubled
                  dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like
                  back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by
                  arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any
                  moment.
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardGrid',

    components: {
      ParagraphHeading: {
        render (h) {
          return h('div', {
            class: 'headline font-weight-light col cols-12',
          }, this.$slots.default)
        },
      },
    },
  }
</script>

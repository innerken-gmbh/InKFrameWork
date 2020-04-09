<template>
  <section class="mb-12 text-center">
    <h1
      class="font-weight-light mb-2 headline"
      v-text="`${heading}`"
    />

    <span
      class="font-weight-light subtitle-1"
    >
      Please checkout the
      <a
        :href="`https://vuetifyjs.com/${link}`"
        class="secondary--text"
        rel="noopener"
        style="text-decoration:none;"
        target="_blank"
      >
        full documentation
      </a>
    </span>
  </section>
</template>

<script>
  export default {
    name: 'VComponent',

    props: {
      heading: {
        type: String,
        default: '',
      },
      link: {
        type: String,
        default: '',
      },
    },
  }
</script>

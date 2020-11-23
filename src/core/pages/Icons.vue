<template>
  <div>
    <!-- <pre>      {{ iconos }}</pre> -->
    <q-list bordered>
      <q-item clickable v-ripple v-for="(icon, index) in iconos" :key="index">
        <q-item-section avatar>
          <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="icon.path" fill="#5851D8" />
          </svg>
        </q-item-section>
        <q-item-section>{{ icon.name }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import * as icons from 'src/statics/iconsJSON'
export default {
  name: 'Icons',
  data() {
    return {
      iconos: icons.default
    }
  },
  created() {
    console.log('asd')
    console.log(icons)
  }
}
</script>

<style></style>

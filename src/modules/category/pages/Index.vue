<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <router-view></router-view>
  </transition>
</template>

<script>
// import HeaderPageComponent from 'core/components/HeaderPageComponent'
export default {
  components: {}
}
</script>

<style></style>

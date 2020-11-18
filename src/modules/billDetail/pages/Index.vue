<template>
  <div>
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import CategoryList from '../components/CategoryList';
export default {
  components: {}
}
</script>

<style></style>

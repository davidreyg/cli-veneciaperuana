<template>
  <div class="row items-center q-gutter-y-sm">
    <div class="col-md-6 col-xs-12 col-sm-6 column">
      <div class="col">
        <slot name="pageTitle"> Titulo de la pagina</slot>
      </div>
      <div class="col"><slot name="pageSubTitle">by John Doe</slot></div>
    </div>
    <div class="col-md-6 col-xs-12">
      <slot name="pageOptions">
        Opciones
      </slot>
    </div>
    <div class="col-12">
      <slot>asdas</slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>

<template>
  <div
    class="app"
    id="app"
  >
    <table-component />
    <brand-notification />
  </div>
</template>
<script>
  import TableComponent from "./components/TableComponent.vue";

  export default {
    name: 'App',
    components: {
      TableComponent
    }
  }
</script>
<style lang="scss">
  .app {
    $self: &;

    max-width: 1366px;
    padding: 0 15px;
    margin: auto;
    display: flex;
    min-height: 100vh;
  }
</style>

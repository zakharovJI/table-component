export default {
  name: 'App',
  components: {
  },
  mounted() {
    this.$store.dispatch('getProductList');
  }
}
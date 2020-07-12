export default {
  name: 'BrandNotification',
  computed: {
    stack() {
      return this.$store.getters.getBrandNotificationStack;
    },
  },
}
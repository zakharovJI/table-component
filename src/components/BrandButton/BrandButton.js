import Preloader from "../Preloader/Preloader.vue";

export default {
  name: 'BrandButton',
  components: {
    Preloader
  },
  props: {
    text: {
      type: String,
      required: true
    },
    secondary: {
      type: Boolean,
      required: false,
      default: false
    },
    disable: {
      type: Boolean,
      required: false,
      default: false
    },
    squared: {
      type: Boolean,
      required: false,
      default: false
    },
    withoutBorder: {
      type: Boolean,
      required: false,
      default: false
    },
    recursive: {
      type: Boolean,
      required: false,
      default: false
    },
    delete: {
      type: Boolean,
      required: false,
      default: false
    },
    deleteObject: {
      required: false
    }
  },
  data() {
    return {
      showDeletePopup: false,
      preloaderStateShow: false
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);

      if (this.delete) {
        this.showDeletePopup = true;
      }
    },
    cancelDelete() {
      this.showDeletePopup = false;
    },
    confirmDelete() {
      this.preloaderStateShow = true;

      this.$store.dispatch('table/deleteProduct', this.deleteObject)
        .then(() => {
          console.log('suc')
          this.showDeletePopup = false;

          if (this.deleteObject.length) {
            this.$store.commit("table/removeAllFromSelectedRows");
          }
        })
        .catch(() => {
          this.$store.commit('addToBrandNotificationStack', {
            text: 'На сервере произошла ошибка, <br> повторите запрос позднее.',
            type: 'error'
          });
        })
        .finally(() => {
          this.preloaderStateShow = false;
        })
    }
  }
}
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'BrandDropdown',
  mixins: [ clickaway ],
  props: {
    label: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      selfLabel: this.label,
      isDropdownActive: false,
    }
  },
  computed: {

  },
  methods: {
    hideDropdown() {
      this.isDropdownActive = false;
    },
    toggleDropdown() {
      this.isDropdownActive = !this.isDropdownActive;
    }
  }
}
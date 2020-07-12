import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'BrandDropdown',
  mixins: [ clickaway ],
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {}
  },
  data() {
    return {
      isDropdownActive: false,
    }
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
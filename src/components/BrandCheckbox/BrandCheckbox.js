export default {
  name: 'BrandCheckbox',
  props: {
    checked: {
      type: Boolean,
      required: false,
      default: false
    },
    object: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selfValue: this.object.value,
      stateChecked: this.checked,
    }
  },
  methods: {
    onClick(e) {
      this.$emit('click', {
        value: this.stateChecked,
        name: this.object.value
      });
    },
  }
}
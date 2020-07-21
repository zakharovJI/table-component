<template>
  <div class="brand-checkbox">
  <label
    class="brand-checkbox__control"
    ref="control" >
    <input
      v-model="stateChecked"
      @click="onClick"
      type="checkbox"
      hidden
      ref="input" />
    <span
      class="brand-checkbox__view"
      ref="view" />
    <span
      class="brand-checkbox__text"
      v-if="object.name"> {{ object.name }}
    </span>
  </label>
  </div>
</template>
<script>
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
</script>
<style lang="scss">
  .brand-checkbox {
    $self: &;

    display: inline-block;
    color: lightgray;

    &__text {
      color: $primary-text-color;
    }

    &__control {
      display: flex;
      cursor: pointer;
      align-items: center;

      input {
        &:checked + #{$self}__view {
          background-color: $primary-button-bg;
          border-color: $primary-button-bg;

          &:after, &:before {
            border-color: $light;
          }
        }
      }

      #{$self}__view {
        position: relative;
        display: inline-block;
        min-width: 14px;
        flex-basis: 14px;
        height: 14px;
        cursor: pointer;
        border-radius: 1px;
        border: 1px solid $disable-color;
        background-color: $light;

        &:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          display: block;
          transition: all .1s linear;
          background: url("../assets/images/check.svg") no-repeat 50% 50%;
        }
      }

      #{$self}__text {
        margin-left: 13px;
        cursor: pointer;

      }
    }

    &_part {
      #{$self}__control {
        input:not(:checked) + #{$self}__view {
          background-color: $primary-button-bg;
          border-color: $primary-button-bg;

          &:after {
            content: none;
          }

          &:before {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            content: '';
            display: block;
            height: 1px;
            width: 10px;
            background-color: $light;
          }
        }
      }
    }

  }

</style>
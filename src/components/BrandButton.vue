<template>
  <button
    class='brand-button'
    :class="{'brand-button_secondary' : secondary,
    'brand-button_squared' : squared,
    'brand-button_no-border' : withoutBorder,
    'brand-button_delete-active' : showDeletePopup,
    'brand-button_disable' : disable}"
    @click="onClick"
  >
    <slot name="prepend" />
    <span class="brand-button__text"> {{ text }}
      <slot name="append" />
    </span>
    <span
      class="brand-button__delete-popup"
      v-if="recursive"
      @click.prevent.stop=""
    >
      <span class="brand-button__text">
        Are you sure you want to <strong>delete item</strong>?
      </span>
      <span class="brand-button__controls">
       <brand-button
          :secondary="true"
          text="Cancel"
          @click.stop="cancelDelete"
        ></brand-button>
        <brand-button
          text="Confirm"
          @click.stop="confirmDelete"
        ></brand-button>
      </span>
      <preloader v-if="preloaderStateShow" />
    </span>
  </button>
</template>
<script>
  import Preloader from "./Preloader.vue";

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
              this.$store.commit("table/DELETE_ALL_FROM_SELECTED_ROWS");
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
</script>
<style lang="scss">
  .brand-button {
    $self: &;

    min-height: 32px;
    background-color: $primary-button-bg;
    border: 1px solid $primary-button-bg;
    border-radius: 2px;
    padding: 0 16px;
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background-color $base-interval linear, border-color $base-interval linear;

    &:hover {
      background-color: darken($primary-button-bg, 5%);
      border-color: darken($primary-button-bg, 5%);
    }

    &:active {
      background-color: darken($primary-button-bg, 10%);
      border-color: darken($primary-button-bg, 10%);
    }

    &:focus {
      border-color: darken($primary-button-bg, 10%);
    }

    &__text {
      color: $light;
      display: flex;
    }

    &__append {
      margin-left: 5px;
    }

    &__icon {
      width: 8px;
      height: 5px;

      &_left {
        transform: rotate(90deg);
      }

      &_right {
        transform: rotate(-90deg);
      }

      &_prepend {
        width: 13px;
        height: 16px;
        margin-right: 5px;
      }
    }

    &__delete-popup {
      display: none;
      position: absolute;
      padding: 0 16px 16px;
      flex-direction: column;
      align-items: center;
      min-width: 254px;
      border-radius: 4px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
      background-color: $light;
      z-index: 10;
      top: 100%;
      transform: translateX(-50%);
      cursor: default;

      & > #{$self}__text {
        padding-top: 16px;
        color: $primary-text-color;
      }

      & #{$self}__controls {
        display: flex;
        padding-top: 8px;

        .brand-button {
          &:first-child {
            margin-right: 16px;
          }
        }
      }
    }

    &_secondary {
      background-color: $light;
      border: 1px solid $primary-border-color;

      &:hover {
        background-color: darken($light, 5%);
        border: 1px solid $primary-border-color;
      }

      &:active {
        background-color: darken($light, 10%);
        border: 1px solid $primary-border-color;
      }

      &:focus {
        border-color: darken($primary-border-color, 10%);
      }

      & #{$self}__text {
        color: $additional-text-color;
      }
    }

    &_disable {
      border-color: $disable-color;
      background-color: transparent;
      cursor: default;

      &:hover, &:active, &:focus {
        border-color: $disable-color;
        background-color: transparent;
      }

      & #{$self}__text {
        color: $disable-color;
      }

      & #{$self}__icon {
        color: $disable-color;
      }
    }

    &_squared {
      padding: 0 11px;
    }

    &_no-border {
      border: none;
      color: $comet;
      background: transparent;

      &:hover, &:active, &:focus {
        border: none;
        background: transparent;
      }
    }

    &_delete-active {
      & #{$self}__delete-popup {
        display: flex;
      }
    }

    .brand-button {

      &:not(#{$self}_secondary) {

        & #{$self}__text {
          color: $light;
        }
      }
    }
  }
</style>
<template>
  <div class="brand-notification">
    <div class="brand-notification__item"
       v-for="(item, index) in stack"
       :key="'BrandNotification-item-' + index"
       :class="{'brand-notification__item_error' : item.type === 'error'}" >
      <span
        class="brand-notification__text"
        v-html="item.text" />
    </div>
  </div>
</template>
<script>
  import { mapState } from "vuex"

  export default {
    name: 'BrandNotification',
    computed: {
      ...mapState({
        stack: 'brandNotificationStack'
      }),
    },
  }
</script>
<style lang="scss">
  .brand-notification {
    $self: &;

    position: fixed;
    left: 10px;
    bottom: 0;
    display: flex;
    flex-direction: column;

    & #{$self}__item {
      position: relative;
      left: 0;
      bottom: -100px;
      background-color: $primary-button-bg;
      z-index: 10000000000000;
      border: 1px solid $primary-border-color;
      border-radius: 5px;
      padding: 10px 13px;
      animation: animate-item .15s ease-out;
      animation-fill-mode: forwards;
      margin-bottom: 2px;

      &_error {
        background-color: $error;
      }
    }

    & #{$self}__text {
      color: white;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
      line-height: 1.45;
    }
  }

  @keyframes animate-item {
    1% {
      display: block;
      bottom: -100px;
    }
    100% {
      bottom: 15px;
    }
  }
</style>
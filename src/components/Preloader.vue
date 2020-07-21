<template>
  <div class="preloader">
    <div class="preloader__wrapper">
      <div class="preloader__spinner"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Preloader',
  }
</script>
<style lang="scss">
  .preloader {
    $self: &;

    z-index: 10000000;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: $alpha-gray;
    display: flex;
    align-items: center;
    justify-content: center;

    &__wrapper {

      & #{$self}__spinner {
        height: 48px;
        width: 48px;
        color: lighten($primary-button-bg, 40%);
        position: relative;
        display: inline-block;
        border: 5px solid;
        border-radius: 50%;
        border-right-color: $primary-button-bg;
        animation: rotate 1s linear infinite;
        top: 50%;

        @keyframes rotate {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
    }

    &_big {
      background-color: $light-gray;
    }
  }
</style>
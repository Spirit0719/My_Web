<template>
  <transition name="ice-toast-pop">
    <div v-show="visible" :class="['ice-toast',customClass]" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <i class="ice-toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="ice-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>

<style lang="stylus">
  .ice-toast {
    position: fixed;
    max-width: 80%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 1000;
    transition: opacity .3s linear;
    left: 50%;
    transform: translate(-50%,0);
    bottom: 150px;
  }
  .ice-toast-icon {
    display: block;
    text-align: center;
    font-size: 56px;
  }
  .ice-toast-text {
    font-size: 30px;
    display: block;
    text-align: center;
  }
  .ice-toast-pop-enter,.ice-toast-pop-leave-active{
    opacity: 0;
  }
</style>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        visible: false
      };
    },
    computed: {
      customClass() {
        let classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);
        return classes.join(' ');
      }
    }
  };
</script>

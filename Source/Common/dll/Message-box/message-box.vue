<template>
  <div class="ice-msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="ice-msgbox" v-show="value">
        <div class="ice-msgbox-header" v-if="title !== ''">
          <div class="ice-msgbox-title">{{ title }}</div>
        </div>
        <div :class="['ice-msgbox-content',title !== ''?'':'ice-msgbox-NoTitle-content']" v-if="message !== ''">
          <div class="ice-msgbox-message" v-html="message"></div>
          <div class="ice-msgbox-input" v-show="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div class="ice-msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">
              {{ editorErrorMessage }}
            </div>
          </div>
        </div>
        <div class="ice-msgbox-btns">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">
            {{ cancelButtonText }}
          </button>
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus">
  .ice-msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 85%;
    border-radius: 6px;
    font-size: 30px;
    -webkit-user-select: none;
    overflow: hidden;
    backface-visibility: hidden;
    transition: .2s;
  }

  .ice-msgbox-header {
    padding: 15px 0 0;
  }
  .ice-msgbox-content {
    padding: 10px 20px 15px;
    border-bottom: 1px solid #ddd;
    min-height: 70px;
    position: relative;
    display flex
    align-items center
    justify-content center
  }

  .ice-msgbox-NoTitle-content {
    min-height: 150px;
  }

  .ice-msgbox-input {
    padding-top: 15px;
    & input {
      border: 1px solid #dedede;
      border-radius: 5px;
      padding: 4px 5px;
      width: 100%;
      appearance: none;
      outline: none;
    }
    & input.invalid {
      border-color: #ff4949;
      &:focus {
        border-color: #ff4949;
      }
    }
  }

  .ice-msgbox-errormsg {
    color: red;
    font-size: 12px;
    min-height: 18px;
    margin-top: 2px;
  }

  .ice-msgbox-title {
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 30px;
    font-weight: bold;
    color: #333;
  }

  .ice-msgbox-message {
    color: #999;
    margin: 0;
    text-align: center;
    line-height: 36px;
  }

  .ice-msgbox-btns {
    display: flex;
    height: 80px;
  }

  .ice-msgbox-btn {

    line-height: 35px;
    display: block;
    background-color: #fff;
    flex: 1;
    margin: 0;
    border: 0;
    &:focus {
      outline: none;
    }
    &:active {
      background-color: #fff;
    }
  }

  .ice-msgbox-cancel {

    width: 50%;
    border-right: 1px solid #ddd;
    &:active {
      color: #000;
    }
  }

  .ice-msgbox-confirm {

    color: #26a2ff;
    width: 50%;
    &:active {
      color: #26a2ff;
    }
  }

  .msgbox-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }

  .msgbox-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
  .v-modal-enter {
    animation: v-modal-in .2s ease;
  }

  .v-modal-leave {
    animation: v-modal-out .2s ease forwards;
  }

  @keyframes v-modal-in {
    0% {
      opacity: 0;
    }
    100% {
    }
  }

  @keyframes v-modal-out {
    0% {
    }
    100% {
      opacity: 0;
    }
  }

  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
</style>

<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';
  import Popup from './utils/popup/index';

  export default {
    mixins: [Popup],
    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },
    computed: {
      confirmButtonClasses() {
        let classes = 'ice-msgbox-btn ice-msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' ice-msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'ice-msgbox-btn ice-msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' ice-msgbox-cancel-highlight';
        }
        return classes;
      }
    },
    methods: {
      doClose() {
        this.value = false;
        this._closing = true;
        this.onClose && this.onClose();
        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;
        if (!this.transition) {
          this.doAfterClose();
        }
      },
      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },
      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              this.$refs.input.classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        this.$refs.input.classList.remove('invalid');
        return true;
      },
      handleInputType(val) {
        if (val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },
    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },
      value(val) {
        this.handleInputType(this.inputType);
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus();
            }
          }, 500);
        }
      },
      inputType(val) {
        this.handleInputType(val);
      }
    },
    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      };
    }
  };
</script>

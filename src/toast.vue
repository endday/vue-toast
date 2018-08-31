<template>
    <div class="vue-toast_container">
        <div class="vue-toast_inner"
             @mouseover="stopTimer"
             @mouseleave="startTimer"
             @click.prevent="startTimer"
             :class="[type]">
            <div class="vue-toast_message">
                <span v-html="message"></span>
                <span class="vue-toast_close-btn"
                      v-if="options.closable"
                      @click="remove">
        </span>
            </div>
        </div>
    </div>
</template>

<script>
const defaultOptions = {
  type: 'default', // info warning error success
  duration: 5000,
  closable: false
}
export default {
  props: {
    message: {
      required: true
    },
    options: {
      type: Object
    },
    id: {
      type: [String, Number]
    }
  },
  computed: {
    type() {
      return this.options.type
    },
    fullOptions() {
      return Object.assign({}, defaultOptions, this.options)
    }
  },
  mounted() {
    if (this.fullOptions.duration !== 0) {
      this.startLazyAutoDestroy()
    }
  },
  methods: {
    // Public
    remove() {
      this.clearTimer()
      this.handleDestroy()
    },
    // Private
    startLazyAutoDestroy() {
      this.clearTimer()
      this.timerDestroy = setTimeout(() => {
        this.remove()
      }, this.fullOptions.duration)
    },
    clearTimer() {
      if (this.timerDestroy) {
        clearTimeout(this.timerDestroy)
      }
    },
    startTimer() {
      if (this.fullOptions.duration !== 0) {
        this.startLazyAutoDestroy()
      }
    },
    stopTimer() {
      if (this.fullOptions.duration !== 0) {
        this.clearTimer()
      }
    },
    handleDestroy() {
      this.$emit('destroy', this.id)
    }
  }
}
</script>

<style>
    .vue-toast_inner {
        border-radius: 2px;
        min-height: 38px;
        line-height: 1.1em;
        padding: 0 20px;
        font-size: 15px;
        font-weight: 300;
        color: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .12), 0 1px 2px rgba(0, 0, 0, .24);
    }

    .vue-toast_inner.default {
        background-color: rgba(0, 0, 0, .9);
    }

    .vue-toast_inner.info {
        background-color: rgba(49, 112, 143, .9);
    }

    .vue-toast_inner.success {
        background-color: rgba(60, 118, 61, .9);
    }

    .vue-toast_inner.warning {
        background-color: rgba(138, 109, 59, .9);
    }

    .vue-toast_inner.error {
        background-color: rgba(169, 68, 66, .9);
    }

    .vue-toast_container + .vue-toast_container {
        margin-top: 10px;
    }

    .vue-toast_message {
        font-size: 16px;
        padding: 10px 20px;
        color: white;
        font-family: arial, sans-serif;
        white-space: nowrap
    }

    .vue-toast_close-btn {
        cursor: pointer;
        position: absolute;
        right: 5px;
        top: 5px;
        width: 14px;
        height: 14px;
        opacity: .7;
        transition: opacity .15s ease-in-out;
        backface-visibility: hidden;
    }

    .vue-toast_close-btn:hover {
        opacity: .9;
    }

    .vue-toast_close-btn::before,
    .vue-toast_close-btn::after {
        content: '';
        position: absolute;
        top: 6px;
        width: 14px;
        height: 2px;
        background-color: white;
    }

    .vue-toast_close-btn::before {
        transform: rotate(45deg);
    }

    .vue-toast_close-btn::after {
        transform: rotate(-45deg);
    }
</style>

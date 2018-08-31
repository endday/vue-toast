<template>
  <transition-group
    class="vue-toast-manager_container"
    :class="classesOfPosition"
    :style="styleOfPosition"
    tag="div"
    name="vue-toast">
    <toast
      class="vue-toast_container"
      v-for="(toast, index) in toasts"
      :key="toast.id"
      :id="toast.id"
      :message="toast.message"
      :options="toast.options"
      @destroy="handleDestroy">
    </toast>
  </transition-group>
</template>

<script>
  import toast from './toast.vue'

  export default {
    components: {toast},
    data() {
      return {
        id: 1,
        toasts: [],
        options: {
          maxToasts: 3,
          position: 'bottom-middle',
        },
        styleOfPosition: {},
        positionArr: [
          'bottom-middle',
          'bottom-left',
          'bottom-right',
          'top-middle',
          'top-left',
          'top-right'
        ]
      }
    },
    computed: {
      classesOfPosition() {
        if (!this.positionArr.includes(this.options.position)) {
          return this.positionArr[0]
        }
        return this.options.position
      },
      directionOfJumping() {
        return this.options.position.match(/top/i) ? '+' : '-'
      }
    },
    methods: {
      // Public
      showToast(message, options) {
        this.setOptions(options).createToast(message, this.options)
        return this
      },
      setOptions(options = {}) {
        this.options = Object.assign({}, this.options, options)
        return this
      },
      closeAll() {
        this.toasts = []
      },
      // Private
      createToast(message, options = {}) {
        this.styleOfPosition = {}
        if (!message) {
          return
        }
        options.directionOfJumping = this.directionOfJumping
        const id = this.id++
        const toast = {
          id,
          message,
          options
        }
        this.toasts.unshift(toast)
        const maxToasts = parseInt(this.options.maxToasts) || 9999
        if (this.toasts.length > maxToasts) {
          this.handleDestroy()
        }
      },
      handleDestroy(id) {
        this.getChildrenSize(this.toasts)
        if (!id) {
          this.toasts.pop()
        } else {
          const i = this.toasts.findIndex(item => item.id === id)
          if (i > -1) {
            this.toasts.splice(i, 1)
          }
        }
      },
      // 列表动画的最后一个item移除会导致父组件失去宽度，导致动画会偏移
      getChildrenSize(val) {
        if (val.length === 1) {
          this.styleOfPosition = {
            width: `${this.$el.children[0].clientWidth}px`,
            height: `${this.$el.children[0].clientHeight}px`
          }
        } else {
          this.styleOfPosition = {}
        }
      }
    }
  }
</script>

<style>
  .vue-toast-manager_container {
    position: fixed;
    z-index: 999999999;
  }

  .vue-toast-manager_container.top-middle {
    top: 10px;
    transform: translateX(-50%);
    left: 50%;
  }

  .vue-toast-manager_container.bottom-middle {
    bottom: 10%;
    transform: translateX(-50%);
    left: 50%;
  }

  .vue-toast-manager_container.top-left {
    top: 10px;
    left: 10px;
  }

  .vue-toast-manager_container.top-right {
    top: 10px;
    right: 10px;
  }

  .vue-toast-manager_container.bottom-left {
    bottom: 10%;
    left: 10px;
  }

  .vue-toast-manager_container.bottom-right {
    bottom: 10%;
    right: 10px;
  }

  .vue-toast-enter {
    transform: translateY(100%);
  }

  .vue-toast-enter, .vue-toast-leave-to {
    opacity: 0;
  }

  .vue-toast-leave-active {
    position: absolute;
  }

  .vue-toast_container {
    transition: all .5s;
  }
</style>

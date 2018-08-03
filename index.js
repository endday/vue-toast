import Vue from 'vue'
import temp from './src/index.vue'

let instance
let component
const types = ['default', 'info', 'success', 'warning', 'error']

const init = () => {
  if (!instance) {
    instance = new Vue({
      render (h) {
        return h(temp)
      },
      methods: {
        init () {
          document.body.appendChild(this.$el)
        },
        destroy () {
          this.$destroy()
          document.body.removeChild(this.$el)
        }
      }
    })
    instance.$mount()
    instance.init()
    component = instance.$children[0]
  }
}

const toast = function (message, options) {
  init()
  return component.showToast(message, options)
}

types.forEach(type => {
  toast[type] = (message, options) => {
    if (options) {
      options.type = type
    } else {
      options = { type }
    }
    return toast(message, options)
  }
})

export default toast

import container from './container.vue'

let vm
const types = ['default', 'info', 'success', 'warning', 'error']

const init = (Vue) => {
  const Constructor = Vue.extend(container)
  const toast = new Constructor
  if (!toast.$el) {
    vm = toast.$mount()
    document.body.appendChild(vm.$el)
  }
}

const toast = {
  install(Vue, options) {
    init(Vue)
    Vue.prototype.$toast = vm.showToast
    types.forEach(type => {
      Vue.prototype.$toast[type] = (message, options) => {
        if (options) {
          options.type = type
        } else {
          options = { type }
        }
        return vm.showToast(message, options)
      }
    })
  }
}

function domReady(fn) {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
    fn()
  } else {
    document.addEventListener('DOMContentLoaded', fn)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  domReady(() => {
    window.Vue.use(toast)
  })
}

export default toast

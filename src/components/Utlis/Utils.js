import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export default {
  name: 'Utils',
  ValidateRules: {
    Email: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    NotEmpty: [v => !!v || 'This Field is required'],
  },
  showConfirm: function (title = 'Are you sure?', content = 'You won\'t be able to revert this!', callback, failCallback) {
    Swal.fire({
      title: title,
      text: content,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.value) {
        callback()
      } else {
        failCallback()
      }
    })
  },
  toast: function (title = 'Successful!', type = 'success') {
    Toast.fire({
      icon: type,
      title: title,
    })
  },
  showError: function (content = ' Something went wrong!', title = 'Oops...') {
    Swal.fire({
      icon: 'error',
      title: title,
      text: content,
      footer: '<a href="https://innerken.com">联系技术人员</a>',
    })
  },
  showLoading: function (canCancel = false) {
    Swal.fire({
      title: '正在加载',
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: false,
    })
    Swal.showLoading()
  },
  hideLoading: function () {
    Swal.hideLoading()
    Swal.close()
  },
  deepCopy: function (target) {
    const copiedObjs = []// 此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
    function _deepCopy (target) {
      if ((typeof target !== 'object') || !target) {
        return target
      }
      for (let i = 0; i < copiedObjs.length; i++) {
        if (copiedObjs[i].target === target) {
          return copiedObjs[i].copyTarget
        }
      }
      let obj = {}
      if (Array.isArray(target)) {
        obj = []// 处理target是数组的情况
      }
      copiedObjs.push({
        target: target,
        copyTarget: obj,
      })
      Object.keys(target).forEach(key => {
        if (obj[key]) {
          return
        }
        obj[key] = _deepCopy(target[key])
      })
      return obj
    }

    return _deepCopy(target)
  },
  // 获取cookie、
  getCookie (name) {
    let arr
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (arr === document.cookie.match(reg)) {
      return (arr[2])
    } else {
      return null
    }
  },

// 设置cookie,增加到vue实例方便全局调用
  setCookie (cName, value, expiredays) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  },

// 删除cookie
  delCookie (name) {
    const exp = new Date()
    exp.setTime(exp.getTime() - 1)
    const cval = this.getCookie(name)
    if (cval != null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  },

}

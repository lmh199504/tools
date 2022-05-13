import { Message } from 'element-ui'
import _ from 'lodash'

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * Created by jiachenpan on 16/11/18.
 * 注意：自定义校验方法必须要有callback()调用，不然form.validate()会一直处于等待状态
 */

export function isvalidUsername(str) {
  // const valid_map = ['admin', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}

// 特殊字符验证
export function validateInput(rule, value, callback) {
  if (!value) callback()
  const checkSpecificKey = function(str) {
    if (!str) return callback()
    var specialKey = "[`~!#@$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）☆★§№——|{}【】‘；：”“'。，、？]‘'"
    for (var i = 0; i < str.length; i++) {
      if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
        return false
      }
    }
    return true
  }
  if (!checkSpecificKey(value)) {
    callback(new Error('不允许输入特殊字符'))
  } else {
    callback()
  }
}
// 电话号码验证
export function validatePhone(rule, value, callback) {
  if (!value) callback()
  
  let mobilereg, phonereg
  if (rule.isChinaRule) {
    mobilereg = /^[1][3,4,5,7,8,9][0-9]{9}$/ // 手机-中国
    phonereg = /^0\d{2,3}-?\d+$/ // 固话-中国
  } else {
    mobilereg = /^[1-9][0-9]+$/ // 手机-不限国家
    phonereg = /^\d+-?\d+$/ // 固话-不限国家
  }
  rule.phonetype = rule.phonetype || 'mobile'
  if (rule.phonetype === 'mobile') {
    if (value && !mobilereg.test(value)) callback(new Error('电话号码格式有误'))
    else callback()
  }

  if (rule.phonetype === 'phone') {
    if (value && !phonereg.test(value)) callback(new Error('电话号码格式有误'))
    else callback()
  }

  if (rule.phonetype === 'all') {
    if (value && !phonereg.test(value) && !mobilereg.test(value)) callback(new Error('电话号码格式有误'))
    else callback()
  }
}

// 身份证号码验证
export function validateIdno(rule, value, callback) {
  if (!value) callback()
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  if (!value) return callback('请输入身份证')
  if (!reg.test(value)) {
    callback(new Error('身份证号码格式有误'))
  } else {
    callback()
  }
}

// 邮箱验证
export function validateEmail(rule, value, callback) {
  if (!value) callback()
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (!value) return callback()
  if (!reg.test(value)) {
    callback(new Error('邮箱格式有误'))
  } else {
    callback()
  }
}

// 只允许输入数字或字母
export function validateIntOrLet(rule, value, callback) {
  if (!value) callback()
  const reg = /^[0-9a-zA-Z]+$/
  if (!reg.test(value)) {
    callback(new Error('只允许输入数字或字母'))
  } else {
    callback()
  }
}

// 只允许输入中文
export function validateChinese(rule, value, callback) {
  if (!value) callback()
  const reg = /^[\u4e00-\u9fa5]+$/
  if (!reg.test(value)) {
    callback(new Error('只允许输入中文'))
  } else {
    callback()
  }
}

// 只允许许输入字母和文字
export function validateIntCharacters(rule, value, callback) {
  if (!value) callback()
  var reg = /^[a-zA-Z\u4e00-\u9fa5]+$/
  if (!reg.test(value)) {
    callback(new Error('只允许输入文字或字母'))
  } else {
    callback()
  }
}
// 只允许输入正整数
export function validateIntNumber(rule, value, callback) {
  /* 说明
    zeroAbel: false: 不允许为0, true: 允许为0 ------- 默认为不允许为0
  */
  if (!value && value !== 0) callback()
  const reg = /^[0-9]+$/
  let tips = '只允许输入正整数'
  if (rule.nullAble && !value) callback()
  if (rule.numberTips) tips = rule.numberTips
  if (!reg.test(value)) {
    callback(new Error(tips))
  } else {
    if (!rule.zeroAbel && (value === 0 || value === '0')) {
      callback(new Error(tips))
    }
    callback()
  }
}

// 校验数值
export function validateNumber(rule, value, callback) {
  if (!value) callback()
  const _value = '' + value
  const reg = /^((0{1}\.\d+)|([1-9]\d*\.{1}\d+)|([1-9]+\d*)|0)$/
  const integer = rule.integer // 设置整数位数
  const float = rule.float // 设置小数位数
  const min = rule.min
  const max = rule.max
  const checkMin = rule.checkMin // 当checkMin设为true时代码会校验最小值
  const int = rule.int // 在引用的rule中设置int:true则代表只能输入正整数
  // const num = rule.num
  const includeZero = rule.zeroAble // 当zeroAble设为true时代码会校验包含0
  const arr = _value.split('.')
  // nullAble 可为空
  if (rule.nullAble && !value) callback()
  if (!reg.test(value)) {
    callback(new Error('请输入有效数值'))
  }
  if (checkMin) {
    if (Number(value) <= min) {
      console.log(value, includeZero)
      if (Number(value) === 0 && includeZero) {
        callback()
        return
      }
      callback(new Error('请输入大于' + min + '的数值'))
    }
  }
  if (max) {
    if (Number(value) > max) {
      callback(new Error('请输入小于' + max + '的数值'))
    }
  }
  if (int && arr[1] && arr[1].length > 0) {
    callback(new Error('只支持输入整数'))
  }
  if (integer && arr[0].length > integer) {
    callback(new Error('整数长度不允许超过' + integer + '位'))
  }
  if (float && arr[1] && arr[1].length > float) {
    callback(new Error('只允许输入' + float + '位小数'))
  }
  callback()
}

// 校验数字长度
export function validateNumberForLength(rule, value, callback) {
  if (!value) callback()
  const reg = /^[0-9]+$/
  const _value = '' + value
  if (!reg.test(value)) {
    callback(new Error('只允许输入数字'))
  }
  if (rule.length) {
    if (rule.length !== _value.length) {
      callback(new Error('只能输入' + rule.length + '位数字'))
    }
  }
  if (rule.maxLength) {
    if (rule.maxLength < _value.length) {
      callback(new Error('最多允许输入' + rule.maxLength + '位数字'))
    }
  }
  callback()
}

// 检验起止时间
export function validateDate(rule, value, callback) {
  const startTime = rule.timeObj && rule.timeObj[rule.startKey] 
  const endTime = rule.timeObj && rule.timeObj[rule.endKey] 
  if (!startTime || !endTime) callback()
  const sT = new Date(startTime)
  const eT = new Date(endTime)
  if (eT - sT < 0) {
    callback(new Error('开始时间不能晚于结束时间'))
  } else {
    callback()
  }
}
export function validateDateTips(type, st, et, callback) {
  const sT = new Date(st)
  const eT = new Date(et)
  if (!st || !et) return
  let flag = true
  if (eT - sT < 0) flag = false
  if (flag) return
  let mes = ''
  if (type === 's') {
    callback()
    mes = '请重新选择开始时间'
  }
  if (type === 'e') {
    callback()
    mes = '请重新选择结束时间'
  }
  Message.error(mes)
}

// 校验字符串长度
export function validateLength(rule, value, callback) {
  const _value = '' + value
  if (_value.length < rule.min) {
    callback(new Error('输入值必须大于' + rule.min + '位'))
  }
  if (_value.length > rule.max) {
    callback(new Error('输入值必须小于' + rule.max + '位'))
  }
  callback()
}

// 选择国/省/市/县(区) 检验哪个层级是没有选择的
export function areaValidate(rule, value, callback) {
  if (!Array.isArray(value)) callback()
  const levelMap = {
    '0': '所属国',
    '1': '省',
    '2': '市',
    '3': '县(区)',
    '4': '街道'
  }
  const idx = value.findIndex(item => !item)
  if (idx > -1) {
    callback(new Error(`${levelMap[idx + '']}不能为空`))
  }
  callback()
}

// 将带特殊字符的数字转换成数字
export function transferNumber(rule, value) {
  const pattern = new RegExp(rule)
  if (!value) return
  const len = value.length
  let rsLen = ''
  for (let i = 0; i < len; i++) {
    rsLen = rsLen + value.substr(i, 1).replace(pattern, '')
  }
  return rsLen
}

// 不允许输入汉字
export function checkZh(rule, value, callback) {
  const reg = new RegExp(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/g)
  if (reg.test(value)) {
    callback(new Error('不允许输入汉字'))
  } else {
    callback()
  }
}

// 深度对比两个object是否一样
export function compare2Object(obj, otherObj) {
  const customIsNil = (str) => {
    if (str === '' || str === null || str === undefined) {
      return true
    } else {
      return false
    }
  }
  const customizer = (objValue, othValue) => {
    if (customIsNil(objValue) && customIsNil(othValue)) {
      return true
    }
    if (objValue == othValue) { // 判断类似 2 == '2' 的情况
      return true
    }
  }
  return _.isEqualWith(obj, otherObj, customizer)
}

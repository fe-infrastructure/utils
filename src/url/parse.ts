// 以空格、制表符、换行符和其他 Unicode 空白字符开头的字符
// eslint-disable-next-line no-control-regex
const controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/

// 全局匹配换行符、回车符、制表符
const CRHTLF = /[\n\r\t]/g

// 匹配协议
const protocolReg = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i

interface URL2Location {
  /**
   * URL 中 scheme 协议
   */
  protocol: string
  /**
   * URL 中 # 后面的所有字符
   */
  hash: string
}

export function parse (url: string): URL2Location | undefined {
  if (typeof url !== 'string') {
    TypeError('url 类型必须是字符串类型')
    return
  }
  url = trimLeft(url)
  url = url.replace(CRHTLF, '')
  const location: URL2Location = Object.create(null)

  // 获取协议信息
  const extracted = extractProtocol(url)
  location.protocol = extracted.protocol

  // 除去协议的剩余内容
  url = extracted.rest

  return location
}

/**
 * 提取协议信息
 * @param {string} url url地址
 * @returns {protocol: string, rest: string}
 */
function extractProtocol (url: string) {
  const match = protocolReg.exec(url)

  return {
    protocol: match![1] ? match![1].toLowerCase() : '',
    rest: match![2] + match![4]
  }
}

function trimLeft (str: string) {
  return str.replace(controlOrWhitespace, '')
}

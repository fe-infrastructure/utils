// 以空格、制表符、换行符和其他 Unicode 空白字符开头的字符
// eslint-disable-next-line no-control-regex
const controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/

// 全局匹配换行符、回车符、制表符
const CRHTLF = /[\n\r\t]/g

// 匹配协议
const protocolReg = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i

interface URL2Location {
  /**
   * 传入的原始地址
   */
  href: string
  /**
   * URL 中 scheme 协议
   */
  protocol: string
  /**
   * URL 中 # 后面的所有字符
   */
  hash: string
  /**
   * URL 中 ? 后面的参数
   */
  search: string
  /**
   * URL 中的路径
   */
  pathname: string
  /**
   * URL 中 （IP + 端口号） / 域名
   */
  host: string
  /**
   * URL 中 IP / 域名
   */
  hostname: string
  /**
   * URL 中端口号
   */
  port: string
  /**
   * 协议 + ip + 端口
   */
  origin: string
}

export function parse (url: string): URL2Location | undefined {
  if (typeof url !== 'string') {
    TypeError('url 类型必须是字符串类型')
    return
  }

  url = trimLeft(url)
  url = url.replace(CRHTLF, '')
  const location: URL2Location = Object.create(null)

  location.href = url

  // 获取协议信息
  const extracted = extractProtocol(url)
  location.protocol = extracted.protocol
  url = extracted.rest

  // 获取哈希参数
  const extractedHash = extractOperator(url, '#')
  location.hash = extractedHash.value
  url = extractedHash.rest

  // 获取 search 参数
  const extractedSearch = extractOperator(url, '?')
  location.search = extractedSearch.value
  url = extractedSearch.rest

  // 获取路径信息
  const extractedPathname = extractOperator(url, '/')
  location.pathname = extractedPathname.value
  url = extractedPathname.rest

  // 获取 host
  location.host = url

  // 获取 port
  const extractedPort = extractPort(url)
  location.port = extractedPort.value
  url = extractedPort.rest

  // 获取 hostname
  location.hostname = url

  // 获取 origin
  location.origin = location.protocol + '//' + location.host

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
    rest: match![4]
  }
}

type Operator = '#' | '?' | '/'

/**
 * 提取 operator 相关的信息
 * @param url
 * @returns
 */
function extractOperator (url: string, operator: Operator) {
  const index = url.indexOf(operator)
  if (~index) {
    return {
      value: url.slice(index),
      rest: url.slice(0, index)
    }
  } else {
    return {
      value: '',
      rest: url
    }
  }
}

/**
 * 提取 port 信息
 */
function extractPort (url: string) {
  const index = /:(\d*)$/.exec(url)
  if (index) {
    return {
      value: index[1],
      rest: url.slice(0, index.index)
    }
  } else {
    return {
      value: '',
      rest: url
    }
  }
}

/**
 * 去除左侧所有的空白符
 * @param str
 * @returns
 */
function trimLeft (str: string) {
  return str.replace(controlOrWhitespace, '')
}

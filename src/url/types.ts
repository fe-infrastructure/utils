export interface URL2Location {
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

export type Operator = '#' | '?' | '/'

export type LocationQueryValue = string | null

export type LocationQuery = Record<
  string,
  LocationQueryValue | LocationQueryValue[]
>

export type LocationQueryValueRaw = LocationQueryValue | number | undefined

export type LocationQueryRaw = Record<
  string | number,
  LocationQueryValueRaw | LocationQueryValueRaw[]
>

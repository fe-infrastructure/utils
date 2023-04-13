import type { LocationQueryValue } from './parseQuery'

export type LocationQueryValueRaw = LocationQueryValue | number | undefined

export type LocationQueryRaw = Record<
  string | number,
  LocationQueryValueRaw | LocationQueryValueRaw[]
>

export function stringifyQuery (query: LocationQueryRaw): string {
  let search = ''
  for (let key in query) {
    const value = query[key]
    key = encodeQueryKey(key)
    if (value == null) {
      // only null adds the value
      if (value !== undefined) {
        search += (search.length ? '&' : '') + key
      }
      continue
    }
    // keep null values
    const values: LocationQueryValueRaw[] = Array.isArray(value)
      ? value.map(v => v && encodeQueryValue(v))
      : [value && encodeQueryValue(value)]

    values.forEach(value => {
      // skip undefined values in arrays as if they were not present
      // smaller code than using filter
      if (value !== undefined) {
        // only append & with non-empty search
        search += (search.length ? '&' : '') + key
        if (value != null) search += '=' + value
      }
    })
  }

  return search
}

const HASH_RE = /#/g // %23
const AMPERSAND_RE = /&/g // %26
const EQUAL_RE = /=/g // %3D
const PLUS_RE = /\+/g // %2B
const ENC_BACKTICK_RE = /%60/g // `
const ENC_CURLY_OPEN_RE = /%7B/g // {
const ENC_CURLY_CLOSE_RE = /%7D/g // }
const ENC_CARET_RE = /%5E/g // ^
const ENC_PIPE_RE = /%7C/g // |
const ENC_SPACE_RE = /%20/g // }
const ENC_BRACKET_OPEN_RE = /%5B/g // [
const ENC_BRACKET_CLOSE_RE = /%5D/g // ]

export function encodeQueryKey (text: string | number): string {
  return encodeQueryValue(text).replace(EQUAL_RE, '%3D')
}

export function encodeQueryValue (text: string | number): string {
  return (
    commonEncode(text)
      // Encode the space as +, encode the + to differentiate it from the space
      .replace(PLUS_RE, '%2B')
      .replace(ENC_SPACE_RE, '+')
      .replace(HASH_RE, '%23')
      .replace(AMPERSAND_RE, '%26')
      .replace(ENC_BACKTICK_RE, '`')
      .replace(ENC_CURLY_OPEN_RE, '{')
      .replace(ENC_CURLY_CLOSE_RE, '}')
      .replace(ENC_CARET_RE, '^')
  )
}

function commonEncode (text: string | number): string {
  return encodeURI('' + text)
    .replace(ENC_PIPE_RE, '|')
    .replace(ENC_BRACKET_OPEN_RE, '[')
    .replace(ENC_BRACKET_CLOSE_RE, ']')
}

import { test, expect } from 'vitest'

import { parse } from '@/url/parse'

test('parse history url', () => {
  expect(parse('https://www.baidu.com/foo/bar/?foo=foo&bar=bar')).toMatchInlineSnapshot(`
    {
      "hash": "",
      "host": "www.baidu.com",
      "hostname": "www.baidu.com",
      "href": "https://www.baidu.com/foo/bar/?foo=foo&bar=bar",
      "origin": "https://www.baidu.com",
      "pathname": "/foo/bar/",
      "port": "",
      "protocol": "https:",
      "search": "?foo=foo&bar=bar",
    }
  `)
})

test('parse hash url', () => {
  expect(parse('http://google.com/parse-things/?bar=bar#/path?foo=foo')).toMatchInlineSnapshot(`
    {
      "hash": "#/path?foo=foo",
      "host": "google.com",
      "hostname": "google.com",
      "href": "http://google.com/parse-things/?bar=bar#/path?foo=foo",
      "origin": "http://google.com",
      "pathname": "/parse-things/",
      "port": "",
      "protocol": "http:",
      "search": "?bar=bar",
    }
  `)
})

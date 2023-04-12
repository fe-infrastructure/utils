import { test, expect } from 'vitest'

import { parse } from '@/url/parse'
import { parseQuery } from '@/url/parseQuery'

test('parse url search', () => {
  expect(parseQuery(parse('https://www.baidu.com/foo/bar/?foo=foo&bar=bar').search)).toMatchInlineSnapshot(`
    {
      "bar": "bar",
      "foo": "foo",
    }
  `)
})

test('parse hash url', () => {
  expect(parseQuery(parse('http://google.com/parse-things/?bar=bar#/path?foo=foo').search)).toMatchInlineSnapshot(`
    {
      "bar": "bar",
    }
  `)
})

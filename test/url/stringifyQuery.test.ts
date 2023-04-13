import { test, expect } from 'vitest'

import { stringifyQuery } from '@/url/stringifyQuery'

test('stringify url search', () => {
  expect(stringifyQuery({ foo: 'foo', bar: 'bar' })).toMatchInlineSnapshot('"foo=foo&bar=bar"')
})

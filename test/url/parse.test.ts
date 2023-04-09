import { test, expect } from 'vitest'

import { parse } from '@/url/parse'

test('parse url protocol', () => {
  expect(parse('https://foo')).toMatchInlineSnapshot(`
    {
      "protocol": "https:",
    }
  `)
})

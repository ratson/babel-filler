'use strict'
const { transform } = require('@babel/core')

const plugin = require('.')

test('fill import from default export', () => {
  const opts = {
    babelrc: false,
    plugins: [
      [
        plugin,
        {
          vars: {
            _: 'lodash',
          },
        },
      ],
    ],
  }
  const { code } = transform('_.random()', opts)
  expect(code).toMatchSnapshot()
})

test('fill import from named export', () => {
  const opts = {
    babelrc: false,
    plugins: [
      [
        plugin,
        {
          vars: {
            random: { name: 'random', module: 'lodash' },
          },
        },
      ],
    ],
  }
  const { code } = transform('random()', opts)
  expect(code).toMatchSnapshot()
})

test('fill import from named export as alias', () => {
  const opts = {
    babelrc: false,
    plugins: [
      [
        plugin,
        {
          vars: {
            f: { name: 'random', module: 'lodash' },
          },
        },
      ],
    ],
  }
  const { code } = transform('f()', opts)
  expect(code).toMatchSnapshot()
})

test('fill import from default and named export', () => {
  const opts = {
    babelrc: false,
    plugins: [
      [
        plugin,
        {
          vars: {
            Component: { name: 'Component', module: 'react' },
            React: 'react',
          },
        },
      ],
    ],
  }
  const { code } = transform(
    "class App extends Component { render() { return React.createElement('div') } }",
    opts
  )
  expect(code).toMatchSnapshot()
})

test('do nothing when no missing variables', () => {
  const opts = {
    babelrc: false,
    plugins: [
      [
        plugin,
        {
          vars: {
            _: 'lodash',
          },
        },
      ],
    ],
  }
  const { code } = transform('const _ = {}; _.random()', opts)
  expect(code).not.toContain('lodash')
})

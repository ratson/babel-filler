'use strict'
const { addDefault, addNamed } = require('@babel/helper-module-imports')

function resolveIdentifier(vars, name, path) {
  const spec = vars[name]
  if (typeof spec === 'string') {
    return addDefault(path, spec)
  }
  if (typeof spec === 'object' && spec.name) {
    return name === spec.name
      ? addNamed(path, spec.name, spec.module)
      : addNamed(path, spec.name, 'source', { nameHint: name })
  }
  return false
}

module.exports = (api, options) => {
  api.assertVersion(7)

  const { vars = {} } = options
  const { jSXIdentifier } = api.types

  return {
    visitor: {
      ReferencedIdentifier(path) {
        const { node, scope } = path
        if (scope.getBindingIdentifier(node.name)) {
          return
        }
        const { name } = node
        const newIdentifier = resolveIdentifier(vars, name, path)
        if (newIdentifier === false) {
          return
        }

        path.replaceWith(
          node.type === 'JSXIdentifier'
            ? jSXIdentifier(newIdentifier.name)
            : newIdentifier
        )
      },
    },
  }
}

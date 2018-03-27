# babel-plugin-filler

Fill undeclared variables per configuration.

## Installation

```
npm install babel-plugin-filler --save-dev
```

## Usage

### Via `.babelrc`

**.babelrc**

```json
{
  "plugins": [
    [
      "filler",
      {
        "vars": {
          "_": "lodash",
          "Component": { "name": "Component", "module": "react" },
          "React": "react"
        }
      }
    ]
  ]
}
```

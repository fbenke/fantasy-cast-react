module.exports = {
	"extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module",
    "ecmaFeatures": {
        "jsx": true
    }
  },
  "globals": {
    "window": true,
    "process": true,
    "document": true
  }
};
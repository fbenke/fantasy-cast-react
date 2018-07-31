module.exports = {
  "extends": "airbnb",
  "env": {
    "jest": true
  },
  "globals": {
    "window": true,
    "document": true,
  },
  "rules": {
    "no-shadow": "warn",
    "jsx-a11y/label-has-for": "off",
    "import/prefer-default-export": "warn",
    "react/forbid-prop-types": "warn",
    "react/jsx-one-expression-per-line": "warn",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
  }
};
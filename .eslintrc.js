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
    "jsx-a11y/label-has-for": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
};
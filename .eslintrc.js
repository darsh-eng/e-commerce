module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    // Disable specific rules if needed
    '@next/next/no-async-client-component': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-promises': 'off'
  },
};

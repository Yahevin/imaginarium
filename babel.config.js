const projectBabelConfig = {
  presets: [['@babel/preset-env', { corejs: 3, useBuiltIns: 'usage' }], '@babel/preset-react'],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-typescript',
  ],
  overrides: [
    {
      test: /styled-components\.(ts|tsx)$/,
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
    },
    {
      test: /\.(ts|tsx)$/,
      presets: [
        ['@babel/preset-env', { corejs: 3, useBuiltIns: 'usage' }],
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      plugins: ['@babel/plugin-transform-runtime'],
    },
  ],
};

module.exports = projectBabelConfig;

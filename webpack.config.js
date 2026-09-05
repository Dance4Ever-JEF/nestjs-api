module.exports = function (options) {
  return {
    ...options,
    externals: [
      ...(options.externals || []),
      'bcrypt',
    ],
    resolve: {
      ...options.resolve,
      extensionAlias: {
        '.js': ['.ts', '.tsx', '.js'],
      },
    },
  };
};

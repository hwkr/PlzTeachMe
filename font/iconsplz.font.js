const icons = [
  'icons/heart.svg',
];

module.exports = {
  files: [
    ...icons,
  ],
  fontName: 'IconsPlz',
  classPrefix: 'ip-',
  baseClass: 'ip',
  fixedWidth: true,
  types: ['eot', 'woff', 'ttf'],
  cssTemplate: 'templates/less.hbs',
};

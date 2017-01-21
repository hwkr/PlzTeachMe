const icons = [
  'icons/flash.svg',
  'icons/group.svg',
  'icons/heart.svg',
];

module.exports = {
  files: [
    ...icons,
  ],
  fontName: 'IconsPlz',
  classPrefix: 'plz-',
  baseClass: 'plz',
  fixedWidth: true,
  types: ['eot', 'woff', 'ttf'],
  cssTemplate: 'templates/less.hbs',
};

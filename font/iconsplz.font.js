const icons = [
  'icons/flash.svg',
  'icons/group.svg',
  'icons/heart.svg',
  'icons/social-facebook.svg',
  'icons/social-twitter.svg',
  'icons/social-github.svg',
  'icons/warning.svg',
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

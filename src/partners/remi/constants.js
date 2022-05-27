export const SELLING_PLAN_GROUP_NAME = 'remi-club';
export const PRODUCTS_HANDLES = [
  'custom-night-guard',
  'custom-teeth-whitening-kit',
  'whitening-gel',
  'whiteningfoam',
];

export const PRODUCTS = {
  'custom-night-guard': {
    stars: '4.9 of 752',
    suggestionExceptions: ['custom-teeth-whitening-kit'],
  },
  'custom-teeth-whitening-kit': {
    stars: '4.9 of 226',
    suggestionExceptions: ['custom-night-guard'],
  },
  'whitening-gel': {
    stars: '4.9 of 79',
    suggestionExceptions: [''],
  },
  whiteningfoam: {
    stars: '4.9 of 226',
    suggestionExceptions: [''],
  },
};

import { ORDER } from './constants';

export default (order) => {
  switch (order) {
    case ORDER.GRADE:
    case ORDER.JLPT:
    case ORDER.STROKE_COUNT:
      return 'categorical';
    default:
      return 'sequential';
  }
};

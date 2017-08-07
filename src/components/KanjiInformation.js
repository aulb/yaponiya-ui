import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty } from '../helpers/utils';

function KanjiInformation({ jlpt, grade, stroke_count }) {
  const makeBlurb = (level, label) => {
    if (isPropEmpty(level)) return '';

    const grades = {
      1: 'first',
      2: 'second',
      3: 'third',
      4: 'fourth',
      5: 'fifth',
      6: 'sixth',
    };

    const humanGrade = level < 7 ? grades[level] : 'secondary school';

    switch (label) {
      case 'jlpt':
        return `This kanji is tested as part of the N${level.toString(10)} test.`;
      case 'grade':
        return `Taught in ${humanGrade} grade.`;
      case 'stroke_count':
        return `Requires ${level.toString(10)} stroke${level > 1 ? 's' : ''} to write.`;
      default:
        return '';
    }
  };

  return (
    <div>
      {`${makeBlurb(jlpt, 'jlpt')} ${makeBlurb(grade, 'grade')} ${makeBlurb(stroke_count, 'stroke_count')}`}
    </div>
  );
}

KanjiInformation.propTypes = {
  jlpt: PropTypes.number.isRequired,
  grade: PropTypes.number.isRequired,
  stroke_count: PropTypes.number.isRequired,
};

export default KanjiInformation;

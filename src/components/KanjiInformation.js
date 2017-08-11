import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty } from '../helpers/utils';

function KanjiInformation({ jlpt, grade, stroke_count }) {
  const blurbs = [
    { name: 'jlpt', value: jlpt },
    { name: 'grade', value: grade },
    { name: 'stroke_count', value: stroke_count },
  ];

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
        return `Taught in ${humanGrade}${level > 6 ? '' : ' grade'}.`;
      case 'stroke_count':
        return `Requires ${level.toString(10)} stroke${level > 1 ? 's' : ''} to write.`;
      default:
        return '';
    }
  };

  const blurbElements = blurbs.map(({ value, name }) =>
    <p key={name}>{ makeBlurb(value, name) }</p>,
  );

  return (
    <div>
      { blurbElements }
    </div>
  );
}

KanjiInformation.propTypes = {
  jlpt: PropTypes.number,
  grade: PropTypes.number,
  stroke_count: PropTypes.number,
};

KanjiInformation.defaultProps = {
  jlpt: 0,
  grade: 0,
  stroke_count: 0,
};

export default KanjiInformation;

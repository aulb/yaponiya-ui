import React from 'react';
import PropTypes from 'prop-types';
import xml2js from 'xml2js';

import { isPropEmpty } from '../helpers/utils';

const xmlParser = xml2js.parseString;
const builder = new xml2js.Builder();

function findAllElements(stroke) {
  const elements = [];

  function findElement(stroke) {
    // Base condition
    if (stroke === '') return;

    elements.push('');
  }

  findElement(stroke);

  return elements;
}

function componentBuilder(stroke) {
  let stroke1 = '';

  xmlParser(stroke, (error, result) => {
    if (!isPropEmpty(result)) {
      console.log(result.svg.g[0].g);
      result.svg.g = result.svg.g.splice(0, 1);
      stroke1 = builder.buildObject(result);
    }
  });

  return stroke1;
}


function KanjiStroke({ stroke }) {
  if (isPropEmpty(stroke)) return (<div />);

  const stroke1 = componentBuilder(stroke);

  return (
    <div>
      <h1>Stroke Components</h1>
      <div dangerouslySetInnerHTML={{ __html: stroke1 }} />
    </div>
  );
}

KanjiStroke.propTypes = {
  stroke: PropTypes.string.isRequired,
};

export default KanjiStroke;

import React from 'react';
import PropTypes from 'prop-types';

import { isPropEmpty,
  excludeFromArray,
  removeDuplicates } from '../helpers/utils';
import { convertXMLToObject,
  findAllKanjiPaths,
  makeKanjiStrokeOrder,
  findAllKanjiComponents } from '../helpers/stroke-utils';

function getOrderSVGs(strokeXML) {
 // We are allowed to delete a const'd object
  const strokeObject = convertXMLToObject(strokeXML);
  const paths = findAllKanjiPaths(strokeObject.svg.g[0].g[0]);

  delete strokeObject.svg.g[0].g;
  delete strokeObject.svg.g[1];

  return makeKanjiStrokeOrder(strokeObject, paths);
}

function getKanjiComponents(kanji, strokeXML) {
  const strokeObject = convertXMLToObject(strokeXML); // Deep copy-ing in a sense

  const kanjiComponents = findAllKanjiComponents(strokeObject.svg.g[0].g[0]);
  // Proto this...
  return removeDuplicates(excludeFromArray(kanjiComponents, kanji));
}

function KanjiStroke({ kanji, strokeXML }) {
  if (isPropEmpty(strokeXML)) return (<div />);

  const strokeOrderSVGs = getOrderSVGs(strokeXML);
  const strokeComponents = getKanjiComponents(kanji, strokeXML);

  return (
    <div>
      <h1>Major Kanji Components</h1>
      {strokeComponents.join(', ')}
      <h1>Stroke Order</h1>
      <div dangerouslySetInnerHTML={{ __html: strokeOrderSVGs.join('') }} />
    </div>
  );
}

KanjiStroke.propTypes = {
  kanji: PropTypes.string.isRequired,
  strokeXML: PropTypes.string.isRequired,
};

export default KanjiStroke;

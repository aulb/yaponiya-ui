import React from 'react';
import { ORDER, SORT } from '../helpers/constants';

export function excludeFromArray(array, exclude) {
  return array.filter(item => (item !== exclude));
}

export function removeDuplicates(array) {
  const seen = {};
  return array.filter((item) => {
    if (seen[item]) {
      return false;
    }
    seen[item] = true;
    return true;
  });
}

export function isPropEmpty(prop) {
  if (typeof prop === 'string') {
    return prop.replace(/^\s+|\s+$/g, '') === '';
  }

  return (prop === undefined || prop === null
    || prop === [] || prop === {});
}

export function capitalizeLabel(string, splitter = '_') {
  function capitalizeFirstLetter(letter, index) {
    return index === 0
      ? letter.toUpperCase()
      : letter;
  }

  function capitalizeWord(word) {
    return word.split('').map(capitalizeFirstLetter).join('');
  }

  return string.split(splitter).map(capitalizeWord).join(' ');
}

function makeOptions(options) {
  const optionKeys = Object.keys(options);
  const renderOptions = (optionKey) => {
    const optionString = options[optionKey];
    return (
      <option
        value={optionString}
        key={optionString}
      >
        {capitalizeLabel(optionString)}
      </option>
    );
  };
  return optionKeys.map(renderOptions);
}

export function makeOrderOptions() {
  return makeOptions(ORDER);
}

export function makeSortOptions() {
  return makeOptions(SORT);
}

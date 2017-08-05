import React from 'react';
import { ORDER, SORT } from '../helpers/constants';

function capitalizeOptionLabel(string) {
  function capitalizeFirstLetter(letter, index) {
    return index === 0
      ? letter.toUpperCase()
      : letter;
  }

  function capitalizeWord(word) {
    return word.split('').map(capitalizeFirstLetter).join('');
  }

  return string.split('_').map(capitalizeWord).join(' ');
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
        {capitalizeOptionLabel(optionString)}
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

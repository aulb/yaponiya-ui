import React, { Component } from 'react';

function Kanji(props) {
  const style = {
    backgroundColor: props.color,
  };
  return <span style={style}>{props.character}</span>;
}

export default Kanji;

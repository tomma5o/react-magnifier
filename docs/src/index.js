import React from 'react';
import ReactDOM from 'react-dom';
import Magnifier from '../../index';

ReactDOM.render(
  <Magnifier
    urlLQ="../docs/images/imgLQ.jpg"
    urlHQ="../docs/images/imgHQ.jpg"
    navSize={{ w: 500, h: 500 }}
    imgSizes={{ lq: { w: 300, h: 268 }, hq: { w: 1000, h: 893} }}/>,
  document.getElementById('root')
);
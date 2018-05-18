import React from 'react';

const MySvg = require('./close.svg');

export function MyFunctionIcon() {
  return <MySvg />;
}

export class MyClassIcon extends React.Component {
  render() {
    return <MySvg />;
  }
}

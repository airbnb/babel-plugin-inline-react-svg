import React from 'react';

import MySvg from 'myalias/CLOSE.svg';

export default function MyFunctionIcon() {
  return <MySvg />;
}

export class MyClassIcon extends React.Component {
  render() {
    return <MySvg />;
  }
}

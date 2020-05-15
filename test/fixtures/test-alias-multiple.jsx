import React from 'react';

import MySvg from 'myalias/close.svg';
import Svg2 from 'myalias/close2.svg';

export default function MyFunctionIcon() {
  return (
    <>
      <MySvg />
      <Svg2 />
    </>
  );
}

export class MyClassIcon extends React.Component {
  render() {
    return (
      <>
        <MySvg />
        <Svg2 />
      </>
    );
  }
}

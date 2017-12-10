import React from 'react';
class Playground extends React.Component {
  render() {
    let puzzle = this.props.puzzle;
    return puzzle.shapes;
  }
}
export default Playground;
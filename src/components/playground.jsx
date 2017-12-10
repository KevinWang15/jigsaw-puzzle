import React from 'react';
class Playground extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      piecePositions: null,
    };
  }

  componentWillMount() {
    let shapes = this.props.puzzle.shapes.sort(_ => Math.random() - 0.5);
    if (!this.state.piecePositions) {
      let xPointer = 0;
      this.setState({
        piecePositions: shapes.map((_, index) => {
          let pos = ({ x: xPointer, y: 0 });
          xPointer += +_.props.width;
          console.log(xPointer);
          return pos;
        }),
      });
    }
  }

  render() {
    let puzzle = this.props.puzzle;
    return <div className="playground">
      {puzzle.shapes.map((_, index) => {
        return <div className="puzzle-piece"
                    style={{
                      left: this.state.piecePositions[index].x,
                      top: this.state.piecePositions[index].y,
                    }}
                    key={index}
                    onMouseDown={() => {
                      console.log('1')
                    }}>{_}</div>
      })}
    </div>
  }
}
export default Playground;
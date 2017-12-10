import React from 'react';
class Playground extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      piecePositions: null,
      draggingPiece: null,
      dragOffset: { x: 0, y: 0 },
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentWillMount() {
    let shapes = this.props.puzzle.shapes.sort(_ => Math.random() - 0.5);
    if (!this.state.piecePositions) {
      let xPointer = 0;
      this.setState({
        piecePositions: shapes.map((_, index) => {
          let pos = ({ x: xPointer, y: 0 });
          xPointer += +_.props.width;
          return pos;
        }),
      });
    }
  }

  onMouseMove(e) {
    if (this.state.draggingPiece !== null) {
      console.log(e.pageX, e.pageY, this.state.draggingPiece);
      let newPiecePositions = [...this.state.piecePositions];
      newPiecePositions[this.state.draggingPiece] = {
        ...newPiecePositions[this.state.draggingPiece],
        x: e.pageX - this.state.dragOffset.x,
        y: e.pageY - this.state.dragOffset.y,
      };
      this.setState({ piecePositions: newPiecePositions });
    }
  }

  onMouseUp() {
    this.setState({
      draggingPiece: null,
    });
  }

  render() {
    let puzzle = this.props.puzzle;
    return <div className="playground" onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>
      {puzzle.shapes.map((_, index) => {
        return <div className="puzzle-piece"
                    style={{
                      left: this.state.piecePositions[index].x,
                      top: this.state.piecePositions[index].y,
                    }}
                    key={index}
                    onMouseDown={(e) => {
                      this.setState({
                        draggingPiece: index,
                        dragOffset: {
                          x: e.nativeEvent.offsetX,
                          y: e.nativeEvent.offsetY,
                        },
                      });
                    }}>{_}</div>
      })}
    </div>
  }
}
export default Playground;
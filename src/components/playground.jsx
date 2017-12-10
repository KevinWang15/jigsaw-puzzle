import React from 'react';
import Polygon from "./polygon.jsx";
class Playground extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      piecePositions: null,
      draggingPiece: null,
      dragOffset: { x: 0, y: 0 },
      hintShapes: [],
      gameOver: false,
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  componentWillMount() {
    if (!this.state.piecePositions) {
      let xPointer = 0;
      let order = this.props.puzzle.shapes.map((_, index) => index).sort(_ => Math.random() - 0.5);
      let piecePositions = [];
      for (let i = 0; i < order.length; i++) {
        piecePositions[order[i]] = xPointer;
        xPointer += +this.props.puzzle.shapes[order[i]].props.width;
      }
      this.setState({
        piecePositions: piecePositions.map(_ => ({ x: _, y: 0 })),
      });

      let hintShapes = this.props.puzzle.shapes.map(_ => {
        return <Polygon points={_.props.points} color="gray" width={_.props.width}
                        height={_.props.height}/>
      });
      this.setState({ hintShapes });
    }
  }

  onMouseMove(e) {
    if (this.state.gameOver) return;
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

  showAnswer() {
    this.setState(
      {
        gameOver: true,
        piecePositions: this.props.puzzle.solution,
      },
    );
  }

  render() {
    let puzzle = this.props.puzzle;
    return <div className={"playground " + (this.state.gameOver ? 'game-over' : '')}
                onDoubleClick={() => {
                  console.log(this.state)
                }} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>

      {!this.state.gameOver &&
      <button onClick={this.showAnswer} className="show-answer">揭晓答案</button>}

      {this.state.hintShapes.map((_, index) => {
        return <div className="puzzle-piece non-interactive"
                    style={{
                      left: this.props.puzzle.solution[index].x,
                      top: this.props.puzzle.solution[index].y,
                    }}
                    key={index}>{_}</div>
      })}
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
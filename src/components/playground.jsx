import React from 'react';
import Polygon from "./polygon.jsx";

const config = {
  boardPadding: 30,
  width: 1000,
  height: 800,
};

class Playground extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      piecePositions: null,
      draggingPiece: null,
      dragOffset: { x: 0, y: 0 },
      hintShapes: [],
      hintShapesOffset: { x: 0, y: 0 },
      gameOver: false,
      board: { x: 0, y: 0, width: 0, height: 0 },
    };
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.showAnswer = this.showAnswer.bind(this);
  }

  componentWillMount() {
    if (!this.state.piecePositions) {
      //piecePositions
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

      //board
      let w = this.props.puzzle.dimensions[0] + config.boardPadding * 2;
      let h = this.props.puzzle.dimensions[1] + config.boardPadding * 2;
      this.setState({
        board: { x: (config.width - w) / 2, y: (config.height - h) / 2, width: w, height: h },
      });

      //hintShapes
      this.setState({
        hintShapesOffset: {
          x: (config.width - w) / 2 + config.boardPadding,
          y: (config.height - h) / 2 + config.boardPadding,
        },
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
      let newPiecePositions = [...this.state.piecePositions];
      newPiecePositions[this.state.draggingPiece] = {
        ...newPiecePositions[this.state.draggingPiece],
        x: e.pageX - (window.innerWidth - config.width) / 2 - this.state.dragOffset.x,
        y: e.pageY - (window.innerHeight - config.height) / 2 - this.state.dragOffset.y,
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
        piecePositions: this.props.puzzle.solution.map(_ => ({
          x: _.x + this.state.hintShapesOffset.x,
          y: _.y + this.state.hintShapesOffset.y,
        })),
      },
    );
  }

  render() {
    let puzzle = this.props.puzzle;
    return <div className={"playground " + (this.state.gameOver ? 'game-over' : '')}
                style={{ width: config.width, height: config.height }}
                onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp}>

      {!this.state.gameOver &&
      <button onClick={this.showAnswer} className="show-answer">揭晓答案</button>}

      <div className="board" style={{
        left: this.state.board.x,
        top: this.state.board.y,
        height: this.state.board.height,
        width: this.state.board.width,
      }}/>

      {this.state.hintShapes.map((_, index) => {
        return <div className="puzzle-piece non-interactive"
                    style={{
                      left: this.props.puzzle.solution[index].x + this.state.hintShapesOffset.x,
                      top: this.props.puzzle.solution[index].y + this.state.hintShapesOffset.y,
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
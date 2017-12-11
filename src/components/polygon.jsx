import React from 'react';

class Polygon extends React.Component {
  static get defaultProps() {
    return {
      color: "lime",
      points: [[0, 0], [100, 0], [0, 100]],
    }
  }

  render() {
    return <svg height={this.props.height} width={this.props.width} style={this.props.style} className={this.props.className}
                onMouseDown={this.props.onMouseDown}>
      <polygon points={this.props.points.map(_=>`${_[0]},${_[1]}`).join(' ')}
               style={{ "fill": this.props.color }}/>
    </svg>;
  }
}

export default Polygon;
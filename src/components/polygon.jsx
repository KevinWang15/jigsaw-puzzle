import React from 'react';
import RotateIcon from "react-svg-loader!../icons/rotate.svg";

class Polygon extends React.Component {
  polygonComponentRef;

  static get defaultProps() {
    return {
      color: "lime",
      points: [[0, 0], [100, 0], [0, 100]],
    }
  }

  constructor() {
    super();
    this.state = { showRotation: false };
    this.mouseMoveEventListener = this.mouseMoveEventListener.bind(this);
  }

  mouseMoveEventListener(e) {
    if (!this.polygonComponentRef || !this.state.showRotation) return;
    let distanceAllowed = 0;
    let rect = this.polygonComponentRef.getBoundingClientRect();
    if (e.clientX + distanceAllowed < rect.x || e.clientY + distanceAllowed < rect.y || e.clientX - distanceAllowed > rect.x + rect.width || e.clientY - distanceAllowed > rect.y + rect.height) {
      this.setState({ showRotation: false });
    }
  };

  componentWillMount() {
    window.addEventListener('mousemove', this.mouseMoveEventListener);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMoveEventListener);
  }

  render() {
    return <div className="polygon-component"
                ref={ref => this.polygonComponentRef = ref}
                style={{ ...this.props.style, height: this.props.height, width: this.props.width }}>
      <svg height={this.props.height} width={this.props.width}
           className={this.props.className}
           onMouseDown={this.props.onMouseDown}
           onMouseOver={() => {
             if (!this.props.inactive && !this.state.showRotation)
               this.setState({ showRotation: true })
           }}
           style={{transform:`rotate(${this.props.rotation}deg)`}}
      >
        <polygon points={this.props.points.map(_ => `${_[0]},${_[1]}`).join(' ')}
                 style={{ "fill": this.props.color }}/>
      </svg>
      {this.state.showRotation && <RotateIcon
        onClick={() => {
          this.props.onRotate()
        }} className="rotate-icon"/>}
    </div>;
  }
}

export default Polygon;
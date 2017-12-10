import React from 'react';
import Polygon from "../components/polygon.jsx";

let shapes = [
  <Polygon points={[[0, 50], [50, 0], [100, 50]]} color="rgb(228,0,123)"/>,
  <Polygon points={[[0, 0], [75, 75], [75, 135], [0, 60]]} color="blue" height="135" width="75"/>,
  <Polygon points={[[0, 0], [60, 0], [60, 60], [0, 60]]} color="red" height="60" width="60"/>,
  <Polygon points={[[0, 60], [60, 0], [60, 60]]} color="red" height="60" width="60"/>,
  <Polygon points={[[0, 0], [120, 120], [0, 120]]} color="orange" height="120" width="120"/>,
  <Polygon points={[[0, 0], [120, 0], [120, 120]]} color="rgb(228,0,123)" height="120" width="120"/>,
  <Polygon points={[[0, 0], [0, 120], [60, 60]]} color="yellow" height="120" width="120"/>,
];

export default { shapes };
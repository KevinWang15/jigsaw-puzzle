import React from 'react';
import calcBoundaries from "../util/calcBoundaries";
let shapes = [
  { points: [[0, 50], [50, 0], [100, 50]], color: "rgb(228,0,123)", height: 50, width: 100 },
  { points: [[0, 0], [75, 75], [75, 135], [0, 60]], color: "blue", height: 135, width: 75 },
  { points: [[0, 0], [60, 0], [60, 60], [0, 60]], color: "red", height: 60, width: 60 },
  { points: [[0, 60], [60, 0], [60, 60]], color: "red", height: 60, width: 60 },
  { points: [[0, 0], [120, 120], [0, 120]], color: "orange", height: 120, width: 120 },
  { points: [[0, 0], [120, 0], [120, 120]], color: "rgb(228,0,123)", height: 120, width: 120 },
  { points: [[0, 0], [0, 120], [60, 60]], color: "yellow", height: 120, width: 60 },
];

let solution = [{ "x": 48, "y": 241 }, { "x": 85, "y": 170 }, { "x": 160, "y": 246 },
  { "x": 160, "y": 186, },
  { "x": 220, "y": 186 }, { "x": 220, "y": 186 }, { "x": 340, "y": 186 }];

let boundaries = calcBoundaries(solution.map((_, index) => ({
  x: _.x,
  y: _.y,
  width: +shapes[index].width,
  height: +shapes[index].height,
})));
solution = solution.map(_ => ({
  x: _.x - boundaries.x,
  y: _.y - boundaries.y,
}));
let dimensions = [boundaries.width, boundaries.height];

export default { shapes, solution, dimensions };
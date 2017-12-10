import React from 'react';
import ReactDOM from 'react-dom';
import fishPuzzle from "./puzzle/fish.jsx";
import Playground from "./components/playground.jsx";
import "./index.css";

let root=document.createElement('div');
root.className='root';
document.body.appendChild(root);
ReactDOM.render(React.createElement(Playground, { puzzle: fishPuzzle }), root);

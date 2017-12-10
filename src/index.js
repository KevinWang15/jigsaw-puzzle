import React from 'react';
import ReactDOM from 'react-dom';
import playground from "./components/playground.jsx";
import "./index.css";

let root=document.createElement('div');
root.className='root';
document.body.appendChild(root);
ReactDOM.render(playground,root);

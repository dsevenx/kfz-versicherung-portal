import React from 'react';
import ReactDOM from 'react-dom';
import reactToWebComponent from 'react-to-webcomponent';
import App from './App';  // Deine bestehende App-Komponente

const MyElement = reactToWebComponent(App, React, ReactDOM, {
  shadow: true,
  props: ['vertrkey'], // Hier definierst du, welche Props übergeben werden sollen
});

console.log("D7X customElements Registering custom element...");
customElements.define('tribemotorakte-react-app', MyElement);
console.log("D7X customElements Registering custom element... END");

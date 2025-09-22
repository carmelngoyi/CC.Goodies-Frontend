import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';

const url = new URL(window.location);
  url.searchParams.set('ip', '54.145.35.219');
  window.history.pushState({}, '', url);


const serverIP = url.searchParams.get('ip');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App serverIP={serverIP}/>
  </StrictMode>,
);
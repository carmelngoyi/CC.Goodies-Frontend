import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom/client';

const compUrl = new URL(window.location);
const url = `http://${compUrl.searchParams.get('ip')}:5000`;
  window.history.pushState({}, '', compUrl);


const serverIP = url.searchParams.get('ip');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App serverIP={serverIP}/>
  </StrictMode>,
);
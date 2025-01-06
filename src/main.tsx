import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import PrivacyPolicy from './components/PrivacyPolicy'
import Impressum from './components/Impressum'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/impressum" element={<Impressum />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
)

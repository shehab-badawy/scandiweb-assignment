// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PLP from './pages/PLP';
import PDP from './pages/PDP'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path="/:category" element={<PLP />} />
        {/* Make sure this path matches what you're navigating to in PLP */}
        <Route path="/product/:id" element={<PDP />} />
      </Routes>
    </Router>
  );
}

export default App;
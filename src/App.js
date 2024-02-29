import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Import your page components
import Home from './Home';
import About from './About';
import Example from './Example';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/example" element={<Example/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
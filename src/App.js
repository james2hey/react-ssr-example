import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import {Home} from "./pages/home";
import {Contact} from "./pages/contact";
import {About} from "./pages/about";
import styled from 'styled-components';

const StyledH1 = styled.h1`
  color: #343030;
  font-size: 64px;
`

function App() {
  return (
    <>
        <StyledH1>Example SSR</StyledH1>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
        </ul>
        <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} />
        </Routes>
    </>
  );
}

export default App;

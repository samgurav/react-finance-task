import React from "react";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
const AddProposedProduct = lazy(() => import("./Components/AddProposedProduct/AddProposedProduct"));

function App() {
  return (
    <div className="App">
      <div className="App">
        <Suspense>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AddProposedProduct />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </div>
    </div>
  );
}

export default App;

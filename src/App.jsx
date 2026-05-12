import { createElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeApp from "./components/EmployeeApp";

function App() {
  return createElement(
    BrowserRouter,
    null,
    createElement(Routes, null,
      createElement(Route, { path: "*", element: createElement(EmployeeApp) })
    )
  );
}

export default App;

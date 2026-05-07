import { createElement } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeApp from "./components/EmployeeApp";
import Landing from "./components/Landing";

function AppRoutes() {
  return createElement(Routes, null,
    createElement(Route, { path: "/", element: createElement(Landing) }),
    createElement(Route, { path: "/:company_slug", element: createElement(EmployeeApp) })
  );
}

function App() {
  return createElement(BrowserRouter, null, createElement(AppRoutes));
}

export default App;

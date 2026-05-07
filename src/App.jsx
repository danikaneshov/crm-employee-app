import { createElement, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import EmployeeApp from "./components/EmployeeApp";
import Landing from "./components/Landing";

const LAST_COMPANY_SLUG_KEY = "last_company_slug";

function LandingOrLastCompany() {
  const savedSlug = typeof window !== "undefined"
    ? window.localStorage.getItem(LAST_COMPANY_SLUG_KEY)
    : null;

  if (savedSlug) {
    return createElement(Navigate, { to: `/${savedSlug}`, replace: true });
  }

  return createElement(Landing);
}

function EmployeeAppWithSlugMemory() {
  const { company_slug: companySlug } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined" && companySlug) {
      window.localStorage.setItem(LAST_COMPANY_SLUG_KEY, companySlug);
    }
  }, [companySlug]);

  return createElement(EmployeeApp);
}

function AppRoutes() {
  return createElement(Routes, null,
    createElement(Route, { path: "/", element: createElement(LandingOrLastCompany) }),
    createElement(Route, { path: "/:company_slug", element: createElement(EmployeeAppWithSlugMemory) })
  );
}

function App() {
  return createElement(BrowserRouter, null, createElement(AppRoutes));
}

export default App;

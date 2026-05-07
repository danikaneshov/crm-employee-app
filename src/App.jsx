import { createElement, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import EmployeeApp from "./components/EmployeeApp";
import Landing from "./components/Landing";

const LAST_COMPANY_SLUG_KEY = "last_company_slug";
const LAST_COMPANY_SLUG_COOKIE = "last_company_slug";

function getCookie(name) {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

function persistLastCompanySlug(slug) {
  if (typeof window === "undefined" || !slug) {
    return;
  }

  window.localStorage.setItem(LAST_COMPANY_SLUG_KEY, slug);
  document.cookie = `${LAST_COMPANY_SLUG_COOKIE}=${encodeURIComponent(slug)}; path=/; max-age=31536000; samesite=lax`;
}

function LandingOrLastCompany() {
  const savedSlug = typeof window !== "undefined"
    ? window.localStorage.getItem(LAST_COMPANY_SLUG_KEY) || getCookie(LAST_COMPANY_SLUG_COOKIE)
    : null;

  if (savedSlug) {
    return createElement(Navigate, { to: `/${savedSlug}`, replace: true });
  }

  return createElement(Landing);
}

function EmployeeAppWithSlugMemory() {
  const { company_slug: companySlug } = useParams();

  useEffect(() => {
    persistLastCompanySlug(companySlug);
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

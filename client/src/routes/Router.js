import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Inicio = lazy(() => import("../views/Inicio.js"));
const About = lazy(() => import("../views/About.js"));
const Inventario = lazy(() => import("../views/ui/Inventario.js"));
const Ventas = lazy(() => import("../views/ui/Ventas.js"));
const Historial = lazy(() => import("../views/ui/Historial.js"));
const Gastos = lazy(() => import("../views/ui/Gastos"));
const Prestamos = lazy(() => import("../views/ui/Prestamos"));
const Informes = lazy(() => import("../views/ui/Informes"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/Inicio" /> },
      { path: "/inicio", exact: true, element: <Inicio /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/inventario", exact: true, element: <Inventario /> },
      { path: "/ventas", exact: true, element: <Ventas /> },
      { path: "/gastos", exact: true, element: <Gastos /> },
      { path: "/prestamos", exact: true, element: <Prestamos /> },
      { path: "/historial", exact: true, element: <Historial /> },
      { path: "/informes", exact: true, element: <Informes /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;

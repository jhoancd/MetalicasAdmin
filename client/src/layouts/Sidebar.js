import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Inicio",
    href: "/inicio",
    icon: "bi bi-house",
  },
  {
    title: "Inventario",
    href: "/inventario",
    icon: "bi bi-archive",
  },
  {
    title: "Ventas",
    href: "/ventas",
    icon: "bi bi-currency-dollar",
  },
  {
    title: "Historial",
    href: "/historial",
    icon: "bi bi-clock-history",
  },
  {
    title: "Gastos",
    href: "/gastos",
    icon: "bi bi-arrow-down",
  },
  /* {
     title: "Informes",
     href: "/Informes",
     icon: "bi bi-file-earmark-text",
   },
    {
      title: "Prestamos",
      href: "/Prestamos",
      icon: "bi bi-bank",
    },
    {
     title: "Forms",
     href: "/forms",
     icon: "bi bi-textarea-resize",
   },
   {
     title: "Breadcrumbs",
     href: "/breadcrumbs",
     icon: "bi bi-link",
   },
   {
     title: "About",
     href: "/about",
     icon: "bi bi-people",
   },*/
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  // const tempReload = () => {
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 1); // 
  // };
  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => { showMobilemenu(); /*tempReload() */ }}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={{ pathname: navi.href }}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }

                onClick={() => { showMobilemenu();/* tempReload()*/ }}
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

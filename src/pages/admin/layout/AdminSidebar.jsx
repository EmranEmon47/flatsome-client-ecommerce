import React, { useState, useEffect } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiUsers,
  FiBox,
  FiGrid,
  FiHome,
  FiFileText,
} from "react-icons/fi";
import { useNavigate, useLocation } from "react-router";
import logo from "../../../assets/logo.png";
import { Link } from "react-router";

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    Products: false,
  });

  useEffect(() => {
    const path = location.pathname.toLowerCase();

    if (path === "/admin") {
      setActiveTab("Dashboard");
      setOpenMenus((prev) => ({ ...prev, Products: false }));
    } else if (path === "/admin/products/add") {
      setActiveTab("AddProduct");
      setOpenMenus((prev) => ({ ...prev, Products: true }));
    } else if (path === "/admin/products/all") {
      setActiveTab("AllProducts");
      setOpenMenus((prev) => ({ ...prev, Products: true }));
    } else if (path.startsWith("/admin/products/update")) {
      setActiveTab("AllProducts");
      setOpenMenus((prev) => ({ ...prev, Products: true }));
    } else if (path === "/admin/users") {
      setActiveTab("Users");
      setOpenMenus((prev) => ({ ...prev, Products: false }));
    } else if (path === "/admin/orders") {
      setActiveTab("Orders");
      setOpenMenus((prev) => ({ ...prev, Products: false }));
    }
  }, [location.pathname, setActiveTab]);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleTabClick = (label) => {
    switch (label) {
      case "Products":
        toggleMenu(label);
        break;
      case "Dashboard":
        setActiveTab("Dashboard");
        navigate("/admin");
        break;
      case "Users":
        setActiveTab("Users");
        navigate("/admin/users");
        break;
      case "Orders":
        setActiveTab("Orders");
        navigate("/admin/orders");
        break;
      case "Shop":
        setActiveTab("Shop");
        window.open("/", "_blank");
        break;
      default:
        break;
    }
  };

  const NavButton = ({
    active,
    icon: Icon,
    label,
    onClick,
    ariaExpanded,
    children,
  }) => (
    <button
      onClick={onClick}
      aria-expanded={ariaExpanded}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400 ${
        active
          ? "bg-gray-700 text-white shadow-md"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon
        className={`text-xl transition-colors duration-300 ${
          active ? "text-white" : "text-gray-600"
        }`}
      />
      {label}
      {children}
    </button>
  );

  const SubMenuButton = ({ active, label, onClick }) => (
    <button
      onClick={onClick}
      className={`text-left px-3 py-1 text-sm rounded-md w-full transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-300 ${
        active
          ? "bg-gray-700 text-white shadow-sm"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {label}
    </button>
  );

  return (
    <aside className="flex flex-col min-h-screen gap-8 p-6 bg-white border-r border-gray-100 w-60">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <Link to="/admin" className="block" aria-label="Admin Dashboard Home">
          <img src={logo} alt="Logo" className="w-44" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavButton
          active={activeTab === "Dashboard"}
          icon={FiGrid}
          label="Dashboard"
          onClick={() => handleTabClick("Dashboard")}
        />

        <div className="flex flex-col">
          <NavButton
            active={activeTab === "AddProduct" || activeTab === "AllProducts"}
            icon={FiBox}
            label="Products"
            onClick={() => handleTabClick("Products")}
            ariaExpanded={openMenus["Products"]}
          >
            {openMenus["Products"] ? (
              <FiChevronUp className="ml-auto" />
            ) : (
              <FiChevronDown className="ml-auto" />
            )}
          </NavButton>

          {openMenus["Products"] && (
            <div className="flex flex-col gap-1 mt-1 ml-8">
              <SubMenuButton
                active={activeTab === "AddProduct"}
                label="➕ Add Product"
                onClick={() => {
                  setActiveTab("AddProduct");
                  navigate("/admin/products/add");
                }}
              />
              <SubMenuButton
                active={activeTab === "AllProducts"}
                label="📦 All Products"
                onClick={() => {
                  setActiveTab("AllProducts");
                  navigate("/admin/products/all");
                }}
              />
            </div>
          )}
        </div>

        <NavButton
          active={activeTab === "Orders"}
          icon={FiFileText}
          label="Orders"
          onClick={() => handleTabClick("Orders")}
        />

        <NavButton
          active={activeTab === "Users"}
          icon={FiUsers}
          label="Users"
          onClick={() => handleTabClick("Users")}
        />

        <NavButton
          active={activeTab === "Shop"}
          icon={FiHome}
          label="Shop"
          onClick={() => handleTabClick("Shop")}
        />
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-3 mt-auto">
        {["⌘", "🌓", "⚙️"].map((icon, idx) => (
          <button
            key={idx}
            className="flex items-center justify-center w-10 h-10 transition-colors border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50"
            aria-label="Footer Icon Button"
          >
            {icon}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;

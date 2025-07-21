// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Layout Components
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";

// Pages
import ItemCategories from "./components/pages/ItemCategories";
import ItemModifiers from "./components/pages/ItemModifiers";
import MenuItems from "./components/pages/MenuItems";
import ModifierGroups from "./components/pages/ModifierGroups";
import AllKitchens from "./components/pages/AllKitchens";
import CategoryReport from "./components/pages/CategoryReport";
import DefaultKitchen from "./components/pages/DefaultKitchen";
import DuePayments from "./components/pages/DuePayments";
import Expenses from "./components/pages/Expenses";
import ExpenseReport from "./components/pages/ExpenseReport";
import InventoryMovements from "./components/pages/InventoryMovements";
import InventoryStocks from "./components/pages/InventoryStocks";
import ItemReport from "./components/pages/ItemReport";
import NonVegKitchen from "./components/pages/NonVegKitchen";
import Payments from "./components/pages/Payments";
import PurchaseOrders from "./components/pages/PurchaseOrders";
import QRCodes from "./components/pages/QRCodes";
import Recipes from "./components/pages/Recipes";
import SalesReport from "./components/pages/SalesReport";
import Settings from "./components/pages/Settings";
import Suppliers from "./components/pages/Suppliers";
import Tables from "./components/pages/Tables";
import Units from "./components/pages/Units";
import VegKitchen from "./components/pages/VegKitchen";
import Areas from "./components/pages/Areas";
import Reports from "./components/pages/Reports";
import Menus from "./components/pages/Menus";
import Reservations from './components/pages/Reservations';
import DeliveryExecutive from "./components/pages/DeliveryExecutive";
import Staff from "./components/pages/Staff";

const ProtectedLayout = ({ sidebarToggle, setSidebarToggle }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebarToggle={sidebarToggle} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        <Dashboard
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
        <div className="p-4">
          <Routes>
            <Route path="/menus" element={<Menus />} />
            <Route path="/item-categories" element={<ItemCategories />} />
            <Route path="/item-modifiers" element={<ItemModifiers />} />
            <Route path="/menu-items" element={<MenuItems />} />
            <Route path="/modifier-groups" element={<ModifierGroups />} />
            <Route path="/all-kitchens" element={<AllKitchens />} />
            <Route path="/default-kitchen" element={<DefaultKitchen />} />
            <Route path="/veg-kitchen" element={<VegKitchen />} />
            <Route path="/nonveg-kitchen" element={<NonVegKitchen />} />
            <Route path="/areas" element={<Areas />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/category-report" element={<CategoryReport />} />
            <Route path="/sales-report" element={<SalesReport />} />
            <Route path="/item-report" element={<ItemReport />} />
            <Route path="/expense-report" element={<ExpenseReport />} />
            <Route path="/due-payments" element={<DuePayments />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/inventory-movement" element={<InventoryMovements />} />
            <Route path="/inventory-stock" element={<InventoryStocks />} />
            <Route path="/purchase-orders" element={<PurchaseOrders />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/units" element={<Units />} />
            <Route path="/qrcodes" element={<QRCodes />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/" element={<h2>Welcome to the Dashboard</h2>} />
             <Route path="/delivery-executive" element={<DeliveryExecutive />} />
             <Route path="/staff" element={<Staff />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        {/* Redirect root based on auth status */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/menus" /> : <Navigate to="/login" />
          }
        />

        {/* Login Page (Public) */}
        <Route path="/login" element={<Login />} />

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <ProtectedLayout
                sidebarToggle={sidebarToggle}
                setSidebarToggle={setSidebarToggle}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

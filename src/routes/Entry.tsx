import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import Repairs from "../pages/Repairs";
import RepairDetail from "../pages/RepairDetail";
import Inventory from "../pages/Inventory";
import Customers from "../pages/Customers";
import Investors from "../pages/Investors";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export default function Entry() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos/sales" element={<Sales />} />
          <Route path="/repairs" element={<Repairs />} />
          <Route path="/repairs/:id" element={<RepairDetail />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/investors" element={<Investors />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}
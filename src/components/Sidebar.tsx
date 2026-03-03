import React from "react";
import { NavItem } from "../types";
import {
  LayoutDashboard,
  Users,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Dumbbell,
  Box,
  Building2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/UI-Components/tooltip";
import { Logo } from "./Logo";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (value: boolean) => void;
}

export function Sidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");
  const userRoleStr = sessionStorage.getItem("userRole");
  const userRole = userRoleStr ? JSON.parse(userRoleStr) : [];

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const navItems: NavItem[] = [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { label: "Members", path: "/members", icon: <Users size={20} /> },
    { label: "Employees", path: "/employees", icon: <Briefcase size={20} /> },
    { label: "Trainers", path: "/trainers", icon: <Dumbbell size={20} /> },
    { label: "Packages", path: "/packages", icon: <Box size={20} /> },
    {
      label: "Company Management",
      path: "/companies",
      icon: <Building2 size={20} />,
    },
  ];

  const sidebarWidth = isCollapsed ? "w-20" : "w-64";

  // Use CSS variable-based colors instead of hardcoded hex values
  const bgClass = "bg-sidebar border-sidebar-border";
  const textClass = "text-sidebar-foreground";
  const hoverClass =
    "hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground";
  const activeClass = "bg-sidebar-foreground/15 text-sidebar-foreground";

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`
          ${bgClass} border-r 
          fixed lg:sticky top-0 h-screen z-50 
          flex flex-col 
          transition-[width,transform,background-color] duration-300 ease-in-out
          ${sidebarWidth}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Brand */}
        <div
          className={`h-16 flex items-center ${isCollapsed ? "justify-center" : "px-6"} border-b border-sidebar-border transition-all duration-300`}
        >
          <Logo
            className={isCollapsed ? "h-8 w-8" : "h-8 w-8"}
            showText={!isCollapsed}
          />
        </div>

        {/* Navigation */}
        <div className="flex-1 flex flex-col py-4 overflow-y-auto overflow-x-hidden">
          <div
            className={`px-3 mb-2 transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}
          >
            <h2
              className={`mb-2 px-4 text-xs font-semibold tracking-tight uppercase opacity-70 ${textClass}`}
            >
              Platform
            </h2>
          </div>

          <nav className="space-y-1 px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              const LinkContent = (
                <Link
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                          group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all
                          ${isActive ? activeClass : `${textClass} opacity-80 ${hoverClass}`}
                          ${isCollapsed ? "justify-center" : ""}
                      `}
                >
                  <span className={`shrink-0 ${!isCollapsed && "mr-3"}`}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </Link>
              );

              return isCollapsed ? (
                <div key={item.path} className="flex justify-center">
                  <Tooltip>
                    <TooltipTrigger asChild>{LinkContent}</TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <React.Fragment key={item.path}>{LinkContent}</React.Fragment>
              );
            })}
          </nav>
        </div>

        {/* Collapse Toggle (Desktop Only) */}
        <div className="hidden lg:flex justify-end p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1 rounded-md opacity-70 transition-colors ${textClass} ${hoverClass} cursor-pointer`}
          >
            {isCollapsed ? (
              <ChevronRight size={16} />
            ) : (
              <ChevronLeft size={16} />
            )}
          </button>
        </div>

        {/* User Info Footer */}
        <div className={`border-t border-sidebar-border p-4 ${bgClass}`}>
          <div
            className={`flex items-center mb-4 ${isCollapsed ? "justify-center" : ""}`}
          >
            <div className="shrink-0">
              <div className="h-9 w-9 rounded-full border border-sidebar-border bg-muted flex items-center justify-center text-xs font-bold">
                {userName?.[0].toUpperCase() || "A"}
              </div>
            </div>
            {!isCollapsed && (
              <div className="ml-3 overflow-hidden">
                <p className={`text-sm font-medium truncate ${textClass}`}>
                  {userName || "Admin User"}
                </p>
                <p
                  className={`text-xs font-medium truncate opacity-70 ${textClass}`}
                >
                  {Array.isArray(userRole)
                    ? userRole.join(", ")
                    : "System Admin"}
                </p>
              </div>
            )}
          </div>

          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center p-2 text-red-400 bg-red-950/20 hover:bg-red-950/40 rounded-md transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">Log out</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 bg-red-950/20 hover:bg-red-950/40 hover:text-red-300 rounded-md transition-colors border border-transparent hover:border-red-900 cursor-pointer"
            >
              <LogOut size={16} className="mr-2" />
              Log out
            </button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}

import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings,
  ChevronLeft,
  ChevronRight 
} from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const adminMenuItems = [
  {
    title: "Tổng quan",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Quản lý người dùng",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Quản lý khóa học",
    url: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Cài đặt",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();

  return (
    <Sidebar
      className="transition-all duration-300"
      collapsible="icon"
    >
      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between px-4 py-2 mb-4">
            {state === "expanded" && (
              <SidebarGroupLabel className="text-lg font-bold text-primary">
                Admin Panel
              </SidebarGroupLabel>
            )}
            <SidebarTrigger className="ml-auto" />
          </div>

          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/admin"}
                      className={({ isActive }) => 
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? "bg-primary text-primary-foreground shadow-md" 
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      {state === "expanded" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
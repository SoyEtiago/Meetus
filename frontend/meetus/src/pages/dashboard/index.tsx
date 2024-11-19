import { AppSidebar } from "@/components/sidebar/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {useAuth} from "../../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const {user} = useAuth();
  const userData = {
      name: user.displayName,
      email: user.email,
      avatar: user.photoURL
  }
  const navigate = useNavigate();

  useEffect(()=> {
    navigate('/dashboard/events')
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar user={userData}/>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard;

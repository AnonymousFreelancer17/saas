import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
 
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { Progress } from "@/components/ui/progress";

// import icons
import {
  FaHouse,
  FaCalendar,
  FaInbox,
  FaGear,
  FaUser,
  FaWallet,
  FaFile,
} from "react-icons/fa6";
 

export function AppSidebar() {
  const items = [
    {
      title: "Dashboard",
      url: "#",
      icon: FaHouse,
    },
    {
      title: "Projects",
      url: "#",
      icon: FaFile,
    },
    {
      title: "Inbox",
      url: "#",
      icon: FaInbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: FaCalendar,
    },
    {
      title: "Profile",
      url: "#",
      icon: FaUser,
    },
    {
      title: "Settings",
      url: "#",
      icon: FaGear,
    },
  ];

  return (
    <Sidebar className="flex flex-col justify-center items-center">
      {/* sidebar Header */}
      <SidebarHeader className="w-full h-[80px] flex flex-row justify-center items-center px-[20px] border-b">
        <div className="flex-1">Logo</div>
        <div>
          <ModeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent className="">
        {/*  links menu */}

        <SidebarMenu
          className="flex-1 flex flex-col justify-start
         items-center pt-[20px]"
        >
          {items.map((item) => (
            <SidebarMenuItem
              key={item.title}
              className="w-10/12 h-[60px] flex justify-center items-center"
            >
              <SidebarMenuButton className=" h-full" asChild>
                <a href={item.url}>
                  <item.icon />
                  <p className="flex-1">{item.title}</p>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/*  footer */}
      <SidebarFooter className="h-[150px] w-full flex justify-center items-center border-t">
        <div className="w-10/12 h-[40px] flex justify-start items-center">
          <FaWallet color="" />
          <p className="ms-2">Free Plan</p>
        </div>
        <div className="w-10/12 flex flex-col justify-center items-center">
          <div className="w-full flex justify-between items-center">
            <p className="font-medium">Projects</p>

            <p className="font-light text-gray-500 text-sm">4 / 10</p>
          </div>

          <div className="w-full h-[20px] flex justify-center items-center">
            <Progress value={40} />
          </div>

          <div className="w-full flex justify-between items-center">
            <p className="font-medium">Tasks</p>

            <p className="font-light text-gray-500 text-sm">Unlimited</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

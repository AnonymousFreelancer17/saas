import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  const footerElements = [
    {
      title: "Company",
      link_title: [
        "Careers",
        "Events",
        "Blogs",
        "Investor Relations",
        "Atlassian Foundation",
        "Contact us",
      ],
    },
    {
      title: "Products",
      link_title: [
        "Rovo",
        "Jira",
        "Jira Align",
        "Jira Service Management",
        "Confluence",
        "Trello",
        "Bitbucket",
      ],
      btn: "See all products",
    },
    {
      title: "Resources",
      link_title: [
        "Technical support",
        "Purchasing & licensing",
        "Marketplace",
        "Knowledge base",
        "My account",
      ],
      btn: "Create support ticket",
    },

    {
      title: "Learn",
      link_title: [
        "Partners",
        "Training & certification",
        "Documentation",
        "Developer resources",
        "Enterprise services",
      ],
      btn: "See all resources",
    },
  ];

  return (
    <div className="w-screen h-[50vh] flex flex-col justify-center items-center">

         <header className="w-full flex justify-between items-center">
             <div>
                Logo
             </div>
         </header>

        <div className="lg:w-10/12 md:w-11/12 w-full flex justify-evenly items-center">
          {footerElements?.map((d,index)=>{
            return <div key={index} className="w-1/5">
 
                           <div className="font-semibold">
                                {d.title}
                           </div>

         
                    </div>
          })}
        </div>

        <footer  className="w-full flex flex-col justify-center items-center">
             <div className="text-center text-xs ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur laudantium error nostrum.
             </div>

             <div>
               <Button variant={"ghost"} className="cursor-pointer">
                Privacy Policy
               </Button>
             </div>
        </footer>
    </div>
  );
};

export default Footer;

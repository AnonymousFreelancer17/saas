"use client";

import Footer from "@/components/Footer/Footer";
import ScrollabeDiv from "@/components/ScrollabeDiv";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Index = () => {
  const { user } = useUser();
  const [selectedVideo, setSelectedVideo] = useState(0);

  const solutions = [
    {
      title: "Software",
      description:
        "Build, deploy, and manage applications using cutting-edge technologies.",
      icon: "https://dam-cdn.atl.orangelogic.com/AssetLink/y78pxiri4im6b485s60361vjjgttjq60.svg",
      image: "/images/software.jpg",
      video: "../public/videos/4985367-uhd_3840_2160_25fps.mp4",
    },
    {
      title: "Product Management",
      description:
        "Plan, prioritize, and deliver features efficiently across teams.",
      icon: "https://dam-cdn.atl.orangelogic.com/AssetLink/y78pxiri4im6b485s60361vjjgttjq60.svg",
      image: "/images/product.jpg",
      video: "../public/videos/4985367-uhd_3840_2160_25fps.mp4",
    },
    {
      title: "Marketing",
      description:
        "Run and analyze campaigns to grow your brand and engage your audience.",
      icon: "https://dam-cdn.atl.orangelogic.com/AssetLink/y78pxiri4im6b485s60361vjjgttjq60.svg",
      image: "/images/marketing.jpg",
      video: "../public/videos/4985367-uhd_3840_2160_25fps.mp4",
    },
    {
      title: "Project Management",
      description:
        "Track progress, deadlines, and deliverables for every project.",
      icon: "https://dam-cdn.atl.orangelogic.com/AssetLink/y78pxiri4im6b485s60361vjjgttjq60.svg",
      image: "/images/project.jpg",
      video: "../public/videos/4985367-uhd_3840_2160_25fps.mp4",
    },
    {
      title: "Design",
      description: "Create user-centric interfaces with modern design tools.",
      icon: "https://dam-cdn.atl.orangelogic.com/AssetLink/y78pxiri4im6b485s60361vjjgttjq60.svg",
      image: "/images/design.jpg",
      video: "../public/videos/4985367-uhd_3840_2160_25fps.mp4",
    },
    {
      title: "CRM",
      description:
        "Manage customer relationships, sales pipelines, and support channels.",
      icon: "https://dam-cdn.atl.orangelogic.com/AssetLink/y78pxiri4im6b485s60361vjjgttjq60.svg",
      image: "/images/crm.jpg",
      video: "../public/videos/4985367-uhd_3840_2160_25fps.mp4",
    },
  ];

  return (
    <>
      <section className="w-screen h-auto flex flex-col justify-center items-center mt-[100px]">
        <div className="w-screen h-[30vh] flex flex-col justify-center items-center">
          <p className="w-[400px] text-3xl text-center">
            The <strong className="font-bold text-4xl">Giiti</strong> : provides
            the solutions to your needs!
          </p>
          <Link
            href={user ? "/dashboard" : "/sign-in"}
            className="bg-blue-500 text-white px-4 py-2 rounded-full my-4"
          >
            Get Started
          </Link>
        </div>

        {/* solutions */}
        <ScrollabeDiv>
          {solutions?.map((d, index) => {
            return (
              <Button
                key={index}
                variant={"outline"}
                className={`w-[200px] h-[200px] flex flex-col justify-center items-center m-2 cursor-pointer outline-1 border select-none ${
                  index === selectedVideo && "border-black"
                }  `}
                onClick={() => {
                  setSelectedVideo(index);
                }}
              >
                <Image
                  src={d.icon}
                  alt={d.title}
                  height={0.8}
                  width={1}
                  priority={true}
                  className="flex-1 w-full select-none"
                />
                <p className="w-full h-1/2 flex justify-center items-center">
                  {d.title}
                </p>
              </Button>
            );
          })}
        </ScrollabeDiv>

        <div className="flex justify-center items-center h-[60vh] w-full relative">
          {/* render videos */}
          <div className="absolute z-10 lg:w-[60%] md:w-[80%] w-[95%] h-[80%] bg-white flex justify-center items-center">
            {solutions
              ?.slice(selectedVideo, selectedVideo + 1)
              .map((d, index) => {
                return (
                  <div key={index} className="">
                    <p className="text-red-400 text-2xl z-50">
                      {selectedVideo}
                    </p>
                    <video
                      src={d.video}
                      className="bg-gray-100 w-1/2 h-auto"
                      autoPlay
                      loop
                      controls
                    ></video>
                  </div>
                );
              })}
          </div>

          <div>{/* Vector */}</div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Index;

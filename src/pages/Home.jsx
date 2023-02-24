import React from "react";
import Chart from "../components/Chart";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewestUsers from "../components/NewestUsers";
import Sidebar from "../components/Sidebar";
import TopProducts from "../components/TopProducts";
import Widget from "../components/Widget";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex relative w-screen">
        <Sidebar />
        <div className=" w-full reltive pl-52 pt-24 justify-center ">
          <div className="w-full flex  ">
            <Widget />
            <Chart />
          </div>
          <div className="h-24 w-full bg-gradient-to-t  from-gray-200 "></div>
          <div className="flex w-full px-4  bg-gray-200 ">
            <div className="flex-1">
              <NewestUsers />
            </div>
            <div className="flex-1 ">
              <TopProducts />
            </div>
          </div>
        </div>
      </div>
      <div className="h-24 w-full bg-gradient-to-b  from-gray-200 to-base-200"></div>
      <Footer />
    </>
  );
};

export default Home;

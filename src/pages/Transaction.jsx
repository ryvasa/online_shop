import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Transaction = () => {
  return (
    <>
      <Navbar />
      <div className="flex relative">
        <Sidebar />

        <div className="flex-3 w-full pt-20 pl-56 flex-col pr-3 justify-center ">
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="text-center"></th>
                  <th className="text-center">Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Sold</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center text-xl ">1</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-2@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    Zemlak, Daniel and Leannon
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td className="text-center">Purple</td>
                  <th className="text-center">
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                <tr>
                  <td className="text-center text-xl ">2</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-3@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Brice Swyre</div>
                        <div className="text-sm opacity-50">China</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    Carroll Group
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Tax Accountant
                    </span>
                  </td>
                  <td className="text-center">Red</td>
                  <th className="text-center">
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                <tr>
                  <td className="text-center text-xl ">3</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-4@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Marjy Ferencz</div>
                        <div className="text-sm opacity-50">Russia</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    Rowe-Schoen
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Office Assistant I
                    </span>
                  </td>
                  <td className="text-center">Crimson</td>
                  <th className="text-center">
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
                <tr>
                  <td className="text-center text-xl ">4</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src="/tailwind-css-component-profile-5@56w.png"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Yancy Tear</div>
                        <div className="text-sm opacity-50">Brazil</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    Wyman-Ledner
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Community Outreach Specialist
                    </span>
                  </td>
                  <td className="text-center">Indigo</td>
                  <th className="text-center">
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Transaction;

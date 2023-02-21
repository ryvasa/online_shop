import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import Notfound from "./Notfound";

export const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const cancelButtonRef = useRef(null);

  return (
    <>
      <Navbar />
      {user ? (
        <>
          <div className="text-md pl-3 breadcrumbs pt-20  font-bold">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>Profile</li>
            </ul>
          </div>
          <div className="constainer max-w-full ">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg pb-10 lg:flex px-3 lg:min-h-screen">
              <div className="px-4 py-5 sm:px-6 border p-5 rounded-xl  border-gray-200 m-5 flex-1">
                <div className="max-w-full rounded-full flex justify-center">
                  <img
                    className="inline-block w-96 ring-2 ring-white"
                    src={
                      user.img
                        ? user.img
                        : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="border p-5 rounded-xl  border-gray-200 m-5 flex-1">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Username
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user.username}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user._id}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user.email}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {user.phone}
                    </dd>
                  </div>
                </dl>
                <Link
                  to={"/editprofile"}
                  className="flex max-w-full pt-12 justify-start"
                >
                  <button className="btn btn-primary text-white mt-1 max-w-2xl text-sm ">
                    Edit profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Notfound />
      )}
      <Footer />
    </>
  );
};

export default Profile;

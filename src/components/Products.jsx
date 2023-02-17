import { FaAngleRight, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/apiCalls";

export const Products = () => {
  const dispatch = useDispatch();

  const productsObject = useSelector((state) => state.product.products);
  const productsArray = Object.values(productsObject);

  const products = productsArray
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  return (
    <>
      <div className="bg-slate-100 pt-4">
        <div className="mx-auto max-w-2xl px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>
          <div className="max-w-full flex justify-end mb-5">
            <Link to={"/products"} className=" flex  items-center text-end">
              Show all products
              <FaAngleRight />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group  shadow-xl relative bg-white rounded-md "
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.img[3]}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className=" max-w-full   rounded-xl">
                  <div className="flex justify-center items-center w-full">
                    <span>{product.productName}</span>
                  </div>
                  <div className="flex w-full justify-center px-2 py-3">
                    <Link
                      to={`/products/${product._id}`}
                      className="btn btn-primary w-full "
                    >
                      <button className="flex w-3/4  gap-x-2 justify-center items-center  ">
                        <FaEye /> Show detail
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Products;

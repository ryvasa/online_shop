import { useEffect } from "react";
import { FaAngleLeft, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { getProducts } from "../redux/apiCalls";

export const Products = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);
  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pl-5 max-w-full">
        <div className="mx-auto max-w-2xl  px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <Link to={"/"} className="mb-4 flex  items-center">
            <FaAngleLeft />
            Home
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Customers also purchased
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="group relative shadow-lg p-2 rounded-lg"
              >
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.img[3]}
                    alt=""
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`/products/${product._id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.productName}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.colors}
                    </p>
                  </div>

                  <p className="text-xl font-medium text-gray-900 mb-2">
                    ${product.price}
                    <FaShoppingCart />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Products;

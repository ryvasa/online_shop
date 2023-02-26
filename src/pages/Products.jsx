import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaShoppingCart, FaSort } from "react-icons/fa";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const size = [
  { value: "XXS", name: "XXS" },
  { value: "XS", name: "XS" },
  { value: "S", name: "S" },
  { value: "M", name: "M" },
  { value: "L", name: "L" },
  { value: "XL", name: "XL" },
  { value: "XXL", name: "XXL" },
];
const color = [
  { value: "red", name: "Red" },
  { value: "blue", name: "Blue" },
  { value: "brown", name: "Brown" },
  { value: "black", name: "Black" },
  { value: "green", name: "Green" },
  { value: "yellow", name: "Yellow" },
  { value: "pink", name: "Pink" },
];
const category = [
  { value: "women", name: "Women" },
  { value: "men", name: "Men" },
  { value: "casual", name: "Casual" },
  { value: "tshirt", name: "Tshirt" },
  { value: "jacket", name: "Jacket" },
  { value: "shoes", name: "Shoes" },
  { value: "dress", name: "Dress" },
];

export default function Example() {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([""]);
  const [colors, setColors] = useState([""]);
  const [categories, setCategories] = useState([""]);
  const [sort, setSort] = useState("");

  const filter = [...sizes, ...colors, ...categories, ...sort];

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          filter.length !== 0
            ? `http://localhost:5000/products?category=${categories}&size=${sizes}&color=${colors}&sort=${sort}`
            : `http://localhost:5000/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [sort, categories, colors, sizes]);
  console.log(products);
  return (
    <>
      <Navbar />
      <>
        <div className="text-md pl-3 breadcrumbs pt-20 ">
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Products List</li>
          </ul>
        </div>
        <div className="bg-white">
          <div>
            <main className="">
              <div className="flex  justify-between items-center  ">
                <h1 className="text-4xl pl-4 font-bold tracking-tight text-gray-900">
                  New Arrivals
                </h1>
                <div className="flex justify-end">
                  <div className="filter border my-7 px-3 rounded-lg flex items-center justify-center">
                    <FaFilter className="h-5 w-5" />

                    {/* Filters */}
                    <select
                      onChange={(e) => setSizes(e.target.value)}
                      className="p-2 border-none bg-white "
                    >
                      <option disabled selected>
                        Sizes
                      </option>
                      {size.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => setColors(e.target.value)}
                      className="p-2 border-white bg-white "
                    >
                      <option disabled selected>
                        Colors
                      </option>

                      {color.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={(e) => setCategories(e.target.value)}
                      className="p-2 border-white bg-white "
                    >
                      <option disabled selected>
                        Categories
                      </option>
                      {category.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block text-left">
                      <div className="m-8">
                        <div className="flex justify-center items-center">
                          <FaSort />
                          <select
                            onChange={(e) => setSort(e.target.value)}
                            className="p-2 border-white bg-white "
                          >
                            <option disabled selected>
                              Sort by
                            </option>

                            <option value={"newest"}>Newest</option>
                            <option value={"highest_price"}>High Price </option>
                            <option value={"lowest_price"}>Low Price</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white pl-5 max-w-full py-5">
                <div className="mx-auto max-w-full px-4  sm:px-6  lg:px-8">
                  <div className=" grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                      <div
                        key={product._id}
                        className="group relative shadow-lg p-2 rounded-lg"
                      >
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                          <img
                            src={product.img}
                            alt=""
                            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <Link to={`/products/${product._id}`}>
                                <span
                                  aria-hidden="true"
                                  className="absolute inset-0"
                                />
                                {product.productName}
                              </Link>
                            </h3>
                            <div className="flex">
                              {product.colors.map((color, index) => (
                                <div
                                  style={{ backgroundColor: color }}
                                  className="mt-1 w-5 h-5 rounded-full  ml-1 shadow-lg  text-sm text-gray-500"
                                ></div>
                              ))}
                            </div>
                          </div>

                          <p className="text-xl font-medium text-gray-900 mb-2">
                            $ {product.price}
                            <FaShoppingCart />
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

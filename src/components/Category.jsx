import React from "react";
import image1 from "../img/fashionable-charming-girl-checkered-dress-laughing-red-wall-photo-female-model-wearing-heart-shaped-glasses-wicker-bag.jpg";
import image2 from "../img/magnificent-woman-long-bright-skirt-dancing-studio-carefree-inspired-female-model-posing-with-pleasure-yellow.jpg";
import image3 from "../img/fashionable-model-stylish-hat-red-coat-boots-posing-white-wall-studio.jpg";

const callouts = [
  {
    productName: "Jacket",
    desc: "Work from home accessories",
    img: image1,
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    productName: "Hat",
    desc: "Journals and note-taking",
    img: image3,
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    productName: "Dress",
    desc: "Daily commute essentials",
    img: image2,
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];

export const Category = () => {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-10 sm:py-10 lg:max-w-none lg:py-20">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.productName} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.img}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.productName}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;

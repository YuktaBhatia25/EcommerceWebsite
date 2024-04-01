import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components";
import HeroImage from "../../../assets/hero.avif";


export const Hero = () => {
  return (
    <section className="bg-white mx-auto  py-4 px-8 dark:bg-slate-800 flex justify-between items-center">
    <div className="lg:py-16 mr-10">
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Why Planting with Us?
      </h1>
      <p className="mb-2 text-lg font-normal text-gray-500 dark:text-slate-200 text-justify">
      In addition to bringing you close to nature, Kyari helps you enjoy a premium lifestyle through plants and planters! We have got you covered with a wide range of captivating indoor plants, and elegant planters that are sure to revive your living space. We ensure to utilize the best quality material for all our planters, and our plants are homegrown. we have given them some special care and attention, and we're sure you'll do it too! When it comes to bringing some refreshing, positive vibes to your home, these extraordinary collections can change the look and feel of any space, be it your home or office. Moreover, this exciting range of plants and planters can be a perfect choice to present as a gift to any of your near and dear ones. Explore this exciting range now!
      </p>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <Link to="#">
          <Button>
            Products
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
    <div>
      <img src={HeroImage} alt="Plant" className="rounded-lg" />
    </div>
  </section>
);

};

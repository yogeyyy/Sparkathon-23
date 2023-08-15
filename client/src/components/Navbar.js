// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const navLinks = document.querySelector(".nav-links");
//   function onToggleMenu(e) {
//     e.name = e.name === "menu" ? "close" : "menu";
//     navLinks.classList.toggle("top-[9%]");
//   }
//   return (
//     <header class="bg-yellow-400">
//       <nav class="flex justify-between items-center w-[92%]  mx-auto">
//         <div>
//           <a class="w-16 cursor-pointer" />
//           WallMart
//           <a />
//         </div>
//         <div class="nav-links duration-500 md:static absolute bg-yellow-400 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
//           <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
//             <li>
//               <a class="hover:text-gray-500" href="#">
//                 Products
//               </a>
//             </li>
//             <li>
//               <a class="hover:text-gray-500" href="#">
//                 Solution
//               </a>
//             </li>
//             <li>
//               <a class="hover:text-gray-500" href="#">
//                 Resource
//               </a>
//             </li>
//             <li>
//               <a class="hover:text-gray-500" href="#">
//                 Developers
//               </a>
//             </li>
//             <li>
//               <a class="hover:text-gray-500" href="#">
//                 Pricing
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div class="flex items-center gap-6">
//           <button class="bg-[#0271CE] text-white hover:text-black px-5 py-2 rounded-full hover:bg-[#3B94DE] ">
//             Sign in
//           </button>
//           <ion-icon
//             onclick="onToggleMenu(this)"
//             name="menu"
//             class="text-3xl cursor-pointer md:hidden"
//           ></ion-icon>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Navbar;
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarBackground, setNavbarBackground] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setNavbarBackground(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [showMenu, setShowMenu] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  // const userData = useSelector((state) => state.user);
  // console.log(userData);
  // const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };

  const handleShowLinks = () => {
    setShowLinks((preve) => !preve);
  };

  // const handleLogout = () => {
  //   dispatch(logoutRedux());
  //   dispatch(emptyCart());
  //   toast("Logged out Successfully!");
  // };

  // const cartItemNumber = useSelector((state) => state.product.cartItem);

  const scrollToReviews = () => {
    scroll.scrollTo("reviews", {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <header
      className={`fixed w-full h-10 sm:h-16 md:h-20 px-4 z-50 ${
        navbarBackground ? "bg-yellow-200" : "bg-yellow-400"
      }`}
    >
      <div className="flex sm:justify-between md:justify-center h-full w-full">
        {/* Desktop */}
        <nav className="hidden md:flex items-center justify-center md:space-x-8 lg:space-x-20 xl:space-x-20">
          <Link to={""} className="md:text-xl xl:text-xl font-bold">
            WallMart
          </Link>

          <form>
            <div class="flex">
              <label
                for="search-dropdown"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Your Email
              </label>
              <button
                id="dropdown-button"
                data-dropdown-toggle="dropdown"
                class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                All categories{" "}
                <svg
                  class="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  class="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li>
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mockups
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Templates
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Design
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Logos
                    </button>
                  </li>
                </ul>
              </div>
              <div class="relative w-full">
                <input
                  type="search"
                  id="search-dropdown"
                  class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos, Design Templates..."
                  required
                />
                <button
                  type="submit"
                  class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span class="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          <Link
            to={"/clothing"}
            className="font-poppins md:text-xs xl:text-sm font-semibold"
          >
            clothing
          </Link>
          <ScrollLink
            to={"contact"}
            smooth
            duration={800}
            className="font-poppins md:text-xs xl:text-sm font-semibold cursor-pointer"
            onClick={scrollToReviews}
          >
            Contact{" "}
          </ScrollLink>
          <Link
            to={"/reviews"}
            className="font-poppins md:text-xs xl:text-sm font-semibold"
          >
            Reviews
          </Link>
          <Link
            to={"shop/Cakes"}
            className="font-poppins md:text-xs xl:text-sm font-semibold"
          >
            Shop
          </Link>
          <Link
            to={"customize"}
            className="font-poppins md:text-xs xl:text-sm font-semibold"
          >
            Customize
          </Link>
          <div className="flex items-center space-x-4">
            <div>
              <Link to={"cart"}></Link>
            </div>
            <div onClick={handleShowMenu}>
              <div className="cursor-pointer rounded-full overflow-hidden drop-shadow-md"></div>

              {showMenu && (
                <div className="absolute bg-white py-2 px-2 shadow drop-shadow-md flex flex-col"></div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile */}
        <nav className="flex flex-row justify-between items-center md:hidden w-full">
          <div className="w-20"></div>
          {showLinks && (
            <div className="md:hidden absolute top-0 left-0 min-h-screen min-w-[50%] sm:min-w-[30%] bg-white shadow drop-shadow-md flex flex-col">
              {/* Navigation links */}
              <div className="h-12 sm:h-16 flex items-center px-4 border-b"></div>
              <div className="flex flex-col ">
                <Link
                  to={"aboutus"}
                  className="font-poppins font-semibold uppercase py-2 px-4 border-b"
                  onClick={handleShowLinks}
                >
                  About us
                </Link>
                <ScrollLink
                  to="contact"
                  smooth
                  duration={800}
                  className="font-poppins py-2 px-4 font-semibold uppercase cursor-pointer border-b"
                  onClick={scrollToReviews}
                >
                  Contact{" "}
                </ScrollLink>
                <Link
                  to={"/reviews"}
                  className="font-poppins py-2 px-4 font-semibold uppercase border-b"
                  onClick={handleShowLinks}
                >
                  Reviews
                </Link>
                <Link
                  to={"shop/Cakes"}
                  className="font-poppins py-2 px-4 font-semibold uppercase border-b"
                  onClick={handleShowLinks}
                >
                  Shop
                </Link>
                <Link
                  to={"customize"}
                  className="font-poppins py-2 px-4 font-semibold uppercase border-b"
                  onClick={handleShowLinks}
                >
                  Customize
                </Link>
              </div>
            </div>
          )}
          <div className="h-12 sm:h-16">
            <Link to={""} className="">
              <img
                src="{BrandLogo}"
                alt="Bhavna's Piece Of Cake"
                className="h-full"
              />
            </Link>
          </div>

          <div className="flex items-center justify-end w-20  ">
            <div>
              <Link to={"cart"}></Link>
            </div>
            <div onClick={handleShowMenu}>
              <div className="cursor-pointer rounded-full overflow-hidden drop-shadow-md"></div>

              {showMenu && (
                <div className="absolute right-2 mt-3 sm:mt-4 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col"></div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;

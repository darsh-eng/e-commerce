'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../public/images/freshcart-logo.svg';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '@/context/CartContext';

export default function Navbar() {
  const cartContext = useContext(CartContext);
  const numberOfCartItem = cartContext?.numberOfCartItem ?? 0;
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    import('flowbite').then((mod: { initFlowbite?: () => void }) => {
      if (typeof mod?.initFlowbite === 'function') {
        mod.initFlowbite();
      }
    });
  }, []);

  function Logout() {
    signOut({ callbackUrl: '/login' });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="shadow-lg border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container w-full flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse group transition-transform duration-300 hover:scale-105"
        >
          <Image
            src={logo}
            alt="FreshCart Logo"
            className="h-10 w-auto transition-all duration-300 group-hover:brightness-110"
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          aria-controls="navbar-mobile"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-1">
          <ul className="flex font-medium space-x-1">
            <li>
              <Link
                href="/"
                className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
              >
                <span className="relative z-10">
                  <i className="fa-solid mr-2 fa-house"></i>Home
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
              >
                <span className="relative z-10">
                  <i className="fa-solid mr-2 fa-box"></i>Products
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            </li>

            <li>
              <Link
                href="/categories"
                className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
              >
                <span className="relative z-10">
                  <i className="fa-solid mr-2 fa-list"></i>Categories
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            </li>

            <li>
              <Link
                href="/brands"
                className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
              >
                <span className="relative z-10">
                  <i className="fa-solid mr-2 fa-tag"></i>Brands
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            </li>

            {session && (
              <>
                <li>
                  <Link
                    href="/cart"
                    className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
                  >
                    <span className="relative z-10 flex items-center">
                      <i className="fas fa-shopping-cart mr-2"></i>
                      Cart
                      {numberOfCartItem > 0 &&<span
                        className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center 
                   rounded-full bg-red-600 text-white text-xs font-bold 
                   shadow-lg border-2 border-white dark:border-gray-900
                   animate-pulse"
                      > 
                        {numberOfCartItem}
                      </span>}
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/wishlist"
                    className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
                  >
                    <span className="relative z-10">
                      <i className="fa-solid mr-2 fa-heart"></i>Wishlist
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/orders"
                    className="relative block py-3 px-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 group"
                  >
                    <span className="relative z-10">
                      <i className="fa-solid mr-2 fa-receipt"></i>Orders
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Right Side - Social & Auth */}
        <div className="flex items-center gap-3">
          {/* Social Media Icons */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="#"
              className="text-gray-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-110"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram text-xl"></i>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook text-xl"></i>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-black transition-all duration-300 transform hover:scale-110"
              aria-label="TikTok"
            >
              <i className="fa-brands fa-tiktok text-xl"></i>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-twitter text-xl"></i>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-blue-700 transition-all duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin text-xl"></i>
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube text-xl"></i>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {!session ? (
              <>
                <Link
                  href="/login"
                  className="group relative px-6 py-2.5 cursor-pointer text-gray-700 hover:text-white transition-all duration-300 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 font-semibold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    Login
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
                <Link
                  href="/register"
                  className="group relative px-6 py-2.5 cursor-pointer text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <i className="fas fa-user-plus mr-2"></i>
                    Register
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <span className="text-gray-700 font-medium">
                    Hi, <span className="text-blue-600 font-semibold">{session?.user.name}</span>
                  </span>
                </div>
                <button
                  onClick={Logout}
                  className="group relative px-4 py-2.5 cursor-pointer text-red-600 hover:text-white transition-all duration-300 rounded-xl border-2 border-red-200 hover:border-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 font-semibold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Sign Out
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className={`w-full md:hidden transition-all duration-300 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-mobile"
        >
          <div className="bg-white border border-gray-200 rounded-xl shadow-lg mt-4 p-4 space-y-2">
            <Link
              href="/"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-home mr-3"></i>Home
            </Link>

            <Link
              href="/products"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-box mr-3"></i>Products
            </Link>

            <Link
              href="/categories"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-tags mr-3"></i>Categories
            </Link>

            <Link
              href="/brands"
              className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-star mr-3"></i>Brands
            </Link>

            {session && (
              <>
                <Link
                  href="/cart"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-shopping-cart mr-3"></i>Cart
                </Link>
                <Link
                  href="/orders"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-receipt mr-3"></i>Orders
                </Link>
                <Link
                  href="/wishlist"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fas fa-heart mr-3"></i>Wishlist
                </Link>
              </>
            )}

            <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
              <Link href="#" className="text-gray-400 hover:text-pink-500 transition-all duration-300">
                <i className="fa-brands fa-instagram text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-600 transition-all duration-300">
                <i className="fa-brands fa-facebook text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-black transition-all duration-300">
                <i className="fa-brands fa-tiktok text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300">
                <i className="fa-brands fa-twitter text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-700 transition-all duration-300">
                <i className="fa-brands fa-linkedin text-xl"></i>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-red-600 transition-all duration-300">
                <i className="fa-brands fa-youtube text-xl"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

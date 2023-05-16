import { MenuIcon, UserCircleIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import Link from "next/link";
function Header() {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white py-5 px-5 md:px-10">
      <Link data-trstid="logo-link" href={{ pathname: "/" }}>
        <div className="relative flex items-center h-10 cursor-pointer my-auto">
          <img src="logo-study.png" width="100px" alt="StudyLab logo" />
        </div>
      </Link>
      <div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={"Start your search"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>
      <div className="flex items-center space-x-4 justify-end text-gray-600">
        <Link data-testid="courses-link" href={{ pathname: "/courses" }}>
          {/* <Link data-testid="courses-link" href="/courses"> */}
          <p className="hidden md:inline cursor-pointer text-lg">Courses</p>
        </Link>
        <div className=" flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon data-testid="menu-icon" className="h-6" />
          <UserCircleIcon data-testid="user-icon" className="h-6" />
        </div>
      </div>
    </header>
  );
}
export default Header;

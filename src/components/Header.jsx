"use client";
import React from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";
import useAuth from "@/hook/useAuth";
import { app } from "../../firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import { buttonVariants } from "./ui/button";
const Header = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [user] = useAuth();
  const pathname = usePathname();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      router.push("/user/login");
    });
  };

  return (
    <div className="sticky top-0">
      <div className=" font z-50  bg-[#fbfbfb]  mb-4 inset-x-0 lg:px-20 mx-4 border-o border-b">
        <div className="flex items-center h-16  justify-between">
          <div className="flex items-center">
            <div className="flex ">
              <Link
                href={"/"}
                className={`${pathname === "/" ? "text-red-600" : ""} mr-4`}
              >
                Home
              </Link>
              <Link
                href={"/customer"}
                className={`${
                  pathname === "/customer" ? "text-red-600" : ""
                } mr-4`}
              >
                Customer
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end">
              {user ? (
                <div
                  onClick={handleLogOut}
                  className="flex items-center text-sm cursor-pointer"
                >
                  <LogOut size={14} className="mr-1" />
                </div>
              ) : (
                <div>
                  <Link
                    className={`${buttonVariants({
                      variant: "ghost",
                    })} rounded-lg text-sm border`}
                    href="/user/login"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div>
        {pathname === "/all-user" || pathname === "/customer" ? (
          ""
        ) : (
          <div className="text-right text-[10px]">
            {user ? (
              <Link
                href={"/all-user"}
                className={`${buttonVariants()} mx-10 font text-[10px] w-40`}
              >
                All log users
              </Link>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

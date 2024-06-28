"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../../../../firebase.config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    // Sign In With Firebase
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      // Update Name with Firebase

      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      const userInformation = {
        name,
        email,
        password,
      };

      // After Created User, Data Save to MongoDB

      const res = await fetch("https://fahim-vaiya-task.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInformation),
      });

      if (!res.ok) {
        throw new Error("Failed to Create User");
      } else {
        await res.json();
        router.push("/");
      }
    } catch (error) {
      console.error("Error during user creation:", error);
      toast.error(error.message || "Failed to Create User");
    }
  };

  return (
    <div className="container font relative flex flex-col pt-20 justify-center items-center lg:px-0">
      <div className="w-full mx-auto flex flex-col justify-center space-y-6 sm:w-[350px] ">
        {/* Image And Text One */}

        <div className="flex flex-col items-center ">
          <h1 className="text-2xl -bold ">Create your account</h1>
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            href="/user/login"
          >
            Already have an account? login
            <ArrowRight className="w-3 ml-0.5" />
          </Link>
        </div>

        {/* Form */}

        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="name">Username</Label>
              <Input
                {...register("name", { required: true })}
                className="mt-2"
                placeholder="Your Name"
              />
              <p className=" mt-1 text-[10px] text-red-600">
                {errors.name?.type === "required" && (
                  <span role="alert">name is required</span>
                )}
              </p>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                className="mt-2"
                placeholder="You@example.com"
              />
              <p className=" mt-1 text-[10px] text-red-600">
                {errors.email?.type === "required" && (
                  <span role="alert">
                    email is required | you can&apos;t leave empty
                  </span>
                )}
              </p>
            </div>

            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "password must be 8 characters",
                  },
                })}
                className="mt-2"
                placeholder="Password"
              />
              <p className=" text-[12px] mt-2 text-red-600">
                {errors.password?.message}
              </p>
            </div>
            <Button className="w-full mt-6">register</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

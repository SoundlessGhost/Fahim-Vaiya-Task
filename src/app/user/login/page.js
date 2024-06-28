"use client";
import { Suspense } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { app } from "../../../../firebase.config";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginComponent />
    </Suspense>
  );
};

const LoginComponent = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    // Sign In With Firebase
    try {
      const signInRes = await signInWithEmailAndPassword(auth, email, password);

      if (signInRes?.user?.email) {
        router.push(callbackUrl);
      }
    } catch (error) {
      toast.error("You don't have an account try again");
    }
  };

  return (
    <div className="container relative flex flex-col pt-20 justify-center items-center lg:px-0">
      <div className="w-full mx-auto flex flex-col justify-center space-y-6 sm:w-[350px] ">
        {/* Image And Text One */}
        <div className="flex flex-col items-center ">
          <h1 className="text-2xl font-bold font ">Welcome Back</h1>
          <Link
            className={buttonVariants({
              variant: "link",
            })}
            href="/user/register"
          >
            Don&apos;t have an account? register
            <ArrowRight className="w-3 ml-0.5" />
          </Link>
        </div>

        {/* Form */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email", { required: true })}
                className="mt-2"
                placeholder="You@example.com"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.email?.type === "required" && (
                  <span role="alert">email is required</span>
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
              <p className="font text-[12px] mt-2 text-red-600">
                {errors.password?.message}
              </p>
            </div>
            <Button className="w-full mt-6 font">login</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

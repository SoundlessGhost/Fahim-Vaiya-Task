"use client";
import toast from "react-hot-toast";
import useAuth from "@/hook/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiCall } from "@/utils/api";
import { addOfflineData } from "@/utils/offlineSlice";
import { isOnline } from "@/utils/networkCheck";

const CustomerPage = () => {
  const router = useRouter();
  const [user] = useAuth();
  const dispatch = useDispatch();

  // Callback Url

  useEffect(() => {
    if (!user) {
      const callbackUrl = encodeURIComponent(window.location.pathname);
      router.push(`/user/login?callbackUrl=${callbackUrl}`);
    }
  }, [user, router]);

  // Get Data For Form Use React Hook Form

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle OnSubmit Button

  const onSubmit = (data) => {
    const { name, number, email, area } = data;

    const customerInformation = {
      name,
      number,
      email,
      area,
    };

    // Checking the network

    if (isOnline()) {
      apiCall(customerInformation)
        .then(() => {
          toast.success("Successfully saved your address");
          reset();
        })
        .catch(() => {
          toast.error("Failed to save your address");
        });
    } else {
      dispatch(addOfflineData(customerInformation));
      toast.success("Your address is successfully saved offline");
      router.push("/");
      // reset();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-16">
      <div className="my-10 font">
        <p className="text-sm mb-6 text-center">
          Provide Customer Permanent Address
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="lg:flex items-center lg:mb-6">
            <div>
              <Label>Your Full Name</Label>
              <Input
                {...register("name", { required: true })}
                className="lg:w-96 w-[350px]"
                placeholder="Your name"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.name?.type === "required" && (
                  <span role="alert">
                    Name is required | You can&apos;t leave empty
                  </span>
                )}
              </p>
            </div>

            <div className="lg:ml-10">
              <Label>Mobile Number</Label>
              <Input
                {...register("number", { required: true })}
                className="lg:w-96 w-[350px]"
                placeholder="Valid mobile number"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.number?.type === "required" && (
                  <span role="alert">
                    Mobile Number is required | You can&apos;t leave empty
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="lg:flex items-center mb-6">
            <div>
              <Label>Email</Label>
              <Input
                {...register("email", { required: true })}
                className="lg:w-96 w-[350px]"
                placeholder="your email"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.email?.type === "required" && (
                  <span role="alert">
                    Email is required | Provide your email
                  </span>
                )}
              </p>
            </div>

            <div className="lg:ml-10">
              <Label>Area</Label>
              <Input
                {...register("area", { required: true })}
                className="lg:w-96 w-[350px]"
                placeholder="Input your area"
              />
              <p className="font mt-1 text-[10px] text-red-600">
                {errors.area?.type === "required" && (
                  <span role="alert">Area is required | Provide your area</span>
                )}
              </p>
            </div>
          </div>
          <Button className="mt-6 w-40 font">Save</Button>
        </form>
      </div>
    </div>
  );
};

export default CustomerPage;

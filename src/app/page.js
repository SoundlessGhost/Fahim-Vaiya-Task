"use client";
import useAuth from "@/hook/useAuth";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getLocalData } from "@/lib/getData";
import { addOfflineDataMany } from "@/utils/offlineSlice";
import { useDispatch, useSelector } from "react-redux";
import { isOnline } from "@/utils/networkCheck";
import toast from "react-hot-toast";

const getCustomersData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/customers", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Fetching error: " + res.statusText);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
};

export default function Home() {
  const [user] = useAuth();
  const [customers, setCustomers] = useState([]);
  const offlineData = useSelector((state) => state.offline.offlineData);
  const dispatch = useDispatch();

  // Get Customers Data

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const customerData = await getCustomersData();
        setCustomers(customerData);
      }
      fetchData();
    }
  }, [user]);

  // Handle Delete Customer

  const handleDeleteCustomer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/customers/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deleteCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer._id !== id)
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
          });
      }
    });
  };

  // Handle Delete All Customer

  const handleDeleteAllCustomer = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`http://localhost:3000/api/customers`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete customer addresses");
        }

        Swal.fire({
          title: "Deleted!",
          text: "All customer addresses have been deleted.",
          icon: "success",
        });

        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting customer addresses:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete customer addresses.",
        icon: "error",
      });
    }
  };

  // Get Data From localStorage and set offline store

  useEffect(() => {
    const data = getLocalData();
    if (data?.length > 0) {
      dispatch(addOfflineDataMany(data));
    }
  }, [dispatch]);

  console.log(offlineData);

  // Checking the network if isOnline call api

  if (isOnline() && localStorage.length > 0) {
    fetch("http://localhost:3000/api/customers", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(offlineData),
    }).then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        toast.error("Failed to save customer address");
      }
    });
    localStorage.clear();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10 font">
      {user ? (
        <div>
          Hey <span className="font-semibold">{user?.displayName}</span>, You
          Have {customers.length} Customers.
          <div className="mt-8">
            {customers.length > 0 && (
              <p
                className=" text-right mb-2 cursor-pointer"
                onClick={handleDeleteAllCustomer}
              >
                Delete All
              </p>
            )}
            {customers.map((customer, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-md p-4 mb-6 shadow-md"
              >
                <p className=" text-slate-600 flex justify-between">
                  {customer.name}{" "}
                  <span onClick={() => handleDeleteCustomer(customer._id)}>
                    <X opacity={10} className="cursor-pointer" size={20} />
                  </span>
                </p>
                <p>{customer.area}</p>
                <p>{customer.number}</p>
                <p>{customer.email}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-1xl">
            <span className="text-4xl">🙂</span> Please login{" "}
            <span className="text-4xl">😂</span>
          </p>
        </div>
      )}
    </main>
  );
}

// TODO Condition Check

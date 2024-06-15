"use client";
import useAuth from "@/hook/useAuth";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  console.log(offlineData);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const customerData = await getCustomersData();
        setCustomers(customerData);
      }
      fetchData();
    }
  }, [user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 font">
      {user ? (
        <div>
          Hey <span className="font-semibold">{user?.displayName}</span>, You
          have {customers.length} customers.
          <div className="mt-10">
            {customers.map((customer, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-md p-4 mb-6 shadow-md"
              >
                <p className=" text-slate-600 flex justify-between">
                  {customer.name}{" "}
                  <span>
                    <X opacity={10} className="cursor-pointer" size={20} />
                  </span>
                </p>
                <p className="">{customer.area}</p>
                <p className="">{customer.number}</p>
                <p className="">{customer.email}</p>
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

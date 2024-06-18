"use client";
import useAuth from "@/hook/useAuth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const getUsersData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
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

const AllUserPage = () => {
  const [user] = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const userData = await getUsersData();
        setUsers(userData);
      }
      fetchData();
    }
  }, [user]);
  return (
    <div className="lg:m-20 m-4 font">
      <Table>
        <TableCaption>A list of recent users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="lg:w-96">{user?.name}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{(user?.createdAt).slice(0, 10)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllUserPage;

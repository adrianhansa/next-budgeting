/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { authLogout } from "redux/authSlice";
import { useRouter } from "next/router";

const MenuItems = () => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const logoutHandler = () => {
    dispatch(authLogout());
    router.push("/login");
  };

  return (
    <>
      {!user && (
        <>
          <li className="hover:font-semibold font-light cursor-pointer">
            <Link href="/auth/login">Login</Link>
          </li>
          <li className="hover:font-semibold font-light cursor-pointer">
            <Link href="/auth/register">Register</Link>
          </li>
        </>
      )}
      {user && (
        <>
          <li className="hover:font-semibold font-light">{user.name}</li>

          <li className="hover:font-semibold font-light cursor-pointer">
            <Link href="/services">Services</Link>
          </li>
          <li className="hover:font-semibold font-light cursor-pointer">
            <Link href="/employees">All Employees</Link>
          </li>
          <li className="hover:font-semibold font-light cursor-pointer">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li
            className="hover:font-semibold font-light cursor-pointer"
            onClick={logoutHandler}
          >
            Logout
          </li>
        </>
      )}
    </>
  );
};

export default MenuItems;

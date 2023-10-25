import { Form, NavLink, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import React, { ReactElement, useEffect } from "react";

type SidebarProps = {
  contacts: any;
  q: any;
  searching: any;
};

const SidebarTwo: React.FC<SidebarProps> = ({ contacts, q, searching }): ReactElement => {
  const navigation = useNavigation();
  const navigate = useNavigate();

  const submit = useSubmit();

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <>
      <h1>Shoppinglist</h1>
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <a className="menu-url" href="#">
          Your shoppinglist
        </a>
      </div>
      <nav>
        <h2>Recipes</h2>
        <NavLink
          className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
          to={`/123}`}
        >
          1
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
          to={`/123}`}
        >
          2
        </NavLink>
        <NavLink
          className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
          to={`/123}`}
        >
          3
        </NavLink>
      </nav>
    </>
  );
};

export default SidebarTwo;

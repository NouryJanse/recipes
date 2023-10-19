import { Form, NavLink, useNavigate, useNavigation, useSubmit } from "@remix-run/react";
import React, { ReactElement, useEffect } from "react";

type SidebarProps = {
  contacts: any;
  q: any;
  searching: any;
};

const Sidebar: React.FC<SidebarProps> = ({ contacts, q, searching }): ReactElement => {
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
      {" "}
      <h1>Shoppinglist</h1>
      <div>
        <Form
          id="search-form"
          role="search"
          onChange={(event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
        >
          <input
            id="q"
            aria-label="Search contacts"
            className={searching ? "loading" : ""}
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q || ""}
          />
          <div id="search-spinner" aria-hidden hidden={!searching} />
        </Form>

        <Form method="post">
          <button type="submit">New</button>
        </Form>
      </div>
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
        {contacts.length ? (
          <ul>
            {contacts.map((contact: any) => (
              <li key={contact.id}>
                <NavLink
                  className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
                  to={`contacts/${contact.id}`}
                >
                  {contact.first || contact.last ? (
                    <>
                      {contact.first} {contact.last}
                    </>
                  ) : (
                    <i>No Name</i>
                  )}

                  {contact.favorite ? <span>★</span> : null}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No contacts</i>
          </p>
        )}
      </nav>
    </>
  );
};

export default Sidebar;

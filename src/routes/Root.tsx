/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigation, useLoaderData, Outlet, LoaderFunction, Form, redirect, NavLink } from "react-router-dom";
import { getContacts, createContact } from "../contacts.js";
import { useEffect, useState } from "react";

export type LoaderData<TLoaderFn extends LoaderFunction> = Awaited<ReturnType<TLoaderFn>> extends Response | infer D
	? D
	: never;

  export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const contacts = await getContacts(q);
    console.log(contacts)
    return { contacts, q };
  }

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`)
}

export default function Root() {
  const { contacts, q } = useLoaderData() as LoaderData<typeof loader>;
  const [query, setQuery] = useState(q);
  const navigation = useNavigation();

  useEffect(() => {
    setQuery(q);
  }, [q]);

    return (
      <>
        <div id="sidebar">
          <h1>React Router Contacts</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            {contacts.length ? (
              <ul>
                {contacts.map((contact: any) => (
                  <li key={contact.id}>
                    <NavLink
                      to={`contacts/${contact.id}`}
                      className={({ isActive, isPending }) =>
                        isActive
                          ? "active"
                          : isPending
                          ? "pending"
                          : ""
                      }
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite && <span>★</span>}
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
        </div>
        <div 
          id="detail"
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
      </>
    );
}
  
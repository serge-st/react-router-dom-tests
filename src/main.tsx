import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Root, { loader as rootLoader, action as rootAction } from './routes/Root';
import ErrorPage from './ErrorPage';
import Contacts, { loader as contactLoader, action as contactAction } from './routes/Contacts';
import EditContact, { action as editAction } from './routes/EditContact';
import { action as destroyAction } from './routes/destroy';
import Index from './routes/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [{
          index: true,
          element: <Index />
        },
        {
          path: "contacts/:contactId",
          element: <Contacts />,
          loader: contactLoader,
          action: contactAction,
        },
        {
          path: "contacts/:contactId/edit",
          element: <EditContact />,
          loader: contactLoader,
          action: editAction,
        },
        {
          path: "contacts/:contactId/destroy",
          action: destroyAction,
          errorElement: <div>Oops! There was an error.</div>,
        },]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

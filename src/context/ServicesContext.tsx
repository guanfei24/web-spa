// app/context/ServicesContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { callApi } from "@/pages/api/api"; // Adjust the import path as necessary

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApi({
      query: `
        query {
          serviceCategories {
            id
            name
            services {
              id
              title
              price
              duration
              slug
              image_url
              description
            }
          }
        }
      `,
    }).then((data) => {
      setServiceCategories(data.serviceCategories);
      setLoading(false);
    });
  }, []);

  return (
    <ServicesContext.Provider value={{ serviceCategories, loading }}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);

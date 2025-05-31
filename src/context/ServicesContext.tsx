"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { callApi } from "@/lib/api"; // ✅ 建议把 API 移到 utils 或 lib 文件夹

// 🔹 定义服务类型
interface Service {
  id: number;
  title: string;
  price: number;
  duration: number;
  slug: string;
  image_url: string;
  description: string;
}

// 🔹 定义服务分类类型
interface ServiceCategory {
  id: number;
  name: string;
  services: Service[];
}

// 🔹 定义 context 提供的值
interface ServicesContextType {
  serviceCategories: ServiceCategory[];
  loading: boolean;
}

// 创建 context
const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

// Provider 组件
export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(
    []
  );
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
      setServiceCategories(data.serviceCategories || []);
      setLoading(false);
    });
  }, []);

  return (
    <ServicesContext.Provider value={{ serviceCategories, loading }}>
      {children}
    </ServicesContext.Provider>
  );
};

// ✅ Hook：使用 context
export const useServices = (): ServicesContextType => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};

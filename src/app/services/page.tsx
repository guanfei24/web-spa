// src/app/services/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Service = {
  id: number;
  title: string;
  price: number;
  duration: number;
  slug: string;
  image_url: string;
  description: string;
};

type Category = {
  id: number;
  name: string;
  services: Service[];
};

export default function ServicesPage() {
  const [serviceCategories, setServiceCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
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
        }),
      });
      const json = await res.json();
      setServiceCategories(json.data.serviceCategories);
      setLoading(false);
    };

    fetchServices();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-yellow-700 mb-12">
        Our Services
      </h1>

      {serviceCategories.map((cat) => (
        <div key={cat.id} className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {cat.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.services.map((srv) => (
              <div
                key={srv.id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                {srv.image_url ? (
                  <Image
                    src={srv.image_url}
                    alt={srv.title}
                    width={400}
                    height={250}
                    className="rounded mb-3 w-full h-48 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-48 mb-3 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <h3 className="text-xl font-bold text-yellow-800 mb-2">
                  {srv.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{srv.description}</p>
                <p className="text-sm text-gray-700 font-medium mb-2">
                  Duration: {srv.duration} min • ${srv.price}
                </p>
                <Link
                  href={`/services/${srv.slug}`}
                  className="inline-block mt-2 text-yellow-700 hover:text-yellow-900 font-medium"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

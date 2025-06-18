"use client";

import { useEffect, useState } from "react";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  created_at?: string;
  is_visible?: boolean;
  employee_name?: string;
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              reviews {
                id
                name
                rating
                comment
                created_at
                is_visible
                employee_name
              }
            }
          `,
        }),
      });
      const json = await res.json();
      setReviews(json.data.reviews);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-yellow-700 mb-12">
        Client Reviews
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews
          .filter((rev) => rev.is_visible)
          .map((rev) => (
            <div
              key={rev.id}
              className="border rounded-lg p-6 shadow hover:shadow-lg transition bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold">{rev.name}</h3>
                  {rev.created_at && (
                    <p className="text-sm text-gray-500">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="text-yellow-500 text-lg">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>

              <p className="text-gray-700 mb-3">{rev.comment}</p>

              {rev.employee_name && (
                <p className="text-sm text-gray-600">
                  🧖‍♀️ Service by:
                  <span className="font-medium">{rev.employee_name}</span>
                </p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

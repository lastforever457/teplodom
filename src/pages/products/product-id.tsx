import useFetchWithQueries from "../../hooks/use-fetch-with-queries.tsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image } from "antd";
import { useReducerActions } from "../../hooks/use-reducer-actions.tsx";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

const ProductId = () => {
  const { fetchWithQueries } = useFetchWithQueries();
  const [product, setProduct] = useState<Record<string, any> | null>(null);
  const { addToCart, addToFavorite, removeFromFavorite } = useReducerActions();
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchWithQueries(`/products/${id}`);
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetch();
  }, [id, fetchWithQueries]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            {product.images && product.images.length > 0 && (
              <Image
                width={400}
                height={400}
                src={product.images[0]}
                alt={product.title}
                className="w-80 h-auto rounded-lg shadow-lg bg-center bg-contain object-contain"
              />
            )}
          </div>

          <div className="flex-1">
            <div className="text-lg mb-4">
              <span className="text-xl font-semibold text-gray-800">
                ${product.price}
              </span>
              {product.discountPercentage && (
                <span className="text-sm text-gray-600 ml-2 line-through">
                  $
                  {(
                    product.price *
                    (1 + product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center mb-4">
                <div className="text-yellow-500 font-semibold">
                  {"⭐".repeat(Math.floor(product.rating))}
                </div>
                <span className="text-gray-600 ml-2">
                  ({product.rating} out of 5)
                </span>
              </div>
            )}

            <p className="text-gray-700 mb-4">{product.description}</p>

            {product.availabilityStatus && (
              <div className="mb-4">
                <span
                  className={`px-2 py-1 rounded ${
                    product.stock > 0
                      ? "bg-green-200 text-green-800"
                      : "bg-red-200 text-red-800"
                  }`}
                >
                  {product.availabilityStatus}
                </span>
              </div>
            )}

            {product.warrantyInformation && (
              <p className="text-gray-700 mb-2">
                Warranty: {product.warrantyInformation}
              </p>
            )}
            {product.returnPolicy && (
              <p className="text-gray-700 mb-4">
                Return Policy: {product.returnPolicy}
              </p>
            )}

            {product.shippingInformation && (
              <p className="text-gray-700 mb-4">
                Shipping: {product.shippingInformation}
              </p>
            )}

            {product.sku && (
              <p className="text-gray-600 mb-2">SKU: {product.sku}</p>
            )}
            {product.brand && (
              <p className="text-gray-600 mb-2">Brand: {product.brand}</p>
            )}

            {product.minimumOrderQuantity && (
              <p className="text-gray-600 mb-4">
                Minimum Order: {product.minimumOrderQuantity}
              </p>
            )}
            <div className="flex">
            {product.isSaved ? (
                <Button className="border-0 p-5 mr-2" onClick={(event) => {
                  event.preventDefault()
                  removeFromFavorite(product.id)
                }}>
                  <MdOutlineFavorite />
                </Button>
              ) : (
                <Button className="border-0 p-5 mr-2" onClick={(event) => {
                  event.preventDefault()
                  addToFavorite(product.id)
                }}>
                  <MdOutlineFavoriteBorder />
                </Button>
              )}
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map(
                (review: Record<string, any>, index: number) => (
                  <div key={index} className="border p-4 rounded-lg shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-yellow-500">
                        {"⭐".repeat(review.rating)}
                      </div>
                      <span className="text-gray-600 text-sm">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                    <p className="text-gray-600 text-sm mt-2">
                      - {review.reviewerName}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductId;

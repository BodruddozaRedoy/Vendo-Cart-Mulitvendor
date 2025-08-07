import LoadingScreen from "@/components/common/LoadingScreen";
import useAddToCart from "@/hooks/useAddToCart";
import useAddToWishlist from "@/hooks/useAddToWishlist";
import { useGetAProductQuery } from "@/redux/features/products/productApi";
import { useEffect, useState } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useParams } from "react-router";


export default function ProductDetails() {
  const { addToCart, result } = useAddToCart()
  const {addToWishlist} = useAddToWishlist()
  const { id } = useParams()
  const { data } = useGetAProductQuery(id)
  const product = data?.data
  const [mainImage, setMainImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    setMainImage(product?.image)
  }, [])
  console.log(product?.data)
  console.log(id)
  if(!product) return <LoadingScreen/>
  return (
    <div className="container mx-auto p-6 text-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div
            className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible gap-2 sm:gap-2
              scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {product?.images.map((img:any, i:number) => (
              <img
                key={i}
                src={img}
                alt={`Thumbnail ${i + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 rounded-lg object-cover cursor-pointer hover:border-primary border-2 ${mainImage === img ? "border-primary" : "border-transparent"
                  }`}
                style={{ scrollSnapAlign: "start" }}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1">
            <img
              src={mainImage || product.image}
              alt="Main product"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl font-bold">{product.name}</h1>
          <p className="text-yellow-500 font-medium text-sm sm:text-base">
            ★ {product.rating} ({product.reviewsCount} reviews)
          </p>

          <div className="text-xl sm:text-2xl font-semibold text-primary">
            ${product.price.toFixed(2)}
            <span className="text-gray-400 line-through ml-3 text-sm sm:text-base">
              ${(product.price / (1 - product.discount / 100)).toFixed(2)}
            </span>
            <span className="ml-2 text-xs sm:text-sm text-red-500">
              -{product.discount}%
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 list-disc pl-5 gap-1 text-sm sm:text-base">
            {product.features.map((feature:any, i:number) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>

          {/* Quantity and Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="min-w-[24px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div> */}

            <div className="flex gap-3 flex-wrap">
              <button onClick={() => addToCart({productId: product._id})} className="bg-primary text-white px-4 py-2 rounded whitespace-nowrap">
                Add to Cart
              </button>
              {/* <button className="bg-secondary text-white px-4 py-2 rounded whitespace-nowrap">
                Buy Now
              </button> */}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm mt-2 text-gray-600">
            <button onClick={() => addToWishlist(product._id)} className="flex items-center gap-2 hover:text-primary transition cursor-pointer">
              <FaHeart /> Add to Wishlist
            </button>
            <button className="flex items-center gap-2 hover:text-primary transition">
              <FaTrash /> Compare
            </button>
          </div>

          <div className="mt-4 text-sm space-y-1">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Tags:</strong> {product.tags.join(", ")}
            </p>
            <p>
              <strong>Shipping:</strong> {product.shipping}
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="col-span-1 lg:col-span-2 border-t pt-8 mt-10 space-y-4">
          <h2 className="text-lg sm:text-xl font-semibold">Product Description</h2>
          <p>{product.description}</p>

          <h2 className="text-lg sm:text-xl font-semibold">Warranty</h2>
          <p>{product.warranty}</p>

          <h2 className="text-lg sm:text-xl font-semibold">Vendor Info</h2>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
        </div>
      </div>
    </div>
  );
}

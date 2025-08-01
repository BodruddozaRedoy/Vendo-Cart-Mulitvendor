import { IoCheckmarkDoneCircle } from "react-icons/io5";

export default function OrderTracking() {
  const status = "delivered"; // dynamically set this from backend
  const statusSteps = [
    { key: "order-placed", label: "Order Placed" },
    { key: "in-progress", label: "In Progress" },
    { key: "shipped", label: "Shipped" },
    { key: "out-for-delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentIndex = statusSteps.findIndex((step) => step.key === status);

  return (
    <div className="text-primary  w-full mx-auto p-4">
      {/* Instruction + input */}
      <div className="w-full lg:w-1/2">
        <p className="font-light text-sm sm:text-base">
          To track your order please enter your OrderID in the box below and press "Track" button. This was given to you on your receipt and in the confirmation email you should have received.
        </p>
        <div className="mt-5 flex flex-col  sm:flex-row items-stretch gap-2">
          <input
            type="text"
            placeholder="Order ID"
            className="py-3 px-5 w-full rounded-lg bg-background shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            className="px-6 bg-primary text-background py-3 rounded-lg cursor-pointer select-none w-full sm:w-auto"
          >
            Track
          </button>
        </div>
      </div>

      <hr className="my-6" />

      {/* Order status info */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-semibold">
          Order Status:{" "}
          <span className="text-secondary capitalize">
            {status.replace(/-/g, " ")}
          </span>
        </h1>
        <p className="font-semibold text-primary/50 mt-2 text-sm sm:text-base">
          Estimated Delivery Date: 3 August - 5 August
        </p>

        {/* Status steps */}
        <div className="relative mt-10">
          {/* Progress bar for large screens */}
          <div className="hidden sm:block absolute left-8 top-[30px] h-4 rounded-lg bg-primary transition-all duration-500"
            style={{
              width: `${(currentIndex / (statusSteps.length - 1)) * 94}%`,
              zIndex: -10,
            }}
          />
          <div className="hidden sm:block w-[94%] absolute left-8 top-[30px] h-4 bg-primary/10 rounded-lg -z-20"></div>

          {/* Steps container */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-8 sm:gap-0">
            {statusSteps.map((step, index) => {
              let bubbleColor = "bg-gray-300";
              if (index < currentIndex) bubbleColor = "bg-secondary"; // completed
              else if (index === currentIndex) bubbleColor = "bg-primary"; // current

              return (
                <div
                  key={step.key}
                  className="text-center flex flex-col items-center sm:flex-1"
                >
                  <div
                    className={`w-12 h-12 sm:w-15 sm:h-15 rounded-full ${bubbleColor} text-background flex items-center justify-center text-3xl sm:text-4xl mb-2`}
                  >
                    <IoCheckmarkDoneCircle />
                  </div>
                  <p className="font-semibold text-sm sm:text-base">{step.label}</p>
                  <p className="text-primary/50 text-xs sm:text-sm">15 August 2025</p>
                </div>
              );
            })}
          </div>

          {/* Progress bar for small screens - vertical */}
          <div className="sm:hidden absolute left-[23px] top-14 w-1 bg-primary rounded transition-all duration-500"
            style={{
              height: `${(currentIndex / (statusSteps.length - 1)) * 230}px`,
              zIndex: -10,
            }}
          />
          <div className="sm:hidden absolute left-[23px] top-14 w-1 h-[230px] bg-primary/10 rounded -z-20"></div>
        </div>
      </div>
    </div>
  );
}

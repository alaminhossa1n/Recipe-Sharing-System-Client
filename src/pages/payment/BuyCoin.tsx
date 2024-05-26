import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BuyCoin = () => {
  const navigate = useNavigate();

  const handlePurchase = (price: number, coin: number) => {
    navigate("/payment", { state: { price, coin } });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-6">
      {/* Card 1 */}
      <div className=" bg-green-100 shadow-lg rounded-lg overflow-hidden p-6 text-center">
        <div className="mb-4">
          <FaCoins className="text-green-500 text-6xl mx-auto" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-green-700">100</h2>
        <p className="text-gray-700 mb-6">Pay $1</p>
        <button
          onClick={() => handlePurchase(1, 100)}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
        >
          Purchase
        </button>
      </div>

      {/* Card 2 */}
      <div className=" bg-blue-100 shadow-lg rounded-lg overflow-hidden p-6 text-center">
        <div className="mb-4">
          <FaCoins className="text-blue-500 text-6xl mx-auto" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-blue-700">500</h2>
        <p className="text-gray-700 mb-6">Pay $5</p>
        <button
          onClick={() => handlePurchase(10, 500)}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Purchase
        </button>
      </div>

      {/* Card 3 */}
      <div className="bg-red-100 shadow-lg rounded-lg overflow-hidden p-6 text-center">
        <div className="mb-4">
          <FaCoins className="text-red-500 text-6xl mx-auto" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-red-700">1000</h2>
        <p className="text-gray-700 mb-6">Pay $100</p>

        <button
          onClick={() => handlePurchase(100, 1000)}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
        >
          Purchase
        </button>
      </div>
    </div>
  );
};

export default BuyCoin;

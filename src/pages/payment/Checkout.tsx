import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const currentUser = useAppSelector((state) => state.auth.user);

  const location = useLocation();

  const { price, coin } = location.state;

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [cardError, setCardError] = useState<string | null>(null);

  useEffect(() => {
    if (price > 0) {
      fetch("http://localhost:5000/api/payment/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, email: currentUser?.email, coin }),
      })
        .then((response) => {
          console.log("Response received from server:", response);
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(`Network response was not ok: ${text}`);
            });
          }
          return response.json();
        })
        .then((data) => {
          if (!data.clientSecret) {
            throw new Error("Client secret not found in response");
          }
          setClientSecret(data.clientSecret);
          console.log("Client secret set:", data.clientSecret);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [price, currentUser]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError("Card element not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message || "An unknown error occurred");
    } else {
      setCardError(null);
      console.log("payment method", paymentMethod);
    }

    if (!clientSecret) {
      setCardError("Client secret not available");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: currentUser?.email || "unknown",
            name: currentUser?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message || "An unknown error occurred");
      console.log(confirmError);
    } else {
      console.log("Payment intent", paymentIntent?.id);
      // Handle successful payment confirmation, e.g., set transaction ID, navigate to success page, etc.
    }
  };
  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Payment Details
        </h2>
        {cardError && <p className="text-red-600 mb-4">{cardError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="card-element"
            >
              Card Details
            </label>
            <div className="border border-gray-300 rounded-md p-3">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-green-500 rounded-lg shadow-lg py-6 text-center text-white mb-4">
            <h2 className="text-2xl font-semibold mb-4">Total Amount</h2>
            <p className="text-lg mb-2">Payable Amount: ${price}</p>
            <p className="text-lg">You'll get {coin} coins.</p>
          </div>
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full"
            type="submit"
          >
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

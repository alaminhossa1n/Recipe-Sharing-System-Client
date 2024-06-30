import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useBuyCoinMutation,
  useGetSingleUserQuery,
} from "../../redux/features/auth/authApi";
import Swal from "sweetalert2";
import { TUser } from "../../interface/interface";

const Checkout = () => {
  const token: Partial<TUser> | null = useAppSelector(
    (state) => state.auth.user
  );
  const { data, refetch } = useGetSingleUserQuery({ email: token?.email });
  const currentUser = data?.data;
  const [buyCoin] = useBuyCoinMutation();
  const [payLoading, setPayLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { price, coin } = location.state;

  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [cardError, setCardError] = useState<string | null>(null);

  useEffect(() => {
    if (price > 0) {
      fetch(
        "https://recipe-sharing-system-server.vercel.app/api/payment/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
        }
      )
        .then((response) => {
          // console.log("Response received from server:", response);
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
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    }
  }, [price]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPayLoading(true)

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError("Card element not found");
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message || "An unknown error occurred");
    } else {
      setCardError(null);
      // console.log("payment method", paymentMethod);
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
    } else {
      if (paymentIntent.status === "succeeded") {
        const res = await buyCoin({
          viewerEmail: currentUser?.email,
          coin,
        }).unwrap();

        if (res.success === true) {
          setPayLoading(false);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();

          navigate("/");
        }
      }
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
            className="text-white font-bold py-2 px-4 rounded w-full btn btn-neutral"
            type="submit"
            // disabled={!stripe || !clientSecret}
          >
            {payLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <p>Pay</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkout from "./Checkout"

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK)

const Payment = () => {
	return (
		<div className="w-full my-5 py-10">
			<Elements stripe={stripePromise}>
				<Checkout></Checkout>
			</Elements>
		</div>
	)
}

export default Payment

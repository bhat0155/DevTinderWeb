import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  console.log("Client Secret Received:", clientSecret);
  console.log("Stripe loaded:", !!stripe);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      onSuccess(); // call parent success
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border mt-6 bg-white rounded-md"
    >
      <CardElement />
      <button type="submit" className="btn btn-primary mt-4" disabled={!stripe}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;

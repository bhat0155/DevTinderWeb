import { useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import StripeWrapper from "./StripeWrapper";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [checkoutForm, setCheckoutForm] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const handleType = async (type) => {
    console.log("🔁 Button clicked for:", type);

    try {
      const res = await axios.post(
        BASE_URL + "/payment/create",
        {
          membershipType: type,
        },
        {
          withCredentials: true,
        }
      );

      console.log("✅ Client secret received:", res.data.clientSecret);

      setClientSecret(res.data.clientSecret);
      setSelectedType(type);
      setCheckoutForm(true);
    } catch (err) {
      console.error("❌ Error creating payment intent:", err);
    }
  };

  return (
    <div className="m-10">
      <div className="flex w-full flex-col gap-4">
        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
          <button
            onClick={() => handleType("Gold")}
            className="btn btn-warning"
          >
            Buy Gold Membership
          </button>
        </div>

        <div className="divider">OR</div>

        <div className="card bg-base-300 rounded-box grid h-20 place-items-center">
          <button onClick={() => handleType("Silver")} className="btn btn-info">
            Buy Silver Membership
          </button>
        </div>
      </div>

      {checkoutForm && clientSecret && (
        <div className="mt-10">
          <StripeWrapper>
            <CheckoutForm
              clientSecret={clientSecret}
              onSuccess={async () => {
                alert(`✅ Payment successful for ${selectedType} membership!`);
                setCheckoutForm(false);
              }}
            />
          </StripeWrapper>
        </div>
      )}
    </div>
  );
};

export default Premium;

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import CheckoutForm from "./CheckoutForm";
import StripeWrapper from "./StripeWrapper";

const Premium = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  const handlePlanClick = async (type) => {
    console.log("Button clicked:", type);
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/create`,
        { membershipType: type },
        { withCredentials: true }
      );

      console.log("Client secret from backend:", res.data.clientSecret);

      setClientSecret(res.data.clientSecret);
      setSelectedType(type);
      setShowCheckout(true);
    } catch (err) {
      console.error("Payment creation failed:", err);
    }
  };

  return (
    <div className="m-10">
      <div className="flex flex-col gap-4">
        <div className="card bg-base-300 rounded-box h-20 grid place-items-center">
          <button
            onClick={() => handlePlanClick("Gold")}
            className="btn btn-warning"
          >
            Buy Gold Membership
          </button>
        </div>
        <div className="divider">OR</div>
        <div className="card bg-base-300 rounded-box h-20 grid place-items-center">
          <button
            onClick={() => handlePlanClick("Silver")}
            className="btn btn-info"
          >
            Buy Silver Membership
          </button>
        </div>
      </div>

      {showCheckout && clientSecret && (
        <div className="mt-10">
          {console.log("Rendering CheckoutForm")}
          <StripeWrapper>
            <CheckoutForm
              clientSecret={clientSecret}
              onSuccess={() => {
                alert(`Payment successful for ${selectedType} membership!`);
                setShowCheckout(false);
              }}
            />
          </StripeWrapper>
        </div>
      )}
    </div>
  );
};

export default Premium;

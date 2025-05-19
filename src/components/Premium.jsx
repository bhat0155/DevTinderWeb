import { useEffect, useState } from "react";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import StripeWrapper from "./StripeWrapper";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [checkoutForm, setCheckoutForm] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [prem, isPrem] = useState(false);
  useEffect(() => {
    verifyPremium();
  }, []);
  const verifyPremium = async () => {
    const res = await axios.get(BASE_URL + "/payment/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      isPrem(true);
    }
  };

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

  return prem ? (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-green-800 font-semibold px-8 py-6 rounded-lg shadow-md border border-green-900 text-center text-white-700 ">
        {" "}
        🎉 You are a Premium Member!
      </div>
    </div>
  ) : (
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
                verifyPremium();
              }}
            />
          </StripeWrapper>
        </div>
      )}
    </div>
  );
};

export default Premium;

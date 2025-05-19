import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RPYlvQhfEops549mrlw39524NDeSBjACiiyd32tgAKT3W5rLLqG1r5RVis4HjRTvxVpG2qq26sTfMOC5yHrM4iy00pctpkR3t"
);

const stripeWrapper = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default stripeWrapper;

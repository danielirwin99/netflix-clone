import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";
import { getFunctions, httpsCallable } from "@firebase/functions";
import app from "../utils/firebase";

// Allows us to retrieve the payments from Stripe
const payments = getStripePayments(app, {
  customersCollection: "customers",
  productsCollection: "products",
});

// Retrieving the payments from the checkout function
const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    // Send the url of the current window --> I.e Whatever the domain will be instead of localhost:3000
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    // Snapshot navigates to a given url --> The stripe payment portal is our desired url
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message));
};

export { loadCheckout };
export default payments;

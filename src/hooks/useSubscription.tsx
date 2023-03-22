import payments from "@/library/stripe";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    // If there is no user just return and dont follow with the next lines of code
    if (!user) return;

    // Listener for a subscription event
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (subscription) =>
            subscription.status === "active" ||
            subscription.status === "trialing"
        )[0]
      );
    });
  }, [user]);
  return subscription
};

export default useSubscription;

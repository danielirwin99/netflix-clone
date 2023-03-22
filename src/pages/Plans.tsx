import Loader from "@/components/Loader";
import Table from "@/components/Table";
import useAuth from "@/hooks/useAuth";
import { loadCheckout } from "@/library/stripe";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Product } from "@stripe/firestore-stripe-payments";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  products: Product[];
}

const Plans = ({ products }: Props) => {
  // Authentication from Firebase
  const { logout, user } = useAuth();
  // Highlighting the selected plan --> The third plan [2] --> Premium Plan
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2]);
  // Loading state for the button on subscribe
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    // Tells the Stripe portal which plan the user has chosen
    loadCheckout(selectedPlan?.prices[0].id!);
    // As soon as it happens we want the billing to be true
    setIsBillingLoading(true);
  };

  return (
    <div>
      {" "}
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="Netflix Logo"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>
      <main className="mx-auto pt-28 max-w-5xl px-5 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime
          </li>
        </ul>
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full justify-center self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>
          <Table products={products} selectedPlan={selectedPlan} />
          <button
            // Disabled --> Only can click it once instead of multiple times
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {/* Loading state of a loading icon */}
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;
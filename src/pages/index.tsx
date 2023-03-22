import Head from "next/head";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import requests from "@/utils/request";
import { Movie } from "../../typings";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import Plans from "./Plans";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import payments from "@/library/stripe";
import useSubscription from "@/hooks/useSubscription";

// Allows us to use these in other components and pages
interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

// Our async function of Next.js
export const getServerSideProps = async () => {
  // This pulls the products
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    // Instead of using 8 awaits we can use Promise.all --> Its also faster
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  // must return something your async function
  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) {
  console.log(products);
  const { loading, user } = useAuth();
  // useRecoil is very similar to useState
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);

  // If Either of these return back nothing --> Return null
  if (loading || subscription === null) return null;

  // If there is no subscription --> Push the user onto the Plans screen
  if (!subscription) return <Plans products={products} />;
  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <meta name="description" content="Netflix Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-10">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-16">
          {/* Passing Values for each row to display */}
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Documentaries" movies={documentaries} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Horror" movies={horrorMovies} />
        </section>
      </main>
      {showModal && <Modal />}
    </div>
  );
}

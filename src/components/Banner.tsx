import { baseUrl } from "@/constants/movie";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Movie } from "../../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { modalState, movieState } from "@/atoms/modalAtom";
import { useRecoilState } from "recoil";
interface Props {
  netflixOriginals: Movie[];
}
const Banner = ({ netflixOriginals }: Props) => {
  // Its original state is null --> No value to display
  const [movie, setMovie] = useState<Movie | null>(null);
  // State for the modal to show
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  useEffect(() => {
    setMovie(
      netflixOriginals[4] || null
    );

    console.log(netflixOriginals)
    // This is dependant on the netflixOriginals
  }, [netflixOriginals]);
  console.log(useEffect)

  
  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          className="relative"
          fill
          style={{ objectFit: "cover" }}
          alt="Banner Image"
        />
      </div>
      <h1 className="text-2xl lg:text-7xl md:text-4xl font-bold ">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>
      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" /> Play
        </button>
        <button
          className="bannerButton bg-[gray]/70"
          onClick={() => {
            setCurrentMovie(movie);
            setShowModal(true);
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};
export default Banner;

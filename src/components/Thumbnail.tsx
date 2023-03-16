import { baseUrl } from "@/constants/movie";
import Image from "next/image";
import { Movie } from "../../typings";

interface Props {
  // Firebase
  // movie: Movie | DocumentData
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => {
  return (
    <div className="relative h-28 min-w-[200px] cursor-pointer transition-all duration-200 ease-out md:h-36 md:min-w-[380px] hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie?.backdrop_path || movie?.poster_path
        }`}
        className="rounded-sm object-cover"
        fill
        style={{ objectFit: "cover" }}
        alt="Thumbnail Image"
      />
    </div>
  );
};

export default Thumbnail;

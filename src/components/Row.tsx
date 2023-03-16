import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Movie } from "../../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  return (
    <div className="h-40 space-x-0.5 md:space-x-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[$e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative ">
        <ChevronLeftIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
        <div className="flex scrollbar-hide items-center space-x-0.5 md:-ml-1  overflow-x-scroll md:space-x-2.5">
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon className="absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100" />
      </div>
    </div>
  );
};

export default Row;

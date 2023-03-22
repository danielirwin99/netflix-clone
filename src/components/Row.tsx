import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";
import { useRef, useState } from "react";
import { Movie } from "../../typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  // Firebase
  movies: Movie[] | DocumentData[];
}

const Row = ({ title, movies }: Props) => {
  // This is for the scroll chevrons
  // Its similar to useState but more performant --> You must provide a default value i.e (null)
  const rowRef = useRef<HTMLDivElement>(null);
  // Hook for showing one chevron depeding where your cursor is
  const [isMoved, setIsMoved] = useState(false);

  // This is for the chevron clicking
  function handleClick(direction: string) {
    setIsMoved(true);

    // .current lets us access events inside the desconstruct
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      // If we scroll left minus the client width, otherwise add the client width
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      // Passing in the function above
      // Behaviour will make it either smooth or auto depending on your choice
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  }

  return (
    <div className="h-40 space-x-0.5 md:space-x-2">
      <h2 className="w-56 cursor-pointer text-sm font-semibold text-[$e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group relative ">
        <ChevronLeftIcon
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleClick("left")}
        />
        <div
          ref={rowRef}
          className="flex scrollbar-hide items-center space-x-0.5 md:-ml-1  overflow-x-scroll md:space-x-2.5"
        >
          {movies?.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default Row;

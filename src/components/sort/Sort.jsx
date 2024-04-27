import { useEffect, useRef, useState } from "react";

export default function Sort({ sortByAverageCost }) {
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const items = ["Lower to higher", "higher to lower"];
  const handleclick = (item) => {
    if (item === "Lower to higher") {
      sortByAverageCost(0);
    } else {
      sortByAverageCost(1);
    }

    setOpen(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={dropDownRef} className="relative mx-auto w-fit text-white">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-sm bg-sky-600 px-6 py-2"
      >
        Sort by average price
      </button>
      <ul
        className={`${
          open ? "visible" : "invisible"
        } absolute top-12 z-50 w-full space-y-1 rounded-sm shadow-md`}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            onClick={() => {
              handleclick(item);
            }}
            className={`cursor-pointer rounded-sm bg-sky-400 p-2 ${
              open ? "opacity-100 duration-500" : "opacity-0 duration-150"
            } hover:bg-sky-500`}
            style={{ transform: `translateY(${open ? 0 : (idx + 1) * 10}px)` }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
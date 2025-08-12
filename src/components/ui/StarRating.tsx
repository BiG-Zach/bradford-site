import * as React from "react";

type StarRatingProps = {
  value?: number; // 0..5
  className?: string;
  "aria-label"?: string;
};

export default function StarRating({ value = 5, className, ...rest }: StarRatingProps) {
  const stars = Array.from({ length: 5 }).map((_, i) => i < value);
  return (
    <div className={"flex items-center gap-1 " + (className || "")} {...rest}>
      {stars.map((filled, i) => (
        <svg
          key={i}
          width="18"
          height="18"
          viewBox="0 0 20 20"
          className={filled ? "fill-amber-500" : "fill-slate-300"}
          aria-hidden="true"
        >
          <path d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"></path>
        </svg>
      ))}
    </div>
  );
}
import * as React from "react";
import "../styles/modal.start-rating.css";

const StarRating: React.FC<{ rating: number }> = ({
  rating,
}: {
  rating: number;
}) => {
  const fullStars = Math.floor(rating); // Số sao đầy
  const hasHalfStar = rating % 1 !== 0;
  const percentage = (rating - fullStars) * 100;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Số sao rỗng

  const stars = [];

  // Thêm sao đầy (★)
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <div key={`full-${i}`} className="start-gold">
        <span>★</span>
      </div>
    );
  }

  // Thêm nửa sao (⯪)
  if (hasHalfStar) {
    stars.push(
      <div
        key="half"
        className="start-half"
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
        }}
      >
        <div
          className="start-gold"
          style={{
            width: `${percentage}%`,
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          <span>★</span>
        </div>
        <div className="start-gray">
          <span>★</span>
        </div>
      </div>
    );
  }

  // Thêm sao rỗng (☆)
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <div key={`empty-${i}`} className="start-gray">
        <span>★</span>
      </div>
    );
  }

  return <div className="start-rating">{stars}</div>;
};

export default StarRating;

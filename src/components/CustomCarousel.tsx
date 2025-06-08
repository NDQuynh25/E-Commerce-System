import React from "react";
import { Carousel, Button } from "antd";
import styled from "styled-components";
import "../styles/product/modal.section.product.detail.css";
interface IProps {
  autoplay?: boolean;
  infinite?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  setImageDisplay?: (image: string) => void;
  images?: string[];
}

const CarouselWrapper = styled(Carousel)`
  z-index: 1000;
  > .slick-dots li button {
    margin-top: 15px !important;
    background: var(--orange);
  }
  > .slick-dots li.slick-active button {
    background: var(--orange);
  }
  > .slick-next {
    color: var(--orange);
    font-size: 100px !important;
  }
  > .slick-prev {
    color: var(--orange);
    font-size: 40px;
  }
  .slick-dots li.slick-active::after {
    margin-top: 15px !important;
    background: var(--orange);
  }
`;

const CustomCarousel: React.FC<IProps> = (props: IProps) => {
  const {
    autoplay = false,
    infinite = true,
    slidesToScroll = 1,
    slidesToShow = 3,
    setImageDisplay,
  } = props;

  return (
    <>
      <CarouselWrapper
        autoplay={autoplay}
        arrows
        infinite={infinite}
        slidesToShow={slidesToShow}
        slidesToScroll={slidesToScroll}
      >
        {props.images?.map((item, index) => (
          <div key={index}>
            <div className="section-product-details__content-thumbnail-item">
              <Button
                className="section-product-details__content-btn"
                onClick={() => setImageDisplay && setImageDisplay(item)}
              >
                <img src={item} alt={`thumbnail-${index}`} />
              </Button>
            </div>
          </div>
        ))}
      </CarouselWrapper>
    </>
  );
};

export default CustomCarousel;

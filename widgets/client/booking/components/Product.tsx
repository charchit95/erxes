import * as React from 'react';
import { HiArrowSmLeft, HiArrowSmRight, } from 'react-icons/hi';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

import { IBookingData } from '../types';
import Slider from 'react-slick';
import { readFile } from '../../utils';
import { IProduct } from '../../types';
import Button from './common/Button';

type Props = {
  product?: IProduct;
  booking: IBookingData;
  goToBookings: () => void;
  showForm: () => void;
  showPopup: () => void;
};

function Product({
  product,
  booking,
  goToBookings,
  showForm,
  showPopup
}: Props) {
  if (!product || !booking) {
    return null;
  }

  const { widgetColor } = booking.style;

  const showFull = (img: any) => {
    const image = document.getElementById('img-active') as HTMLImageElement;
    if (image) {
      image.src = readFile(img && img.url);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <MdOutlineArrowForwardIos />,
    prevArrow: <MdOutlineArrowBackIos />,
  };

  return (
    <div className="body">
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <div className="grid-21">
        <div className="slider">
          <div className="active flex-center">
            <img
              id="img-active"
              src={readFile(product.attachment && product.attachment.url)}
              alt={product.attachment && product.attachment.name}
            />
          </div>
          <div>
            <Slider {...settings}>
              {(product.attachmentMore || []).map((img, index) => (
                <div className="slider-item flex-center" key={index} onClick={() => showFull(img)}>
                  <img
                    id={img && img.name}
                    src={readFile(img && img.url)}
                    alt={img && img.name}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div>
          <div>
            <strong>Price per unit:</strong> {product.unitPrice}
          </div>
          <div>
            <strong>Sqm:</strong> {product.sku}
          </div>
          <div>
            <strong>Floor:</strong> {product.category.name}
          </div>
          <Button
            text={'Book product'}
            type=""
            onClickHandler={() => showPopup()}
            style={{ backgroundColor: widgetColor, marginTop: '100px' }}
          />
        </div>
      </div>

      <div className="footer">
        <Button
          text="Back"
          type="back"
          onClickHandler={goToBookings}
          style={{ backgroundColor: widgetColor, left: 0 }}
        />
      </div>
    </div>
  );
}

export default Product;
import React from 'react';
import { Carousel } from 'react-bootstrap';

export const CarouselImages = (props: { items: any }) => {
  const itemDefault =
    props.items.length === 0 ? (
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
          alt="No Image"
        />
      </Carousel.Item>
    ) : null;
  return (
    <>
      <Carousel>
        {itemDefault}

        {props.items.map((item: any, index: number) => {
          return (
            <Carousel.Item key={item}>
              <img className="d-block w-100" src={item} alt={`Slide ${index + 1}`} />
              <Carousel.Caption>
                <h3>{index + 1}</h3>
                {/* <p>{item}</p> */}
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

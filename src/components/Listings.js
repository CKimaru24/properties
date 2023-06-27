// import React, { useEffect, useState, useRef } from 'react';
// import styled, { css } from 'styled-components/macro';

// import { Button } from './Button';
// import { IoMdArrowBack, IoMdArrowForward, IoMdArrowRoundForward } from 'react-icons/io';

// const ListingCard = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   max-width: 600px;
//   margin: 0 auto;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const ListingContent = styled.div`
//   flex: 1;
//   padding: 16px;
// `;

// const ListingTitle = styled.h2`
//   font-size: 24px;
//   margin-bottom: 8px;
// `;

// const ListingPrice = styled.p`
//   font-size: 18px;
//   margin-bottom: 8px;
// `;

// const ListingImages = styled.div`
//   width: 300px;
//   overflow: hidden;
// `;

// const ListingImage = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: cover;
// `;

// const Arrow = styled(IoMdArrowRoundForward)`
//   margin-left: 0.5rem;
// `;

// const SliderButtons = styled.div`
//   position: absolute;
//   bottom: 50px;
//   right: 50px;
//   display: flex;
//   z-index: 10;
// `;

// const arrowButtons = css`
//   width: 50px;
//   height: 50px;
//   color: #fff;
//   cursor: pointer;
//   background: #000d1a;
//   border-radius: 50px;
//   padding: 10px;
//   margin-right: 1rem;
//   user-select: none;
//   transition: 0.3s;

//   &:hover {
//     background: #cd853f;
//     transform: scale(1.05);
//   }
// `;

// const PrevArrow = styled(IoMdArrowBack)`
//   ${arrowButtons}
// `;

// const NextArrow = styled(IoMdArrowForward)`
//   ${arrowButtons}
// `;

// const Listings = () => {
//   const [listings, setListings] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     fetch('/listings')
//       .then((response) => response.json())
//       .then((data) => setListings(data));
//   }, []);

//   useEffect(() => {
//     const nextSlide = () => {
//       setCurrent((current) => (current === listings.length - 1 ? 0 : current + 1));
//     };

//     timeoutRef.current = setTimeout(nextSlide, 3000);

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [current, listings.length]);

//   const nextSlide = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setCurrent((current) => (current === listings.length - 1 ? 0 : current + 1));
//   };

//   const prevSlide = () => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//     setCurrent((current) => (current === 0 ? listings.length - 1 : current - 1));
//   };

//   return (
//     <div>
//       <SliderButtons>
//         <PrevArrow onClick={prevSlide} />
//         <NextArrow onClick={nextSlide} />
//       </SliderButtons>
//       {listings.map((listing, index) => (
//         <ListingCard key={index} style={{ display: index === current ? 'flex' : 'none' }}>
//           <ListingContent>
//             <ListingTitle>{listing.name}</ListingTitle>
//             <p>{listing.listingType}</p>
//             <ListingPrice>Ksh {listing.priceFrom}</ListingPrice>
//             <p>Location: {listing.town}</p>
//             <Button to={listing.path} primary="true" css={`max-width: 160px;`}>
//               {listing.label}
//               <Arrow />
//             </Button>
//           </ListingContent>
//           <ListingImages>
//             {listing.images.map((image, imageIndex) => (
//               <ListingImage
//                 key={imageIndex}
//                 src={image.url}
//                 alt={image.name}
//                 style={{ display: imageIndex === current % listing.images.length ? 'block' : 'none' }}
//               />
//             ))}
//           </ListingImages>
//         </ListingCard>
//       ))}
//     </div>
//   );
// };

// export default Listings;

import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { IoMdArrowBack, IoMdArrowForward, IoMdArrowRoundForward } from 'react-icons/io';
import { FiArrowLeft } from "react-icons/fi";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListingCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListingContent = styled.div`
  flex: 1;
  padding: 16px;
`;

const ListingTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 8px;
`;

const ListingPrice = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ListingImages = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${({ activeIndex }) => activeIndex * 100}%);
`;

const ListingImage = styled.img`
  flex: 0 0 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Arrow = styled(IoMdArrowRoundForward)`
  margin-left: 0.5rem;
`;

const SliderButtons = styled.div`
  position: absolute; /* Add this line to position the buttons */
  top: 90%; /* Adjust the top value as needed */
  transform: translateY(-50%); /* Center vertically */
  display: flex;
  justify-content: center;
  width: 100%;
`;

const arrowButtons = css`
  width: 50px;
  height: 50px;
  color: #fff;
  cursor: pointer;
  background: #000d1a;
  border-radius: 50px;
  padding: 10px;
  margin: 0 8px;
  user-select: none;
  transition: 0.3s;

  &:hover {
    background: #cd853f;
    transform: scale(1.05);
  }
`;

const H1 = styled.h1`
  text-align: center;
  color: #8f32a8;
  /* Add more styling properties as needed */
`;


const BottomRightButton = styled.button`
  position: fixed;
  // margin-left: 50%
  bottom: 20px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const PrevArrow = styled(IoMdArrowBack)`
  ${arrowButtons}
`;

const NextArrow = styled(IoMdArrowForward)`
  ${arrowButtons}
`;

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState([]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    // Navigate back
    navigate(-1);
  };

  useEffect(() => {
    fetch('/listings')
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
        setActiveImageIndex(Array(data.length).fill(0));
      });
  }, []);

  const timeoutRef = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setActiveImageIndex((activeImageIndex) =>
        activeImageIndex.map((index, i) =>
          index === listings[i].images.length - 1 ? 0 : index + 1
        )
      );
    };

    timeoutRef.current = setTimeout(nextSlide, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeImageIndex, listings]);

  const nextSlide = (index) => {
    setActiveImageIndex((activeImageIndex) =>
      activeImageIndex.map((imageIndex, i) =>
        i === index
          ? imageIndex === listings[i].images.length - 1
            ? 0
            : imageIndex + 1
          : imageIndex
      )
    );
  };

  const prevSlide = (index) => {
    setActiveImageIndex((activeImageIndex) =>
      activeImageIndex.map((imageIndex, i) =>
        i === index
          ? imageIndex === 0
            ? listings[i].images.length - 1
            : imageIndex - 1
          : imageIndex
      )
    );
  };

  

  return (
    <>
    <H1>LISTINGS</H1>
    <Container>
      {listings.map((listing, index) => (
        <ListingCard key={index}>
          <ListingContent>
            <ListingTitle>{listing.name}</ListingTitle>
            <p>{listing.listingType}</p>
            <ListingPrice>Ksh {listing.priceFrom}</ListingPrice>
            <p>Location: {listing.town}</p>
            <Button as={Link} to={`/listing/${listing.id}`}  primary="true" css={`max-width: 160px;`}>
              {listing.label}
              <Arrow />
              View Details
            </Button>
          </ListingContent>
          <ListingImages>
            <Slider activeIndex={activeImageIndex[index]}>
              {listing.images.map((image, imageIndex) => (
                <ListingImage key={imageIndex} src={image.url} alt={image.name} />
              ))}
            </Slider>
            <SliderButtons>
              <PrevArrow onClick={() => prevSlide(index)} style={{marginRight: "181px"}}/>
              <NextArrow onClick={() => nextSlide(index)} />
            </SliderButtons>
          </ListingImages>
        </ListingCard>
      ))}
    </Container>
    <BottomRightButton onClick={handleBackClick}>
        <FiArrowLeft />
        Back
    </BottomRightButton>
    </>
  );
};

export default Listings;




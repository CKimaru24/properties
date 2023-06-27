import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  margin-bottom: 16px;
`;

const SmallImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const SmallImage = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  margin-right: 8px;
  cursor: pointer;
  border: 2px solid transparent;

  ${({ isActive }) =>
    isActive &&
    `
    border-color: #000d1a;
  `}
`;

const DetailsContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;
`;

const ListingType = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const ListingName = styled.h2`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Town = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  background-color: #000d1a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  margin-left: 240px;

  &:hover {
    background-color: #cd853f;
  }
`;

const GoBackButton = styled(Button)`
  max-width: 110px;
  margin-left: auto;
  font-size: 15px;

  &:hover {
    background-color: #cd853f;
  }
  
`;

const Containers = styled.div`
  display: flex;
  margin-bottom: 16px;
  width: 600px;
  max-width: 100%;
`;

const Listing = () => {
  const { id } = useParams();
  const [listings, setListings] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  const navigate = useNavigate();

  const goBack = () => {
		navigate(-1);
	}

  useEffect(() => {
    fetch('/listings')
      .then((response) => response.json())
      .then((data) => {
        setListings(data);
      })
      .catch((error) => {
        console.log('Error fetching slides:', error);
      });
  }, []);

  useEffect(() => {
    if (listings.length > 0) {
      const listing = listings.find((item) => item.id === parseInt(id));
      setActiveImage(listing.images[0]);
    }
  }, [listings, id]);

  const handleSmallImageClick = (image) => {
    setActiveImage(image);
  };

  if (listings.length === 0) {
    return <div>Loading...</div>;
  }

  const listing = listings.find((item) => item.id === parseInt(id));

  if (!listing) {
    return <div>Listing not found</div>;
  }

  return (
    <Container>
      {activeImage && (
        <MainImage src={activeImage.url} alt={activeImage.name} />
      )}
      <SmallImageContainer>
        {listing.images.map((image) => (
          <SmallImage
            key={image.name}
            src={image.url}
            alt={image.name}
            isActive={activeImage && activeImage.name === image.name}
            onClick={() => handleSmallImageClick(image)}
          />
        ))}
      </SmallImageContainer>
      <DetailsContainer>
        <ListingType><b>{listing.listingType}:</b> Price From KSH. {listing.priceFrom}</ListingType>
        <ListingName><b>Property Name: </b>{listing.name}</ListingName>
        <Town><b>Location: </b>{listing.town}</Town>
      </DetailsContainer>
      
      <Containers>
        <Button as={Link} to={`/booking`}>Book Now</Button>
        <GoBackButton onClick={goBack}>Go Back</GoBackButton>
      </Containers>
    </Container>
  );
};

export default Listing;

import { Rating } from '@mui/material';
import React from 'react';

const RatingStars = ({ clickRating, isAuth, ratingVal, isAccessRating }) => {
  if (isAuth && isAccessRating) {
    return (
      <Rating
        name='simple-controlled'
        precision={1}
        onChange={(event, newValue) => {
          clickRating(newValue);
        }}
        size='large'
      />
    );
  } else {
    return <Rating name='read-only' value={ratingVal} readOnly size='large' />;
  }
};

export default RatingStars;

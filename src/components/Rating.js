import { Rating } from '@mui/material';
import React from 'react';

const RatingStars = ({clickRating, isAuth, ratingVal, isAccessRating}) => {
  return (
    <div>
      <Rating
        name='simple-controlled'
        precision={1}
        onChange={(event, newValue) => {
          clickRating(newValue);
        }}
        size='large'
      />
    </div>
  );
};

export default RatingStars;
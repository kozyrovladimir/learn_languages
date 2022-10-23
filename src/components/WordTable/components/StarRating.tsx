import React from 'react';

import { StarBorder } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

import { Rating } from '../../../constants/rating';

type StarRatingPropsType = {
  starAmount: Rating;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const StarRating = ({ starAmount }: StarRatingPropsType) => {
  return (
    <>
      {starAmount === Rating.high ? (
        <div>
          <StarIcon sx={{ color: 'gold' }} />
          <StarIcon sx={{ color: 'gold' }} />
          <StarIcon sx={{ color: 'gold' }} />
        </div>
      ) : starAmount === Rating.medium ? (
        <div>
          <StarIcon sx={{ color: 'gold' }} />
          <StarIcon sx={{ color: 'gold' }} />
          <StarBorder sx={{ color: 'gold' }} />
        </div>
      ) : starAmount === Rating.low ? (
        <div>
          <StarIcon sx={{ color: 'gold' }} />
          <StarBorder sx={{ color: 'gold' }} />
          <StarBorder sx={{ color: 'gold' }} />
        </div>
      ) : (
        <div>
          <StarBorder sx={{ color: 'gold' }} />
          <StarBorder sx={{ color: 'gold' }} />
          <StarBorder sx={{ color: 'gold' }} />
        </div>
      )}
    </>
  );
};

export default StarRating;

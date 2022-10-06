import React from 'react';

import { StarBorder } from '@mui/icons-material';
import StarIcon from '@mui/icons-material/Star';

import { highRating, lowRating, mediumRating } from '../../../constants/rating';
import { RatingType } from '../../../store/reducers/words-store';

type StarRatingPropsType = {
  starAmount: RatingType;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const StarRating = ({ starAmount }: StarRatingPropsType) => {
  return (
    <>
      {starAmount === highRating ? (
        <div>
          <StarIcon sx={{ color: 'gold' }} />
          <StarIcon sx={{ color: 'gold' }} />
          <StarIcon sx={{ color: 'gold' }} />
        </div>
      ) : starAmount === mediumRating ? (
        <div>
          <StarIcon sx={{ color: 'gold' }} />
          <StarIcon sx={{ color: 'gold' }} />
          <StarBorder sx={{ color: 'gold' }} />
        </div>
      ) : starAmount === lowRating ? (
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

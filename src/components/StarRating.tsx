import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import {RatingType} from "../store/reducers/words-store";
import {StarBorder} from "@mui/icons-material";

type StarRatingPropsType = {
    starAmount: RatingType
}

const StarRating = ({starAmount}: StarRatingPropsType) => {
    return (
        <>
            {starAmount === 3 ?
                <div>
                    <StarIcon sx={{color: 'gold'}}/>
                    <StarIcon sx={{color: 'gold'}}/>
                    <StarIcon sx={{color: 'gold'}}/>
                </div>
                :
                starAmount === 2 ?
                <div>
                    <StarIcon sx={{color: 'gold'}}/>
                    <StarIcon sx={{color: 'gold'}}/>
                    <StarBorder sx={{color: 'gold'}}/>
                </div>
                :
                starAmount === 1 ?
                <div>
                    <StarIcon sx={{color: 'gold'}}/>
                    <StarBorder sx={{color: 'gold'}}/>
                    <StarBorder sx={{color: 'gold'}}/>
                </div>
                :
                    <div>
                        <StarBorder sx={{color: 'gold'}}/>
                        <StarBorder sx={{color: 'gold'}}/>
                        <StarBorder sx={{color: 'gold'}}/>
                    </div>
            }
        </>
    );
};

export default StarRating;

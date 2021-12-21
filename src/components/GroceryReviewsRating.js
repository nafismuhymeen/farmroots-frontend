import React from 'react';

export default function GroceryReviewsRating(props) {
    return <div className="grocery-reviews-rating-box">
        <div className="grocery-reviews-rating-stars" style={{width: `${props.value}%`}}></div>
    </div>
}
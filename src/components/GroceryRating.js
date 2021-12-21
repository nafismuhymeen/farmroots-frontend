import React from 'react';

export default function GroceryRating(props) {
    return <div className="grocery-rating-box">
        <div className="grocery-rating" style={{width: `${props.value}%`}}></div>
    </div>
}
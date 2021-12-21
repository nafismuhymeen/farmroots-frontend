import React from 'react';

export default function Rating(props) {
    return <div className="rating-box">
        <div className="rating" style={{width: `${props.value}%`}}></div>
    </div>
}
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPartner } from '../actions/partnerActions';
import Header from '../components/Header';

function PartnerScreen(props) {

    const dispatch = useDispatch();

    const partnerGet = useSelector(state => state.partnerGet);
    const {loading, partner, error} = partnerGet;

    useEffect (() => {
        dispatch(getPartner());
        return () => {
            //
        };
    }, []);

    return <div className="grid">

        <div className="grid-header">
            <Header></Header>
        </div>

        <div className="main">
            {loading ? <div></div> : 
            error ? <div>{error.message}</div> : 
            <>
                <img className="partner-top-image" src={partner.topImage}></img>
                {partner.partnerContent && partner.partnerContent.map((content, index) => ( 
                index % 2 === 0 ? <div className="partner">
                    <img src={content.image} className="partner-image"></img>
                    <div className="partner-content">
                        <div className="partner-name">{content.name}</div>
                        <div className="partner-text">{content.info}</div>
                    </div>
                </div> : <div className="partner">
                    <div className="partner-content">
                        <div className="partner-name">{content.name}</div>
                        <div className="partner-text">{content.info}</div>
                    </div>
                    <img src={content.image} className="partner-image"></img>
                </div>))}
            </>}
        </div>
    </div>
}

export default PartnerScreen
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExports } from '../actions/exportsActions';
import Header from '../components/Header';

function ExportsScreen(props) {

    const dispatch = useDispatch();

    const exportsGet = useSelector(state => state.exportsGet);
    const {loading, exports, error} = exportsGet;

    useEffect (() => {
        dispatch(getExports());
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
                <img className="exports-top-image" src={exports.topImage}></img>
                {exports.exportsContent && exports.exportsContent.map((content, index) => ( 
                index % 2 === 0 ? <div className="exports">
                    <img src={content.image} className="exports-image"></img>
                    <div className="exports-content">
                        <div className="exports-name">{content.name}</div>
                        <div className="exports-text">{content.info}</div>
                    </div>
                </div> : <div className="exports">
                    <div className="exports-content">
                        <div className="exports-name">{content.name}</div>
                        <div className="exports-text">{content.info}</div>
                    </div>
                    <img src={content.image} className="exports-image"></img>
                </div>))}
            </>}
        </div>
    </div>
}

export default ExportsScreen
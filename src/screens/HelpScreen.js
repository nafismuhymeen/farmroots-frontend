import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listHelp } from '../actions/helpActions';
import Header from '../components/Header';

function HelpScreen(props) {

    const dispatch = useDispatch();

    var type = props.match.params.id;
    const helpList = useSelector(state => state.helpList);
    const { loading, help, error } = helpList;


    useEffect(() => {

        dispatch(listHelp(type));
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
                    <div className="help-content">
                        <div className="help-heading">{help.heading}</div>
                        <div className="help-text">{help.content}</div>
                    </div>}
        </div>
    </div>
}

export default HelpScreen
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlog } from '../actions/blogActions';
import Header from '../components/Header';

function BlogScreen(props) {

    const dispatch = useDispatch();

    const blogGet = useSelector(state => state.blogGet);
    const {loading, blog, error} = blogGet;

    useEffect (() => {
        dispatch(getBlog());
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
                <img className="blog-top-image" src={blog.topImage}></img>
                {blog.blogContent && blog.blogContent.map((content, index) => ( 
                index % 2 === 0 ? <div className="blog">
                    <img src={content.image} className="blog-image"></img>
                    <div className="blog-content">
                        <div className="blog-name">{content.name}</div>
                        <div className="blog-text">{content.info}</div>
                    </div>
                </div> : <div className="blog">
                    <div className="blog-content">
                        <div className="blog-name">{content.name}</div>
                        <div className="blog-text">{content.info}</div>
                    </div>
                    <img src={content.image} className="blog-image"></img>
                </div>))}
            </>}
        </div>
    </div>
}

export default BlogScreen
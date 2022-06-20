import React from "react";
import '../css/Blog.css'
import '../css/block.css'
import '../css/Checklist.css'

function Blog() {
    return (
    <div className="blog_container">
        <form className="blog block block_white" id="blog">
            <div className="blog__inputarea">
                <label className="checklist__label blog__label" htmlFor="blogheader">Title:</label>
                <input className="blog__input blog__input_header checklist__input" type="text" id="blogheader" placeholder="Name your story..."/>
                <textarea className="blog__input blog__input_text checklist__input" type="text" id="blogtext" rows="5" placeholder="Tell us what happened..."></textarea>
            </div>
            <button className="story__button button">Post your story</button>
        </form>
        <div className="blog__controls_container block block_pink">
            <div className="blog__search_container">
                <label className="checklist__label" htmlFor="searchbar" >search:</label>
                <input className="blog__searchbar checklist__input" type="text" id="searchbar"/>
            </div>
            <div className="blog__button_container">
                <button className="blog__sort_button blog__sort_sortby">Sort by</button>
                <button className="blog__sort_button blog__sort_abc">ABC</button>
                <button className="blog__sort_button blog__sort_date">Date</button>
            </div>
        </div>
        <div className="blog__posts block block_white"></div>
    </div>
    );
}

export default Blog
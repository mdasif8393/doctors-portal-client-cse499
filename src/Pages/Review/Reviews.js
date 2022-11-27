import React, { useEffect, useState } from 'react';
import Review from './Review';
import quote from '../../assets/icons/quote.svg'

const Reviews = () => {
    const [allReviews, setAllReviews] = useState([]);

    useEffect(()=> {
        fetch("http://localhost:5000/review")
        .then(res => res.json())
        .then(data => setAllReviews(data))
    },[])
    return (
        <section className="my-28">
            <div className="flex justify-between">
                <div>
                    <h4 className="text-xl text-primary font-bold">Testimonials</h4>
                    <h2 className="text-3xl">What our patients say</h2>
                </div>
                <div>
                    <img className=" w-28 lg:w-48" src={quote} alt="" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    allReviews.map(reviews => <Review key={reviews._id} reviews={reviews} ></Review>)
                }
            </div>
        </section>
    );
};

export default Reviews;
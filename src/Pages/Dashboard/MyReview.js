import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const MyReview = () => {
    const [user] = useAuthState(auth);
    const [review, setReview] = useState("");

    const userReview = {
        user: user?.displayName,
        photoUrl: user?.photoURL,
        review: review,
    }

    const handleText = (e) => {
        setReview(e.target.value);
    }


    const handleFormSubmit = (e) => {
        console.log(userReview)
        e.preventDefault();
        if (userReview?.review?.length < 4) {
            toast.error("Please write more about us")
        }
        else {
            //send to your database
            fetch("http://localhost:5000/review", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userReview)
            })
                .then(res => res.json())
                .then(inserted => {
                    if (inserted.insertedId) {
                        toast.success("Your Review is successfully addedsss");
                    }
                    else {
                        toast.error("Failed to add review")
                    }
                })
                
        }

    }
    return (
        <div className="grid justify-items-center mt-10">
            <form onSubmit={handleFormSubmit} onChange={handleText} action="">
                <textarea className="textarea textarea-accent w-96 h-52" placeholder="Write Your Review Here"></textarea> <br /> <br />
                <input className="btn btn-accent btn-block" type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default MyReview;
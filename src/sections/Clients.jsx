import React from 'react'
import {clientReviews} from "../constants/index.js";

const Clients = () => {
    return (
        <section className="c-space my-20" id="clients">
            <h3 className="head-text">
                Testimonials
            </h3>
            <div className="client-container">
                {clientReviews.map(({id, name, review, img, position}) => (
                    <div key ={id} className="client-review">
                        <div>
                            <p className="text-white font-light
                            ">{review}</p>
                            <div className="client-content">
                                <div className="flex gap-3">
                                    <img src={img} alt={name} className="w-12 h-12 rounded-full shadow-sm"/>
                                    <div className="flex flex-col">
                                        <p className="text-white-800 font-semibold">
                                            {name}
                                        </p>
                                        <p className="text-white-500 md:text-base text-sm ">
                                            {position}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex self-end items-center gap-2">
                                    {Array.from({length:5}).map((_,index)=> (
                                        <img key={index} src="/assets/star.png" alt="star" className="w-3 h-3"/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Clients
import BookModel from "../../../models/BookModel"
import React from "react";
import {Link} from "react-router-dom";

export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2 row-sm-1'>
                    <div className='d-none d-lg-block'>
                        {props.book.img ?
                            <img src={props.book.img}
                                 width='123'
                                 height='196'
                                 alt='Book'
                            />
                            :
                            <img src='../../../../images/BooksImages/book-default-img.png'
                                 width='123'
                                 height='196'
                                 alt='Book'
                            />
                        }
                    </div>

                    {/* for mobile */}
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.book.img ?
                            <img src={props.book.img}
                                 width='123'
                                 height='196'
                                 alt='Book'
                            />
                            :
                            <img src='../../../../images/BooksImages/book-default-img.png'
                                 width='123'
                                 height='196'
                                 alt='Book'
                            />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.book.author}
                        </h5>
                        <h4>
                            {props.book.title}
                        </h4>
                        <p className='card-text'>
                            {props.book.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    {/* redirect with param */}
                    <Link
                        className='btn btn-md main-color text-white'
                        to={`/checkout/${props.book.id}`}
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
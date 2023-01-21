import React from 'react';
import { Link } from "react-router-dom";


export default function Blog () {
    return (
        <div className="container">
            <ul>
                <li>
                    <Link to="/blog/1">Post one</Link>
                </li>
                <li>
                    <Link to="/blog/2">Post two</Link>
                </li>
            </ul>
        </div>
    )
}
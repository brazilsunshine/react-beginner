import React from 'react';
import {useParams} from "react-router-dom";

export default function BlogPost () {
    const params = useParams();
    // useParams returns an object of key/value pairs coming from the dynamic params from the current URL
    // this dynamic param in this case is coming from the URL /blog/:id

    return (
        <div className="container">
            this is blog post {params.id}
        </div>
    )
}
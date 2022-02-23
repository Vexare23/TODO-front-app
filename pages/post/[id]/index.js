import {useRouter} from "next/router";
import React from "react";
import Home from "../../index";

const Post = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <>
            <Home/>
            <h1>TODO: {id}</h1>
        </>
    )
};
 export default Post;

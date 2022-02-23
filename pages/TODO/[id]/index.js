import {useRouter} from "next/router";
import React from "react";
import Header from "../../../assets/js/components/Index/Header";
import ShowTodo from "../../../assets/js/components/ShowTodo/TodoShowDetails";
import Footer from "../../../assets/js/components/Index/Footer";

const TodoShow = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <>
            <Header/>
            <h1>TODO: {id}</h1>
            <ShowTodo/>
            <Footer/>
        </>
    )
};

export default TodoShow;

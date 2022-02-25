import {useRouter} from "next/router";
import Header from "../../../assets/js/components/Index/Header";
import Footer from "../../../assets/js/components/Index/Footer";
import React from "react";
import RecordTodo from "../../../assets/js/TodoShowReccord";

const TodoRecord = () => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <>
            <Header/>
            <h1>TODO: {id}</h1>
            <RecordTodo/>
            <Footer/>
        </>
    )
};

export default TodoRecord;

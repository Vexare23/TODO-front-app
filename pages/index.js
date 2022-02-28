import FilterTodo from "../assets/js/components/Index/newIndexFilter";
import Header from "../assets/js/components/Index/Header";
import Footer from "../assets/js/components/Index/Footer";
import React from "react";
import {useUser} from "@auth0/nextjs-auth0";

export default function Home() {
    const { user, isLoading } = useUser();

    return (
            <>
                <Header/>
                {user && (
                    <FilterTodo/>
                )}
                {!user && !isLoading &&(
                    <>
                    <customTitle>
                        Loading...
                    </customTitle>
                    </>
                )}
                <Footer/>

            </>
        )
}




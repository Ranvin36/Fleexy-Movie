import React from "react"
import Logo from "./logo"

function PreLoader(){
    return(
        <div className="preloader">
            <h1 className="logo-preloader"><Logo size={50}/></h1>
        </div>
)
}

export default PreLoader
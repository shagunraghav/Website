import React from "react";
import Header from "../Common/Header";
import image from "../assets/img/header-bg.jpg";

// Re-usable components
import Services from "../Common/Services";
import Portfolio from "../Common/Portfolio"; 
import TimeLine from "../Common/TimeLine";
import Team from "../Common/Team";


class Home extends React.Component{
    render(){
return(
    <div>
        <Header
            title="Welcome To Our Studio!"
            subtitle="IT's NICE TO MEET YOU"
            buttonText="Tell me more"
            link="/services"
            showButton={true}
            image={image}
        />
        <Services/>
        <Portfolio/>
        <TimeLine/>
        <Team/>
    </div>
);

    }

}


export default Home;
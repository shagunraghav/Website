import React from 'react';
import Field from '../Common/Field';
import {withFormik} from "formik";
import * as Yup from 'yup';


const fields={
    section:[
        [
        {name:'name', elementName:'input',type:'text',placeholder:'Your name'},
        {name:'email', elementName:'input',type:'email',placeholder:'Your email'},
        {name:'phone', elementName:'input',type:'text',placeholder:'Your phone number'}
    ],
    [
        {name:'message', elementName:'textarea',type:'text',placeholder:'type your message'}
        
        ]
    ]

}



class Contact extends React.Component{



    render(){
        return(
            <section className="page-section" id="contact">
            <div className="container">
                <div className="text-center">
                    <h2 className="section-heading text-uppercase">Contact Us</h2>
                    <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                </div>
                <form onSubmit={this.props.handleSubmit} id="contactForm" name="sentMessage" novalidate="novalidate">
                    <div className="row align-items-stretch mb-5">

                        {fields.section.map((section,sectionIndex)=>{
                            return(
                                <div className='col-md-6' key={sectionIndex}>
                                    {section.map((field,i)=>
                                    {
                                        return <Field {...field} key={i}
                                            value={this.props.values[field.name]}
                                            name={field.name}
                                            onChange={this.props.handleChange}
                                            onBlur={this.props.handleBlur}
                                            touched={(this.props.touched[field.name])}
                                            errors={this.props.errors[field.name]}
                                        />
                                    })}
                                    </div>
                            )
                        })}



                    </div>
                    <div className="text-center">
                        <div id="success"></div>
                        <button className="btn btn-primary btn-xl text-uppercase"
                         id="sendMessageButton" type="submit"
                         
                         >Send Message</button>
                    </div>
                </form>
            </div>
        </section>
        )
    }

}



export default withFormik({
    mapPropsToValues:()=>({
        name:'',
        email:'',
        phone:'',
        message:'',
    }),
   validationSchema:Yup.object().shape({
        name: Yup.string().min(3,"atleast 3letter name").required("You must give us your name"),
        email: Yup.string().email("you neeed to give a valid email").required("we need your email."),
        phone:Yup.string()
        .min(10,"Enter a valid phone number")
        .max(15,"too long phone number")
        .required("Enter your phone number"),

        message: Yup.string().min(20,"you need to provide us more details")
        .required("Deatils are reqired")

    }),
    handleSubmit: (values,{setSubmitting})=>{
        console.log("values",values)
        alert("You submitted the form",JSON.stringify(values));
    }

})(Contact);
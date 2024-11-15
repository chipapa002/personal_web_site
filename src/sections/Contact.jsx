import React, {useRef, useState} from 'react'
import emailjs from '@emailjs/browser'


const Contact = () => {

    const formRef = useRef()


    const [loading, setLoading] = useState(false)
    
    const [form, setForm] = useState({
        name:"",
        email:"",
        message:""
    })

    const handleChange = ({target:{name,value}}) => {
        setForm({...form, [name]: value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
        await emailjs.send(
            "service_hkq30rn",
            "template_ah2c0ua",
            {from_name: form.name,
            to_name: "Nndamulele",
            from_email: form.email,
            to_email: "nndamulelechip18@gmail.com",
            message: form.message,
            },
            'kQb-XP7qe8AmPWfDp');
        setLoading(false);
            alert("Your email has been sent successfully!");
            setForm({
                name: "",
                email: "",
                message: "",
            })
        } catch (error){
            setLoading(false);
            console.log(error);
            alert("Something went wrong");
        }
    }

    return (
        <section className="c-space my-20 hero-background" id="contact" >
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src={"/assets/terminal.png"} alt="terminal" className="absolute  h-full" />
                <div className="contact-container pt-20 pb-20">
                    <h3 className="head-text">
                        Contact Me
                    </h3>
                    <p className="text-lg text-white-600 mt-3">
                        Do you want to build unique web or mobile applications
                        that will solve a specific problem? well, look no further I am here to help.</p>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">Full Name</span>
                            <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="field-input"
                            placeholder="Nndamulele Tshipapa"/>

                        </label>
                        <label className="space-y-3">
                            <span className="field-label">Email</span>
                            <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="field-input"
                            placeholder="nndamulelechip18@gmail.com"/>

                        </label>
                        <label className="space-y-3">
                            <span className="field-label">Your Message</span>
                            <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            className="field-input"
                            placeholder="Hi, I'm interested in..."/>
                        </label>
                        <button type="submit" className="field-btn" disabled={loading}>
                            {loading? "Sending..." : "Send Message"}
                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow"/>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Contact;

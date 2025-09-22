import { education } from "../constants/index.js";
import Button from '../components/Button.jsx';

const Education = () => {
    return (
        <section className="c-space my-20" id="education">
            <div className="w-full text-white-600">
                <p className="head-text">Education</p>

                <div className="pt-10">
                    <div className="work-content">
                        <div className="sm:py-10 py-5 sm:px-5 px-2.5">
                            {education.map((item, index) => (
                                <div
                                    key={index}
                                    className="work-content_container group">
                                    <div className="flex flex-col h-full justify-start items-center py-2 rounded-lg">
                                        <div className="work-content_logo">
                                            <img className="w-full h-full" src={item.icon} alt={item.name} />
                                        </div>

                                        <div className="work-content_bar" />
                                    </div>

                                    <div className="sm:p-5 px-2.5 py-5">
                                        <p className="font-bold text-white-800">{item.name}</p>
                                        <p className="text-sm mb-5">
                                            {item.pos} -- <span>{item.duration}</span>
                                        </p>
                                        <p className="group-hover:text-white transition-all ease-in-out duration-500">{item.title}</p>
                                        {item.certificate && (
                                            <a
                                                href={item.certificate}
                                                download
                                                className=" inline-block "
                                            >
                                               
                                            <Button name='Download Certificate' isBeam containerClass='w-full mt-5'/>
                        
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
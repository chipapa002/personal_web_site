import React from 'react'

const Footer = () => {
    return (
        <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="flex gap-3">
                <a
                    href="https://github.com/chipapa002"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                <div className="social-icon">
                    <img src="/assets/github.svg" alt="github" className="w-1/2 h-1/2"/>
                </div>
                </a>
                <a
                    href="https://www.linkedin.com/in/nndamulele-tshipapa-19516024b"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                <div className="social-icon">
                    <img src="/assets/linkedin.png" alt="instagram" className="w-1/2 h-1/2"/>
                </div>
                </a>
            </div>
            <p
            className="text-white-500">© 2024 Nndamulele Tshipapa. All rights reserved

            </p>
        </section>
    )
}
export default Footer

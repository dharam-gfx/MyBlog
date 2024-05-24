import React, { useState } from 'react';
import { Button } from '../pages';

const ScrollButton = () => {

    const [visible, setVisible] = useState( false )

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if ( scrolled > 300 ) {
            setVisible( true )
        }
        else if ( scrolled <= 300 ) {
            setVisible( false )
        }
    };

    const scrollToTop = () => {
        window.scrollTo( {
            top: 0,
            behavior: 'smooth'
        } );
    };

    window.addEventListener( 'scroll', toggleVisible );

    return (
        <div className={`${visible ? 'block' : 'hidden'}  fixed right-5 bottom-5 md:bottom-8 md:right-8`}  >
            <Button className={` relative w-12 h-12  rounded-full focus:ring-0 transition-colors `} onClick={scrollToTop}  >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute bottom-3 right-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                </svg>
            </Button>
        </div>
    );
}

export default ScrollButton; 
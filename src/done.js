import { useState,useEffect } from "react";


export function Done({setState }) {
    const [isSend,setIsSend]=useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSend(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
    useEffect(() => {
        const timer = setTimeout(() => {
            setState('select');
        }, 7000);
        return () => clearTimeout(timer);
    }, []);
    if (isSend)
        return <div className='box300'>
            <img src='./upload_anim.gif' className='uploadimg' />
            <p className="donetext">finish! uploading to database...</p>
        </div>
    else
        return <div className='box300'>
            <img src='./verified.gif' className='uploadimg' />
            <p className="donetext">finish! uploading to database...</p>
        </div>
}
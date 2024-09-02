import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'


const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

export function Dropfile({ setState,setImageSrc}) {
    const onDrop = useCallback(async acceptedFiles => {
        console.log(acceptedFiles);
        setState('processing');
        console.log('state change processing')
        await sleep(3000);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(acceptedFiles[0]);
        setState('processingdone');
        console.log('state change processingdone')
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div className='box300'>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    <div className={isDragActive ? 'uploadzoneselected' : 'uploadzone'}>
                        <img src='./upload.png' className='uploadimg'></img>
                        <p className='uploadzonetext'>upload file here</p>
                    </div>
                }
            </div>
        </div>
    )
}
import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({urlImage, box}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' src={urlImage} alt='' width='500px' height='auto' />
                <div className='bounding-box'></div>
            </div>
        </div>
    );
};

export default FaceRecognition;
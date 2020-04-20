import React from 'react';
import Tilt from 'react-vanilla-tilt'
import './Logo.css';
import brain from './brain.png';

class Logo extends React.Component{
    render() {
        return (
            <div>
                <div className='ma4 mt0'>
                    <Tilt ref={this.wrapper} className="Tilt br2 shadow-2" options={{max:25}} style={{height:150, width:150}}>
                        <div className="Tilt-inner pa3"> 
                            <img style={{paddingTop:'5px'}} src={brain} alt='logo'/>
                        </div>
                    </Tilt>
                </div>
            </div>
        );
    }
}

export default Logo;
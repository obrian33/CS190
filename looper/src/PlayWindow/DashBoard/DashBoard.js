import React from 'react';


class DashBoard extends React.Component {

    render() {
        const title = "Music Looper";
        const instruments = ['guitar', 'drum', 'microphone', 'piano', 'bass'];

        return (<div className="row nav-background">
            <div className="col">
                <h3>{title}</h3>
            </div>
            {instruments.map((instrument, i) => {
                return <div key={i} className="col">
                    <img alt="" onClick={() => { this.props.changeInstrument(instrument) }} className="thing" src={`./assets/${instrument}.svg`}>
                    </img>
                </div>
            })}
        </div>


        );
    }
}

export default DashBoard;
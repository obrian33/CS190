import React from 'react';

class DashBoard extends React.Component {
    
    render() {
        const title = "Music Looper";

        return (<div className="row nav-background">
            <div className="col other-color">
                <h3>{title}</h3>
            </div>
            {this.props.instruments.map((instrument, i) => {
                return <div key={i} className="col other-color">
                    <img alt="" onClick={() => { this.props.changeInstrument(instrument) }} className="thing" src={`./assets/${instrument.id}.svg`}>
                    </img>
                    <div>{instrument.id}</div>
                </div>
            })}
        </div>
        );
    }
}

export default DashBoard;
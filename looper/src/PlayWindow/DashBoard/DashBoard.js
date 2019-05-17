import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class DashBoard extends React.Component {

    render() {
        const title = "Music Looper";
        return (<div className="row">
            <div className="col"> {title}</div>
            <div className="col">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <i onClick={() => this.props.changeInstrument('guitar')}> <FontAwesomeIcon className="fa-3x" icon="guitar" /></i>
                            <i onClick={() => this.props.changeInstrument('drums')}> <FontAwesomeIcon className="fa-3x" icon="drum" /></i>
                            <i> <FontAwesomeIcon className="fa-3x" icon="microphone" /></i>
                        </div>
                    </div>
                </nav>
            </div>
        </div>


        );
    }
}

export default DashBoard;
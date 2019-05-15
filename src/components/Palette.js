import React, { Component } from 'react';

const styles = {
    pink: {
        backgroundColor: '#FBD6C6',
    },
    yellow : {
        backgroundColor: 'yellow',
    },
    green : {
        backgroundColor: 'green',
    }
}
class Palette extends Component {
    render() {
        return (
            <div className="palette-container">
            
                <div className="palette-item" id="#FBD6C6" onClick={this.props.change} style={styles.pink}></div>
                <div className="palette-item" id="yellow" onClick={this.props.change} style={styles.yellow}></div>
                <div className="palette-item" id="green" onClick={this.props.change} style={styles.green}></div>
     
            </div>
        );
    }
}

export default Palette;

import React from 'react';
import CountryData from './CountryData';

class Country extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
        }

        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    toggleDisplay(e) {
        e.stopPropagation();
        const currentState = this.state.hidden;
        this.setState({ hidden: !currentState });
    }

    render() {
        const data = this.props.data;
        return(
            <li
                className="country"
                onClick={this.toggleDisplay}>
                <h3 className="country-title">{data.name}</h3>
                <CountryData data={data} hidden={this.state.hidden} />
            </li>

        );
    }
}

export default Country;
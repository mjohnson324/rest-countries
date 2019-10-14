import React from 'react';
import Country from './Country';
import { checkHidden } from './utility';

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            countries: [],
        }

        this.toggleDisplay = this.toggleDisplay.bind(this);
    }

    toggleDisplay() {
        const currentState = this.state.hidden;
        this.setState({ hidden: !currentState });
    }

    componentDidMount() {
        const region = this.props.region;
        fetch(`https://restcountries.eu/rest/v2/region/${region}`)
        .then(response => {
            return response.json();
        }).then(json => {
            this.setState({ countries: json });
        });
    }
    // Add buttons for population and name sorting, extra toggle for ascending and descending
    render() {
        const name = this.props.region;
        const { countries, hidden } = this.state;
        return (
            <li className="region" onClick={this.toggleDisplay}>
                <h2 className="region-title">
                    {name[0].toUpperCase() + name.slice(1)}
                </h2>
                <ul>
                    {countries.map(country => {
                        return <Country key={country.alpha3Code} data={country} hidden={hidden} />;
                    })}
                </ul>
            </li>
        );
    }
}

export default Region;

// Selecting a region shows a list of countries. Make countries sortable by name and
// population density, ascending and descending

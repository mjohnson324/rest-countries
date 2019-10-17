import React from 'react';
import Country from './Country';
import { checkHidden } from './utility';

class Region extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            countries: [],
            sortedByNameNotPopulation: true,
            sortDescending: false,
        }

        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.sortData = this.sortData.bind(this);
        this.order = this.order.bind(this);
        this.alreadySorted = this.alreadySorted.bind(this);
    }

    toggleDisplay() {
        const currentState = this.state.hidden;
        this.setState({ hidden: !currentState });
    }

    sortData(e) {
        e.stopPropagation();
        const { countries, sortedByNameNotPopulation } = this.state;
        let sortedCountries;
        if (sortedByNameNotPopulation) {
            sortedCountries = countries.sort(comparePopulationDensities);
        } else {
            sortedCountries = countries.sort(compareNames);
        }
        this.setState({
            countries: sortedCountries,
            sortedByNameNotPopulation: !sortedByNameNotPopulation,
        });
    }

    order(e) {
        e.stopPropagation();
        const { countries, sortDescending } = this.state;
        const reversedCountries = countries.reverse();
        this.setState({
            countries: reversedCountries,
            sortDescending: !sortDescending,
        });
    }

    alreadySorted(status) {
        return status ? true: false;
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

    render() {
        const name = this.props.region;
        const { countries, hidden, sortedByNameNotPopulation, sortDescending } = this.state;
        return (
            <li className="region" onClick={this.toggleDisplay}>
                <h2 className="region-title">
                    {name[0].toUpperCase() + name.slice(1)}
                </h2>
                <h3 className={`${checkHidden(hidden)}`}>
                    Sort countries by:
                </h3>
                <div className="sort-buttons">
                    <button
                        className={`${checkHidden(hidden)}`}
                        disabled={this.alreadySorted(sortedByNameNotPopulation)}
                        onClick={this.sortData}>
                        name
                    </button>
                    <button
                        className={`${checkHidden(hidden)}`}
                        disabled={this.alreadySorted(!sortedByNameNotPopulation)}
                        onClick={this.sortData}>
                        population Density
                    </button>
                    <button
                        className={`${checkHidden(hidden)}`}
                        disabled={this.alreadySorted(!sortDescending)}
                        onClick={this.order}>
                        ascending
                    </button>
                    <button
                        className={`${checkHidden(hidden)}`}
                        disabled={this.alreadySorted(sortDescending)}
                        onClick={this.order}>
                        descending
                    </button>
                </div>
                <ul className={`${checkHidden(hidden)}`}>
                    {countries.map(country => {
                        return <Country key={country.alpha3Code} data={country} />;
                    })}
                </ul>
            </li>
        );
    }
}

function compareNames(countryOne, countryTwo) {
    if (countryOne.name < countryTwo.name) {
        return -1;
    } else if (countryOne.name > countryTwo.name) {
        return 1;
    }
    return 0;
}

function comparePopulationDensities(countryOne, countryTwo) {
    const densityOne = countryOne.population / countryOne.area;
    const densityTwo = countryTwo.population / countryTwo.area;
    if (densityOne < densityTwo) {
        return -1;
    } else if (densityOne > densityTwo) {
        return 1;
    }
    return 0;
}

export default Region;

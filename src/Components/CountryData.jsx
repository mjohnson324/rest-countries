import React from 'react';
import { checkHidden } from './utility';

// "flag": "https://restcountries.eu/data/{alpha3Code}.svg"

function concatEntries(data) {
    let nameString = "";
        data.forEach(entry => nameString += entry.name + ", ");
    return nameString;
}

function CountryData({ hidden, data })  {
    const callingCodes = data.callingCodes.join(", ");
    const coordinates = data.latlng.join(", ");
    const timeZones = data.timezones.join(", ");
    const localNations = data.borders.join(", ");
    const currencies = concatEntries(data.currencies);
    const languages = concatEntries(data.languages);
    return(
        <ul className={`country-data ${checkHidden(hidden)}`}>
            <li><b>Calling Codes:</b> {callingCodes}</li>
            <li><b>Capital:</b> {data.capital}</li>
            <li><b>Subregion:</b> {data.subregion}</li>
            <li><b>Population:</b> {data.population}</li>
            <li><b>Coordinates:</b> {coordinates}</li>
            <li><b>Area (square km):</b> {data.area}</li>
            <li><b>Timezones:</b> {timeZones}</li>
            <li><b>Bordering nations:</b> {localNations}</li>
            <li><b>Numeric Code:</b> {data.numericCode}</li>
            <li><b>Currencies:</b> {currencies}</li>
            <li><b>Languages:</b> {languages}</li>
        </ul>
    );
}

export default CountryData;
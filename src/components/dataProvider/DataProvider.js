import {getFeed} from 'utils/utils';

class DataProvider {

    constructor(category) {
        return new Promise((resolve, reject) => {
            getFeed(`http://www.nu.nl/rss/${category}`)
                .then(data => this._processData(data))
                .then(processedData => resolve(processedData))
                .catch(err => reject(err))
        })
    }

    _processData(data) {

        const words = data.feed.entries.map(entry => {
            const unwantedChars = /[.,()"']/g;
            return entry.title.replace(unwantedChars, '');
        }).join(' ').split(' ');

        return words;
    }

}

export default DataProvider;

// getData methode ipv direct in constructor
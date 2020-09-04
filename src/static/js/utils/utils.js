import RSS from 'rss-parser';
const rss = new RSS()

export function getFeed(url) {
    return new Promise((resolve, reject) => {
        rss.parseURL(url, (error, data) => {
            error ? reject(error) : resolve(data);
        });
    });

}

export function targetIsElement(target, element) {
    return target.tagName.toLowerCase() === element;
}
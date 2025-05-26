export const buildQueryString = (dataToSend) => {
    // Create an array of key-value pairs
    const queryStringArray = Object.entries(dataToSend)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    // Join the array with "&" to form the final query string
    const queryString = queryStringArray.join('&');

    return queryString;
}
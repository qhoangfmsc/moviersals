
export default async function getUSDConversionRate() {
    const url = "https://open.er-api.com/v6/latest/USD";
    return fetch(url).then((response) => {
        return response.json();
    }).catch((error) => {
        console.error("USD API Convert Request Error:", error);
    });
}
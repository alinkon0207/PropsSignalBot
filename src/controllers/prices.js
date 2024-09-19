
import axios from "axios";


const requestInterval = 0 /* 100 */; // 100ms -> 850ms

const prices = new Map();


const fetchBTCPrice = async () => {
    try {
        const response = await axios.get('https://api.coinbase.com/v2/prices/spot?currency=USD');
        // console.log('response.data:', response.data);
        
        const newBtcPrice = Number(response.data.data.amount);
        prices.set('BTC', newBtcPrice);
        
        // console.log('BTC Price in USD:', btcPrice, Date.now() / 1000);
    } catch (err) {
        console.error('Error fetching BTC price:', err.message);
    } finally {
        setTimeout(fetchBTCPrice, requestInterval);
    }
};

const fetchETHPrice = async () => {
    try {
        const response = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot');
        // console.log('response.data:', response.data);

        const newEthPrice = Number(response.data.price);
        prices.set('ETH', newEthPrice);

        // console.log('ETH Price in USD:', ethPrice, Date.now() / 1000);
    } catch (err) {
        console.error('Error fetching ETH price:', err.message);
    } finally {
        setTimeout(fetchETHPrice, requestInterval);
    }
};

const fetchSOLPrice = async () => {
    try {
        const response = await axios.get('https://api.coinbase.com/v2/prices/SOL-USD/spot');
        // console.log('response.data:', response.data);
        
        const newSolPrice = Number(response.data.data.amount);
        prices.set('SOL', newSolPrice);

        // console.log('SOL Price in USD:', solPrice, Date.now() / 1000);
    } catch (err) {
        console.error('Error fetching SOL price:', err.message);
    } finally {
        setTimeout(fetchSOLPrice, requestInterval);
    }
};

fetchBTCPrice();
fetchETHPrice();
fetchSOLPrice();

export const lastPrices = () => {
    return prices;
};

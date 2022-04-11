import axios from 'axios';

export const getMarketNews = async () => {
    try {
        const response = await axios.get("https://newsdata.io/api/1/news?apikey=pub_63872102fb8fa507ba957f27072faf4de867&q=crypto&language=en ");
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
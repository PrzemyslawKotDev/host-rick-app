import axios from "axios";

const getCharactersData = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        window.console.error(error)
    }
};
export default getCharactersData;

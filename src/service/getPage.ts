import axios from "axios";

const getPage = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (err: any) {
    return "error"
    }
};
export default getPage;

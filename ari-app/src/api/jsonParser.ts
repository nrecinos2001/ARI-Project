import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import { decryptData, encryptData } from '@/app/utils';

const key = 'key';

export default async function sendString(data: string) {
    const requestBody = {
        text: [data],
        separator: "comma",
        key,
    };

    try {
        const encryptedDataToSend = encryptData(data, key);
        requestBody.text = encryptedDataToSend;
        const response = await axios.post<string[]>(`${baseUrl}/json-parser`, requestBody);
        const decryptedResponse = decryptData(response.data[0], response.data[1], key);
        return JSON.parse(JSON.parse(decryptedResponse));
    } catch (error) {
        console.error(error);
        throw error;
    }
}

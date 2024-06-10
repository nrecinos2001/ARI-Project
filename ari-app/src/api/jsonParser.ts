import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';

export default async function sendString( data: string, separator: string ) {
    const requestBody = {
        text: [data],
        separator: separator,
        key: "key"
    };

    try {
        const response = await axios.post( `${baseUrl}/json-parser`, requestBody );
        return response.data;
    } catch ( error ) {
        console.error( error );
        throw error;
    }
}

import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import { baseKey } from '@/utils/key';

export default async function sendString( data: string, separator: string ) {
    const requestBody = {
        text: [data],
        separator: separator,
        key: baseKey
    };

    try {
        const response = await axios.post( `${baseUrl}/json-parser`, requestBody );
        return response.data;
    } catch ( error ) {
        console.error( error );
        throw error;
    }
}

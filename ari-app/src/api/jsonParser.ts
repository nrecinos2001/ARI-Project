// /api/jsonParser.ts
import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';
import { decryptData, encryptData } from '@/app/utils';
import { baseKey as key } from '@/utils/key';

export default async function sendString( data: string, separator: string ) {
    const requestBody = {
        text: [data],
        separator,
        key,
    };

    try {
        const encryptedDataToSend = encryptData( data, key );
        requestBody.text = encryptedDataToSend;
        const response = await axios.post<string[]>( `${baseUrl}/json-parser`, requestBody );
        const decryptedResponse = decryptData( response.data[0], response.data[1], key );
        return JSON.parse( JSON.parse( decryptedResponse ) );
    } catch ( error ) {
        console.error( error );
        throw error;
    }
}

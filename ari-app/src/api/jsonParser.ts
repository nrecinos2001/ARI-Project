import axios from 'axios';
import { baseUrl } from '@/utils/baseUrl';

export default async function sendString( data: string ) {
    const requestBody = {
        text: [data],
        separator: "comma",
        key: "key"
    };

    axios.post( `${baseUrl}/json-parser`, requestBody )
        .then( ( response ) => {
            console.log( response.data );
        } )
        .catch( ( error ) => {
            console.error( error );
        } );
}
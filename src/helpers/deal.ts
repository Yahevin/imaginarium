type Imagick = (props:{url:string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body:any}) => any;

const deal: Imagick = async ({url, method, body}) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    // TODO add to body room_id and user_id by default

    const data =  {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    return await fetch(url, data).then(async (response) => {
        const {success, error, ...rest} = await response.json();

        if (success) {
            return rest;
        } else {
            throw (error)
        }
    });
};

export default deal;

type Imagick = (props:{url:string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body:any}) => any;

const deal: Imagick = async ({url, method, body}) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const data =  {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    return await fetch(url, data).then(async (response) => {
        const resp = await response.json();

        if (resp.success) {
            return resp;
        } else {
            throw (resp.error)
        }
    });
};

export default deal;

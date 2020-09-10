type Imagick = (url:string, method: 'POST' | 'GET' | 'PUT' | 'DELETE', body:any) => any;

const deal: Imagick = async (url, method, body) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const data =  {
        method: method,
        headers: myHeaders,
        body: JSON.stringify(body)
    };

    return await fetch(url, data).then((response) => response.json());
};

export default deal;

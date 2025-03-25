import demandwareClient from "../modules/demandwareClient";

const ocapiUrl = `${process.env.OCAPI_INSTANCE_HOST}${process.env.OCAPI_SITE}/dw/shop/${process.env.OCAPI_VERSION}/customers`;
type Customer = Record<'firstName' | 'lastName' | 'email' | 'password', string>;
type UserData = {
    "customer": {
        "login": string,
        "email": string,
        "first_name": string,
        "last_name": string
    },
    "password": string
}

export const signUpUser = async (data: UserData) => {
    const accessToken = await getAccessToken();
    const additionalHeaders = {
        Authorization: accessToken || ''
    };

    return demandwareClient.post(ocapiUrl, data, additionalHeaders);
};

export const loginUser = async (username: string, password: string) => {
    const url = `${ocapiUrl}/auth`;
    const data = {
        "type": "credentials"
    };
    const additionalHeaders = {
        Authorization: `Basic ${encode(`${username}:${password}`)}`
    };

    return demandwareClient.post(url, data, additionalHeaders);
};

const getAccessToken = async () => {
    const url = `${ocapiUrl}/auth`;
    const data = {
        "type": "guest"
    };
    const additionalHeaders = {
        Authorization: ''
    };

    const response = await demandwareClient.post(url, data, additionalHeaders);

    return response.headers.get('authorization');
};

export const validateCustomer = (input: unknown): Customer => {
    if (typeof input !== 'object') throw new Error('Invalid input');
    if (input === null) throw new Error('Invalid input');
    if (!('firstName' in input) || typeof input.firstName !== 'string') throw new Error('Invalid firstName');
    if (!('lastName' in input) || typeof input.lastName !== 'string') throw new Error('Invalid lastName');
    if (!('email' in input) || typeof input.email !== 'string') throw new Error('Invalid email');
    if (!('password' in input) || typeof input.password !== 'string') throw new Error('Invalid password');

    const { firstName, lastName, email, password } = input;

    return { firstName, lastName, email, password };
}

const encode = (input: string) => Buffer.from(input).toString('base64');
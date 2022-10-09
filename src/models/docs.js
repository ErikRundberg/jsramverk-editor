const docs = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1338" :
        "https://jsramverk-editor-erru17.azurewebsites.net",

    getAllDocs: async function getAllDocs(token, email) {
        const response = await fetch(`${this.baseUrl}/docs/${email}`, {
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
        });
        const result = await response.json();

        return result.data;
    },
    getDoc: async function getDoc(token, id) {
        const response = await fetch(`${this.baseUrl}/docs/id/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
        });
        const result = await response.json();

        return result.data;
    },
    createDoc: async function createDoc(token, doc) {
        const response = await fetch(`${this.baseUrl}/docs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(doc),
        });
        const result = await response.json();

        return result.data;
    },
    addUser: async function addUser(token, body) {
        const response = await fetch(`${this.baseUrl}/docs/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();

        return result.data;
    },
    inviteUser: async function inviteUser(token, body) {
        const response = await fetch(`${this.baseUrl}/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();

        return result.data;
    },
    graphqlAllDocs: async function graphqlAllDocs(token, email) {
        const response = await fetch(`${this.baseUrl}/graphql?query=
        { docs (email: "${email}") {
                _id
                title
                content
                allowedUsers
            }}`, {
            headers: {
                "x-access-token": token,
            }
        });
        const result = await response.json();

        return result.data.docs;
    },
    graphqlDoc: async function graphqlDoc(token, id) {
        const response = await fetch(`${this.baseUrl}/graphql?query=
        { document (_id: "${id}") {
            _id
            title
            content
            allowedUsers
          }}`, {
            headers: {
                "x-access-token": token,
            }
        });
        const result = await response.json();

        return result.data.document;
    },
};

export default docs;


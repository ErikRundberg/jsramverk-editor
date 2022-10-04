const docs = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1338" :
        "https://jsramverk-editor-erru17.azurewebsites.net",

    getAllDocs: async function getAllDocs(email) {
        const response = await fetch(`${this.baseUrl}/docs/${email}`);
        const result = await response.json();

        return result.data;
    },
    getDoc: async function getDoc(id) {
        const response = await fetch(`${this.baseUrl}/docs/id/${id}`);
        const result = await response.json();

        return result.data;
    },
    createDoc: async function createDoc(doc) {
        const response = await fetch(`${this.baseUrl}/docs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doc),
        });
        const result = await response.json();

        return result.data;
    },
    addUser: async function addUser(body) {
        const response = await fetch(`${this.baseUrl}/docs/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();

        return result.data;
    },
    inviteUser: async function inviteUser(body) {
        const response = await fetch(`${this.baseUrl}/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();

        return result.data;
    }
};

export default docs;


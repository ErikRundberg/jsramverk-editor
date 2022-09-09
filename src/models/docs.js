const docs = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:1338" :
        "https://jsramverk-editor-erru17.azurewebsites.net",

    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${this.baseUrl}/docs`);
        const result = await response.json();

        return result.data;
    },
    getDoc: async function getDoc(id) {
        const response = await fetch(`${this.baseUrl}/docs/${id}`);
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
    }
};

export default docs;


const docs = {
    getAllDocs: async function getAllDocs() {
        const response = await fetch(`http://localhost:1338/docs`);
        const result = await response.json();

        return result.data;
    },
    getDoc: async function getDoc(id) {
        const response = await fetch(`http://localhost:1338/docs/${id}`);
        const result = await response.json();

        return result.data;
    },
    createDoc: async function createDoc(doc) {
        const response = await fetch(`http://localhost:1338/docs`, {
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


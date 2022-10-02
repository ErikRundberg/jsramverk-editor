const baseUrl = window.location.href.includes("localhost") ?
    "http://localhost:1338" :
    "https://jsramverk-editor-erru17.azurewebsites.net";

const auth = {
    login: async function login(user) {
        const response = await fetch(`${baseUrl}/user/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            },
        });

        return await response.json();
    },

    register: async function register(user) {
        const response = await fetch(`${baseUrl}/user/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            },
        });

        return await response.json();
    }
};

export default auth;

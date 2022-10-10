const code = {
    execute: async function execute(code) {
        const data = {
            code: btoa(code)
        };

        const response = await fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();
        const decodedOutput = atob(result.data);

        console.log(decodedOutput);
    }
};

export default code;

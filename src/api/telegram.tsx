const token = process.env.TOKEN;
const baseURL = `https://api.telegram.org/bot${token}`;

export const getMe = async function () {
    await fetch(`${baseURL}/getMe`)
        .then(response => {
            response.json().then(data => console.log(data));
        })
        .catch(error => console.error(error));
}
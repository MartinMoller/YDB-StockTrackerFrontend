const URL = "http://localhost:8080/ydbStockBackend";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

class ApiFacade {
    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',

            }
        }
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }
    getToken = () => {
        return localStorage.getItem('jwtToken')
    }
    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }
    logout = () => {
        localStorage.removeItem("jwtToken");
    }

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, { username: user, password: pass });
        //console.log(options);
        return fetch(URL + "/api/login", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }

    dummyLogin = () => {
        return fetch(URL + "/api/dummyLogin")
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }

    fetchData = async (params, tokenBool) => {
        const options = this.makeOptions("GET", tokenBool); //True add's the token
        const fetchData = await fetch(URL + params, options);
        const data = await fetchData.json();
        return data;
    }

    addStockToFav = (params, tokenBool) => {
        const options = this.makeOptions("POST", tokenBool);
        return fetch(URL + params, options)
            .then(res => res.json())
    }

    createUser = (user, pass) => {
        const options = this.makeOptions("POST", false, { username: user, password: pass });
        //console.log(options);
        return fetch(URL + "/api/createUser", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }

}
const facade = new ApiFacade();
export default facade;
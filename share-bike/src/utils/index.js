import axios from "axios"

function formatDate(unix) {
    function fixZero(number) {
        return number >= 10 ? number : ("0" + number)
    }


    let date = new Date(unix);
    let year = date.getFullYear();
    let month = fixZero(date.getMonth() + 1);
    let day = fixZero(date.getDate());
    let hour = fixZero(date.getHours());
    let min = fixZero(date.getMinutes());
    let second = fixZero(date.getSeconds());
    let strTime = `${year}-${month}-${day} ${hour}:${min}:${second}`;
    return strTime;
};
const instance = axios.create({
    baseURL: "https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d",
    timeout: 15000,
});
const xhr = {
    get(url, data, config) {
        return new Promise((resolve, reject) => {
            instance.get(url, {params: data}, config)
                .then(res => {
                    resolve(res)
                }).catch(err => {
                reject(err)
            })
        })
    },
    myFetch(url, data, method, config) {
        return new Promise((resolve, reject) => {
            instance[method](url, data, config).then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    post(url, data, config) {
        return this.myFetch(url, data, "post", config);
    }


}
export {
    formatDate,
    xhr,
}
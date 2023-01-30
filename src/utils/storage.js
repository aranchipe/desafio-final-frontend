const setItem = (key, value) => {
    localStorage.setItem(key, value);
}

const getItem = (key) => {
    return localStorage.getItem(key);
}

const removeItem = (key) => {
    localStorage.removeItem(key)
}

const clear = (key, value) => {
    localStorage.clear();
}

module.exports = {
    setItem,
    getItem,
    removeItem,
    clear
}
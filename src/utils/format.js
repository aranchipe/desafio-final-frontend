export function formatCurrency(value) {
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
}

export function formatCep(value) {
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    return value;
}

export function onlyNumbers(value) {
    value = value.replace(/[^0-9]/g, "");
    return value;
}

export function formatCpf(value) {
    value = value.replace(/(\d)(\d{2})$/, "$1-$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
}

export function formatPhone(value) {
    value = value.replace(/(\d{7})/, "$1-");
    value = value.replace(/(\d{3})/, "$1 ");
    value = value.replace(/(\d{2})/, "$1 ");
    value = value.replace(/(\d{0})/, "$1(");
    value = value.replace(/(\d{2})/, "$1)");
    return value;
}
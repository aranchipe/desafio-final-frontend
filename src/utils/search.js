import { formatCpf } from "./format";

export function searchClient(e, customers, setCustomers, customersTotal) {
    const { value } = e.target;

    e.target.addEventListener('keydown', (tecla) => {
        if (tecla.key === 'Backspace') {
            setCustomers(customersTotal);
        }
    })

    const dataFilter = customers.filter((item) => {
        return item.name.toUpperCase().includes(value.toUpperCase().trim()) || formatCpf(item.cpf).includes(value.trim()) || item.cpf.includes(value.trim()) || item.email.toUpperCase().includes(value.toUpperCase().trim());
    })

    if (dataFilter.length) {
        setCustomers(dataFilter);
    } else {
        setCustomers(['notFound']);
    }

}

export function searchBilling(e, billings, setBillings, billingsTotal) {
    const { value } = e.target;

    e.target.addEventListener('keydown', (tecla) => {
        if (tecla.key === 'Backspace') {
            setBillings(billingsTotal);
        }
    })

    const dataFilter = billings.filter((item) => {
        return item.client_name.toUpperCase().includes(value.toUpperCase().trim()) || String(item.id).includes(value.trim())
    })

    if (dataFilter.length) {
        setBillings(dataFilter);
    } else {
        setBillings(['notFound']);
    }
}
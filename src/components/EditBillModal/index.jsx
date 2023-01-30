import "./style.css";
import billing from "../../assets/billing.svg";
import close from "../../assets/icon-close.svg";
import { useState } from "react";
import { notifyError, notifySucess } from "../../utils/toast";
import axios from "../../services/axios";
import { clear, getItem } from "../../utils/storage";
import { format } from "date-fns";
import { MaskedCurrency } from "../../utils/MaskedInput";
import { useEffect } from "react";
import { formatCurrency } from "../../utils/format";

function EditBillModal({
  setOpenEditBillModal,
  customerBill,
  listBilling,
  handleEdit,
}) {
  const token = getItem("token");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    listBilling();
  }, []);

  function maskCurrency(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
    return value;
  }

  const [form, setForm] = useState({
    client_name: customerBill.client_name,
    description: customerBill.description,
    due_date: format(new Date(customerBill.due_date), "yyyy-MM-dd"),
    value: customerBill.value,
    status: customerBill.status,
  });

  function handleChangeForm({ target }) {
    setForm({ ...form, [target.name]: target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.description || !form.due_date || !form.value || !form.status) {
      return notifyError("Informe todos os campos obrigatórios.");
    }

    try {
      const response = await axios.put(
        `/billing/${customerBill.id}`,
        {
          client_name: form.client_name,
          description: form.description,
          due_date: form.due_date,
          value: form.value,
          status: form.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 401) {
        clear();
        return notifyError(response.data.mensagem);
      }

      if (response.status > 204) {
        return notifyError(response.data.mensagem);
      }

      setOpenEditBillModal(false);
      listBilling();
      return notifySucess("Cobrança editada com sucesso!");
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  function handleChangeCurrency(e) {
    setForm({ ...form, value: maskCurrency(e) });
  }

  function handleClickPaga() {
    setStatus(true);
    setForm({ ...form, status: "Paga" });
  }

  function handleClickPendente() {
    setStatus(false);
    setForm({ ...form, status: "Pendente" });
  }

  console.log(form);

  return (
    <div className="container-register-bill-modal">
      <form onSubmit={(e) => handleSubmit(e)} className="form-register-bill">
        <div className="register-bill-header">
          <img src={billing} alt="billsIcon" />
          <h1>Edição de Cobrança</h1>
        </div>
        <label>Nome*</label>
        <input
          id="name"
          name="name"
          placeholder="Digite o nome"
          className="input"
          value={form.client_name}
          onChange={handleChangeForm}
        />
        <label>Descrição*</label>
        <input
          id="descricao"
          name="description"
          placeholder="Digite a descrição"
          className="input"
          value={form.description}
          onChange={handleChangeForm}
        />
        <div className="vencimento-valor">
          <div className="vencimento">
            <label>Vencimento*</label>
            <input
              id="vencimento"
              name="due_date"
              placeholder="Data de vencimento"
              className="input"
              type="date"
              value={form.due_date}
              onChange={handleChangeForm}
            />
          </div>
          <div className="valor">
            <label>Valor*</label>
            <MaskedCurrency
              id="valor"
              name="value"
              placeholder="Digite o valor"
              className="input"
              value={formatCurrency(form.value)}
              onChange={(e) => handleChangeCurrency(e)}
            />
            <span>R$</span>
          </div>
        </div>
        <label className="status">Status*</label>

        <div className="div-paga">
          <input
            className={status ? "checked" : "unchecked"}
            onClick={() => handleClickPaga()}
            name="status"
            type="radio"
          />

          <span>Cobrança Paga</span>
        </div>
        <div className="div-pendente">
          <input
            className={status ? "unchecked" : "checked"}
            onClick={() => handleClickPendente()}
            name="status"
            type="radio"
          />
          <span>Cobrança Pendente</span>
        </div>

        <div className="botoes-register-bill-modal">
          <button
            type="button"
            className="btn-cancelar"
            onClick={() => setOpenEditBillModal(false)}
          >
            Cancelar
          </button>
          <button className="btn-aplicar">Aplicar</button>
        </div>

        <img
          className="close-icon"
          src={close}
          alt="icon-close"
          onClick={() => setOpenEditBillModal(false)}
        />
      </form>
    </div>
  );
}

export default EditBillModal;

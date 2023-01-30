import "./styles.css";
import filterIcon from "../../assets/filter.svg";
import orderIcon from "../../assets/order.svg";
import editIcon from "../../assets/editbill.svg";
import billingLogo from "../../assets/billing.svg";
import deleteIcon from "../../assets/delete.svg";
import magnifyingGlass from "../../assets/magnifying-glass.svg";
import searchNotFound from "../../assets/searchNotFound.svg";
import EditBillModal from "../EditBillModal";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { clear, getItem } from "../../utils/storage";
import DeleteBillingModal from "../DeleteBillingModal";
import { useState, useEffect } from "react";
import axios from "../../services/axios";
import { notifyError } from "../../utils/toast";
import DetailBillingModal from "../DetailBillingModal";
import { formatCurrency } from "../../utils/format";
import { searchBilling } from "../../utils/search";

function DashboardBilling({ billing, setBilling, listBilling, billingsTotal }) {
  const categoria = getItem("categoria");
  let billingsFiltradas = [];
  const [openDeleteBillingModal, setOpenDeleteBillingModal] = useState(false);
  const [currentBilling, setCurrentBilling] = useState();
  const [openDetailBillingModal, setOpenDetailBillingModal] = useState(false);
  const [openEditBillModal, setOpenEditBillModal] = useState(false);
  const [customerBill, setCustomerBill] = useState({});
  const [order, setOrder] = useState(false);
  const token = getItem("token");

  function handleDelete(item) {
    setOpenDeleteBillingModal(true);
    setCurrentBilling(item);
  }

  /*  useEffect(() => {
    handleEdit();
  }, []); */

  if (categoria && billing[0] !== "notFound") {
    billingsFiltradas = billing.filter((item) => {
      return item.status === categoria;
    });
  } else {
    billingsFiltradas = billing;
  }

  function handleDetailBilling(item) {
    setCurrentBilling(item);
    setOpenDetailBillingModal(true);
  }

  function handleOrderByID() {
    const orderedBillings = billingsFiltradas.sort((a, b) => {
      if (!order) {
        return Number(a.id) - Number(b.id);
      } else {
        return Number(b.id) - Number(a.id);
      }
    });

    billingsFiltradas = orderedBillings;
    setOrder(!order);
  }

  function handleOrderByName() {
    const orderedBillings = billingsFiltradas.sort((a, b) => {
      if (!order) {
        if (a.client_name.toUpperCase() > b.client_name.toUpperCase()) {
          return 1;
        }
        if (a.client_name.toUpperCase() < b.client_name.toUpperCase()) {
          return -1;
        }
        return 0;
      } else {
        if (b.client_name.toUpperCase() > a.client_name.toUpperCase()) {
          return 1;
        }
        if (b.client_name.toUpperCase() < a.client_name.toUpperCase()) {
          return -1;
        }
        return 0;
      }
    });
    billingsFiltradas = orderedBillings;
    setOrder(!order);
  }

  async function handleEdit(item) {
    try {
      const response = await axios.get(`/billing/${item.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        clear();
        return notifyError(response.data.mensagem);
      }
      setOpenEditBillModal(true);
      setCustomerBill(response.data);
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  return (
    <div className="container-dashboard-billing">
      <section className="billing-top">
        <div className="billing-top-title">
          <img src={billingLogo} alt="Billing icon"></img>
          <h1>Cobranças</h1>
        </div>
        <div className="billing-top-btn">
          <div className="filter-billing">
            <img src={filterIcon} alt="Filter icon"></img>
          </div>
          <div className="input-filter">
            <input
              placeholder="Pesquisar"
              onInput={(e) =>
                searchBilling(e, billing, setBilling, billingsTotal)
              }
            ></input>
            <img src={magnifyingGlass} alt="magnifying Glass icon"></img>
          </div>
        </div>
      </section>

      <section className="style-table">
        <table className="dash-billing">
          <thead>
            <tr>
              <th className="dash-billing-order">
                <img
                  src={orderIcon}
                  alt="Order icon"
                  onClick={() => handleOrderByName()}
                ></img>
                Cliente
              </th>
              <th className="dash-billing-order">
                <img
                  src={orderIcon}
                  alt="Order icon"
                  onClick={() => handleOrderByID()}
                ></img>
                ID Cob.
              </th>
              <th>Valor</th>
              <th>Data de venc.</th>
              <th>Status</th>
              <th>Descrição</th>
              <th></th>
            </tr>
          </thead>
          {billingsFiltradas[0] === "notFound" && (
            <div className="searchNotFound">
              <img src={searchNotFound} alt="pesquisa nao encontada" />
            </div>
          )}
          <tbody>
            {billingsFiltradas[0] !== "notFound" &&
              billingsFiltradas.map((item) => (
                <tr className="customer-name" key={item.id}>
                  <td onClick={() => handleDetailBilling(item)}>
                    <span>{item.client_name}</span>
                  </td>
                  <td onClick={() => handleDetailBilling(item)}>{item.id}</td>
                  <td onClick={() => handleDetailBilling(item)}>
                    R$ {formatCurrency(item.value)}
                  </td>
                  <td onClick={() => handleDetailBilling(item)}>
                    {format(new Date(item.due_date), "dd/MM/yyyy")}
                  </td>
                  <td onClick={() => handleDetailBilling(item)}>
                    <div
                      className={
                        item.status.toLowerCase() === "pendente"
                          ? "status pendente"
                          : item.status.toLowerCase() === "vencida"
                          ? "status vencida"
                          : "status paga"
                      }
                    >
                      {item.status}
                    </div>
                  </td>
                  <td
                    onClick={() => handleDetailBilling(item)}
                    className="bill-description"
                  >
                    {item.description}
                  </td>
                  <td>
                    <div className="column-btn">
                      <div className="column-btn-icon edit">
                        <img
                          onClick={() => handleEdit(item)}
                          src={editIcon}
                          alt="Bill icon"
                        ></img>
                        Editar
                      </div>
                      <div className="column-btn-icon del">
                        <img
                          onClick={() => handleDelete(item)}
                          src={deleteIcon}
                          alt="Delete icon"
                        ></img>
                        Excluir
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>

      {openDeleteBillingModal && (
        <DeleteBillingModal
          setOpenDeleteBillingModal={setOpenDeleteBillingModal}
          currentBilling={currentBilling}
          listBilling={listBilling}
        />
      )}

      {openDetailBillingModal && (
        <DetailBillingModal
          setOpenDetailBillingModal={setOpenDetailBillingModal}
          currentBilling={currentBilling}
        />
      )}
      {openEditBillModal && (
        <EditBillModal
          setOpenEditBillModal={setOpenEditBillModal}
          customerBill={customerBill}
          handleEdit={handleEdit}
          listBilling={listBilling}
        />
      )}
    </div>
  );
}

export default DashboardBilling;

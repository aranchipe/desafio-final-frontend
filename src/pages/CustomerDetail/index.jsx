import "./style.css";
import SideBar from "../../components/SideBar";
import { useParams } from "react-router-dom";
import axios from "../../services/axios";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import EditProfileModal from "../../components/EditProfileModal";
import clients from "../../assets/clients.svg";
import editCustomerProfile from "../../assets/edit-customer-profile.svg";
import orderIcon from "../../assets/order.svg";
import editBlling from "../../assets/edit-billing.svg";
import deleteBlling from "../../assets/delete-billing.svg";
import add from "../../assets/add.svg";
import RegisterBillModal from "../../components/RegisterBillModal";
import { notifyError } from "../../utils/toast";
import EditClientModal from "../../components/EditClientModal";
import { format } from "date-fns";
import { clear, getItem } from "../../utils/storage";
import DeleteBillingModal from "../../components/DeleteBillingModal";
import EditBillModal from "../../components/EditBillModal";
import {
  formatCep,
  formatCpf,
  formatCurrency,
  formatPhone,
  onlyNumbers,
} from "../../utils/format";

function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [billings, setBillings] = useState([]);
  const [openRegisterBillModal, setOpenRegisterBillModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const [openDeleteBillingModal, setOpenDeleteBillingModal] = useState(false);
  const [currentBilling, setCurrentBilling] = useState();
  const token = getItem("token");
  const [openEditBillModal, setOpenEditBillModal] = useState(false);
  const [customerBill, setCustomerBill] = useState({});
  const [order, setOrder] = useState(false);

  useEffect(() => {
    customerData();
    listBillings();
  }, []);

  useEffect(() => {
    listBillings();
  }, [openRegisterBillModal]);

  async function customerData() {
    try {
      const response = await axios.get(`/clients/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        clear();
        return notifyError(response.data.mensagem);
      }

      setCustomer(response.data);
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  async function listBillings() {
    try {
      const response = await axios.get(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        clear();
        return notifyError(response.data.mensagem);
      }

      setBillings(response.data);
    } catch (error) {
      return notifyError(error.response.data.mensagem);
    }
  }

  function handleDelete(item) {
    setOpenDeleteBillingModal(true);
    setCurrentBilling(item);
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

  function handleOrderById() {
    const orderedBillings = billings.sort((a, b) => {
      if (!order) {
        return Number(a.id) - Number(b.id);
      } else {
        return Number(b.id) - Number(a.id);
      }
    });

    setBillings(orderedBillings);
    setOrder(!order);
  }

  function handleOrderByDate() {
    const orderedBillings = billings.sort((a, b) => {
      if (!order) {
        return new Date(a.due_date) - new Date(b.due_date);
      } else {
        return new Date(b.due_date) - new Date(a.due_date);
      }
    });

    setBillings(orderedBillings);
    setOrder(!order);
  }

  return (
    <div className="container">
      <SideBar currentPage="clients" />
      <div className="container-main">
        <div className="content-header">
          <Header
            openProfileModal={() => setOpenEditProfileModal(true)}
            page="Detalhes"
          />
        </div>
        <main className="customers-detail-main">
          <div className="customers-top-customer-detail">
            <div className="customers-top-title">
              <img src={clients} alt="Clients icon"></img>
              <h1>{customer.name}</h1>
            </div>
          </div>
          <div className="customer-data">
            <h1>Dados do Cliente</h1>
            <button
              className="edit-customer-btn"
              onClick={() => setOpenEditClientModal(true)}
            >
              <img src={editCustomerProfile} alt="editCustomerProfile" />
              <span>Editar Cliente</span>
            </button>
            <button
              onClick={() => setOpenRegisterBillModal(true)}
              className="add-bill-btn"
            >
              <img src={add} alt="editCustomerProfile" />
              <span>Nova Cobrança</span>
            </button>
            <div className="customer-data-main">
              <div className="customer-data-top">
                <div className="email">
                  <h2>E-mail</h2>
                  <span>{customer.email}</span>
                </div>
                <div className="telephone">
                  <h2>Telefone</h2>
                  <span>
                    {customer.telephone && formatPhone(customer.telephone)}
                  </span>
                </div>
                <div className="cpf">
                  <h2>CPF</h2>
                  <span>{customer.cpf && formatCpf(customer.cpf)}</span>
                </div>
                <div className="cep"></div>
                <div className="city"></div>
                <div className="state"></div>
              </div>
              <div className="customer-data-top">
                <div className="email">
                  <h2>Endereço</h2>
                  <span className={customer.street ? "" : "complement-vazio"}>
                    {customer.street ? customer.street : "-"}
                  </span>
                </div>
                <div className="telephone">
                  <h2>Bairro</h2>
                  <span className={customer.district ? "" : "complement-vazio"}>
                    {customer.district ? customer.district : "-"}
                  </span>
                </div>
                <div className="cpf">
                  <h2>Complemento</h2>
                  <span
                    className={customer.complement ? "" : "complement-vazio"}
                  >
                    {customer.complement ? customer.complement : "-"}
                  </span>
                </div>
                <div className="cep">
                  <h2>CEP</h2>
                  <span className={customer.cep ? "" : "complement-vazio"}>
                    {customer.cep ? formatCep(customer.cep) : "-"}
                  </span>
                </div>
                <div className="city">
                  <h2>Cidade</h2>
                  <span className={customer.city ? "" : "complement-vazio"}>
                    {customer.city ? customer.city : "-"}
                  </span>
                </div>
                <div className="state">
                  <h2>UF</h2>
                  <span className={customer.state ? "" : "complement-vazio"}>
                    {customer.state ? customer.state : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="customer-data">
            <h1>Cobranças do Cliente</h1>
            <section className="style-table">
              <table className="dash-billing-detail">
                <thead>
                  <tr>
                    <th className="order-detail-bill">
                      <img
                        className="order-client-icon"
                        src={orderIcon}
                        alt="Order icon"
                        onClick={() => handleOrderById()}
                      ></img>
                      ID Cob.
                    </th>
                    <th className="order-detail-bill">
                      <img
                        className="order-client-icon"
                        src={orderIcon}
                        alt="Order icon"
                        onClick={() => handleOrderByDate()}
                      ></img>
                      Data de venc.
                    </th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th className="description-detail">Descrição</th>
                  </tr>
                </thead>

                <tbody>
                  {billings.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{format(new Date(item.due_date), "dd/MM/yyyy")}</td>
                      <td>R$ {formatCurrency(item.value)}</td>
                      <td className="status">
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
                      <td className="bill-description-detail">
                        {item.description}
                      </td>
                      <td>
                        <img
                          className="edit"
                          onClick={() => handleEdit(item)}
                          src={editBlling}
                          alt="editBlling"
                        />
                      </td>
                      <td>
                        <img
                          className="del"
                          onClick={() => handleDelete(item)}
                          src={deleteBlling}
                          alt="deleteBlling"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        </main>
      </div>
      {openEditProfileModal && (
        <EditProfileModal
          closeProfileModal={() => setOpenEditProfileModal(false)}
        />
      )}
      {openRegisterBillModal && (
        <RegisterBillModal
          setOpenRegisterBillModal={setOpenRegisterBillModal}
          currentCustomer={customer}
          listBillings={listBillings}
        />
      )}
      {openEditClientModal && (
        <EditClientModal
          setOpenEditClientModal={setOpenEditClientModal}
          customer={customer}
          customerData={customerData}
          id={id}
        />
      )}
      {openDeleteBillingModal && (
        <DeleteBillingModal
          setOpenDeleteBillingModal={setOpenDeleteBillingModal}
          currentBilling={currentBilling}
          listBilling={listBillings}
        />
      )}
      {openEditBillModal && (
        <EditBillModal
          setOpenEditBillModal={setOpenEditBillModal}
          customerBill={customerBill}
          handleEdit={handleEdit}
          listBilling={listBillings}
        />
      )}
    </div>
  );
}

export default CustomerDetail;

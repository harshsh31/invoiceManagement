// eslint-disable-next-line
import React, { lazy, Suspense, useState } from "react";
import s from "./MainPanel.module.css";
import AddIcon from "@material-ui/icons/Add";
import Input from "../Input/Input";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { invoicesActions } from "../../store/invoices";
import InvoiceMainPanel from "../InvoiceMainPanel/InvoiceMainPanel";
const OverLay = lazy(() => import("../OverLay/OverLay"));
const Popup = lazy(() => import("../Popup/Popup"));
const MainPanel = () => {
  const dispatch = useDispatch();
  const { selectedInvoice, list } = useSelector((state) => state.invoices);
  const selectedInvoiceData = list.find(
    (item) => get(item, "order", "") == selectedInvoice
  );
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const [customerValue, setCustomerValue] = useState({});
  const [productValue, setProductValue] = useState({});
  const [item, setItem] = useState({});
  const [tax, setTax] = useState("");
  const [discount, setDiscount] = useState("");
  const subTotal =
    get(productValue, "items", []).length > 0
      ? get(productValue, "items", []).reduce(
          (acc, item) =>
            acc +
            parseFloat(get(item, "price", "0")) *
              parseFloat(get(item, "quantity", "0")),
          0.0
        )
      : 0.0;
  const taxVal =
    (parseFloat(subTotal) * parseFloat(tax != "" ? tax : "0")) / 100;
  const discountVal =
    ((parseFloat(subTotal) + parseFloat(taxVal)) *
      parseFloat(discount != "" ? discount : "0")) /
    100;
  const grandTotal = subTotal - discountVal + taxVal;
  const changeCustomerVal = (key, val) => {
    setCustomerValue({ ...customerValue, [key]: val });
  };
  const changeItemVal = (key, val) => {
    setItem({ ...item, [key]: val });
  };
  const addItemToInvoice = (e) => {
    if (get(productValue, "items", []).length > 0)
      productValue.items = [...get(productValue, "items", []), item];
    else productValue.items = [item];
    setProductValue({
      ...productValue,
    });
    setItem({});
  };
  const onSaveInvoice = () => {
    const invoice = {
      customerDetails: customerValue,
      productDetails: {
        items: get(productValue, "items", []),
        tax,
        discount,
        grandTotal,
        discountVal,
        taxVal,
        subTotal,
      },
    };
    dispatch(invoicesActions.addInvoiceItem(invoice));
    setProductValue({});
    setItem({});
    setShowCreateInvoice(false);
    setShowCustomerDetails(true);
  };
  return (
    <div className={s.mainPanel}>
      <div className={s.invoiceHolder}>
        <InvoiceMainPanel data={selectedInvoiceData} />
      </div>
      <button
        className={s.addButton}
        type="button"
        onClick={() => {
          setShowCreateInvoice(true);
          setShowCustomerDetails(true);
          setCustomerValue({});
          setProductValue({});
        }}
      >
        <AddIcon />
      </button>
      {showCreateInvoice && (
        <Suspense fallback={null}>
          <OverLay>
            <Popup
              title={"Create New Invoice"}
              saveButtonText={showCustomerDetails ? "Proceed" : "Save"}
              onSave={() => setShowCustomerDetails(false)}
              onClose={() => {
                setShowCreateInvoice(false);
                setShowCustomerDetails(true);
                setCustomerValue({});
                setProductValue({});
              }}
              showFooter={showCustomerDetails}
            >
              {showCustomerDetails ? (
                <>
                  <div className={s.header}>
                    <div className={s.title}>Customer Details</div>
                    <div
                      className={s.icon}
                      onClick={() => {
                        setShowCustomerDetails(false);
                        setCustomerValue({});
                      }}
                    >
                      <div className={s.iconText}>Skip</div>
                      <SkipNextIcon />
                    </div>
                  </div>
                  <div className={s.detailsContainer}>
                    <div className={s.inputHolder}>
                      <label className={s.inputLabel} htmlFor="fullName">
                        Full Name*
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter Full Name"
                        value={get(customerValue, "fullName", "")}
                        onChange={(val) => changeCustomerVal("fullName", val)}
                      />
                    </div>
                    <div className={s.inputHolder}>
                      <label className={s.inputLabel} htmlFor="phone">
                        Phone*
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter Phone"
                        value={get(customerValue, "phone", "")}
                        onChange={(val) => changeCustomerVal("phone", val)}
                      />
                    </div>
                    <div className={s.inputHolder}>
                      <label className={s.inputLabel} htmlFor="email">
                        Email*
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter Email"
                        value={get(customerValue, "email", "")}
                        onChange={(val) => changeCustomerVal("email", val)}
                      />
                    </div>
                    <div className={s.inputHolder}>
                      <label className={s.inputLabel} htmlFor="pincode">
                        Pincode*
                      </label>
                      <Input
                        type="number"
                        placeholder="Enter Pincode"
                        value={get(customerValue, "pincode", "")}
                        onChange={(val) => changeCustomerVal("pincode", val)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={s.header}>
                    <div className={s.title}>Product Details</div>
                  </div>
                  <div className={s.tableWrapper}>
                    <table className={s.table}>
                      <thead className={s.tableHeader}>
                        <tr>
                          <th className={s.tableHeaderItem}>ITEM</th>
                          <th className={s.tableHeaderItem}>QUANTITY</th>
                          <th className={s.tableHeaderItem}>PRICE</th>
                        </tr>
                      </thead>
                      <tbody className={s.tableBody}>
                        {get(productValue, "items", []).map(
                          (product, productIndex) => (
                            <tr
                              className={s.tableBodyRow}
                              key={get(product, "name", "") + productIndex}
                            >
                              <td className={s.tableBodyRowItem}>
                                <div className={s.text}>
                                  {get(product, "name", "")}
                                </div>
                              </td>
                              <td className={s.tableBodyRowItem}>
                                <div className={s.text}>
                                  {get(product, "quantity", "")}
                                </div>
                              </td>
                              <td className={s.tableBodyRowItem}>
                                <div className={s.text}>
                                  ₹ {get(product, "price", "")}
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                        <tr className={s.tableBodyRow}>
                          <td className={s.tableBodyRowItem}>
                            <Input
                              type="text"
                              placeholder={"Please Enter Item Name"}
                              value={get(item, "name", "")}
                              onChange={(val) => changeItemVal("name", val)}
                            />
                          </td>
                          <td className={s.tableBodyRowItem}>
                            <Input
                              type="number"
                              placeholder={"0.00"}
                              value={get(item, "quantity", "")}
                              onChange={(val) => changeItemVal("quantity", val)}
                            />
                          </td>
                          <td className={s.tableBodyRowItem}>
                            <Input
                              type="number"
                              placeholder={"0.00"}
                              value={get(item, "price", "")}
                              onChange={(val) => changeItemVal("price", val)}
                            />
                            <button
                              type="button"
                              className={s.addItembutton}
                              onClick={addItemToInvoice}
                            >
                              <KeyboardReturnIcon />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={s.footerWrapper}>
                    <div className={s.taxWrapper}>
                      <div className={s.tax}>
                        <Input
                          type="text"
                          placeholder="Tax"
                          value={tax}
                          onChange={setTax}
                        />
                        %
                      </div>
                      <div className={s.tax}>
                        <Input
                          type="text"
                          placeholder="Discount"
                          value={discount}
                          onChange={setDiscount}
                        />
                        %
                      </div>
                    </div>
                    <div className={s.subTotal}>
                      <div className={s.subTotalText}>Sub Total</div>
                      <div className={s.subTotalValue}>₹ {subTotal}</div>
                    </div>
                  </div>
                  <div className={s.footer}>
                    <div className={s.taxWrapper}>
                      <div className={s.tax}>
                        <div className={s.text}>Tax</div>
                        <div className={s.value}>₹ {taxVal}</div>
                      </div>
                      <div className={s.tax}>
                        <div className={s.text}>Discount</div>
                        <div className={s.value}>₹ {discountVal}</div>
                      </div>
                    </div>
                    <div className={s.saveButtonWrapper}>
                      <div className={s.grandTotal}>
                        <div className={s.text}>Grand Total</div>
                        <div className={s.value}>₹ {grandTotal}</div>
                      </div>
                      <button
                        className={s.saveButton}
                        type="button"
                        disabled={get(productValue, "items", []).length == 0}
                        onClick={() => onSaveInvoice(grandTotal)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </OverLay>
        </Suspense>
      )}
    </div>
  );
};

export default MainPanel;

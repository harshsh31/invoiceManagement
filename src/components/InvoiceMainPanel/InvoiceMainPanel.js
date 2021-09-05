import { get } from "lodash";
import React from "react";
import s from "./InvoiceMainPanel.module.css";
import PrintIcon from "@material-ui/icons/Print";

const InvoiceMainPanel = ({ data = {} }) => {
  const { customerDetails = {}, productDetails = {}, order = "" } = data;
  const printHtml = () => {
    var content = document.getElementById("divcontents");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  return (
    <>
      <div className={s.wrapper} id="divcontents">
        <div className={s.header}>
          <div className={s.invoiceDetails}>
            <div className={s.invoiceHeader}>INVOICE</div>
            <div className={s.invoiceNumber}># INV{order}</div>
          </div>
          <div className={s.rightText}>
            <div className={s.customerDetails}>
              <div className={s.customerDetailsHeader}>CUSTOMER DETAILS</div>
              <div className={s.customerFullName}>
                {get(customerDetails, "fullName", "Unknown User")}
              </div>
              {customerDetails.email && (
                <div className={s.customerEmail}>
                  {get(customerDetails, "email", "")}
                </div>
              )}
            </div>
            <button type="button" className={s.printButton} onClick={printHtml}>
              Print <PrintIcon />
            </button>
          </div>
        </div>
        <div className={s.tableWrapper}>
          <table className={s.table}>
            <thead className={s.tableHeader}>
              <tr>
                <th className={s.tableHeaderItem}>ITEM</th>
                <th className={s.tableHeaderItem}>QUANTITY</th>
                <th className={s.tableHeaderItem}>PRICE ₹</th>
              </tr>
            </thead>
            <tbody className={s.tableBody}>
              {get(productDetails, "items", []).map((product, productIndex) => (
                <tr
                  className={s.tableBodyRow}
                  key={get(product, "name", "") + productIndex}
                >
                  <td className={s.tableBodyRowItem}>
                    <div className={s.text}>{get(product, "name", "")}</div>
                  </td>
                  <td className={s.tableBodyRowItem}>
                    <div className={s.boldText}>
                      {get(product, "quantity", "")}
                    </div>
                  </td>
                  <td className={s.tableBodyRowItem}>
                    <div className={s.boldText}>
                      {get(product, "price", "")}
                    </div>
                  </td>
                </tr>
              ))}
              <tr className={s.grandTotalRow}>
                <td className={s.grandTotalRowItem}></td>
                <td className={s.grandTotalRowItem}>
                  <div className={s.grandTotalWrapper}>
                    <div className={s.subTotalText}>Sub Total</div>
                    <div className={s.subTotalText}>
                      Tax ({get(productDetails, "tax", "")}%)
                    </div>
                    <div className={s.subTotalText}>
                      Discount ({get(productDetails, "discount", "")}%)
                    </div>
                    <div className={s.grandTotalText}>Grand Total</div>
                  </div>
                </td>
                <td className={s.grandTotalRowItem}>
                  <div className={s.grandTotalWrapper}>
                    <div className={s.subTotalValue}>
                      ₹ {get(productDetails, "subTotal", 0)}
                    </div>
                    <div className={s.subTotalValue}>
                      ₹ {get(productDetails, "taxVal", "")}
                    </div>
                    <div className={s.subTotalValue}>
                      ₹ -{get(productDetails, "discountVal", "")}
                    </div>
                    <div className={s.grandTotalValue}>
                      ₹ {get(productDetails, "grandTotal", "")}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <iframe
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      ></iframe>
    </>
  );
};

export default InvoiceMainPanel;

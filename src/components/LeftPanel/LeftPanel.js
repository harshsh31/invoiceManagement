// eslint-disable-next-line
import { memo, useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import s from "./LeftPanel.module.css";
import Input from "../Input/Input";
import Fuse from "fuse.js";
import { areEqual, FixedSizeList } from "react-window";
import { get } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { invoicesActions } from "../../store/invoices";

const LeftPanel = () => {
  const { selectedInvoice, list = [] } = useSelector((state) => state.invoices);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [containerHeight, setContainerHeight] = useState(null);
  const listContainerRef = useRef(null);
  const handleResize = useCallback(() => {
    setContainerHeight(
      listContainerRef && listContainerRef.current
        ? listContainerRef.current.offsetHeight
        : 1000
    );
  }, []);
  const Row = memo(({ data, index, style }) => {
    const item = get(data, index, {});
    return (
      <div
        className={`${s.dropdownItem} ${
          get(item, "order", "") == selectedInvoice ? s.selected : ""
        }`}
        style={style}
        key={get(item, "order", "") + index}
        onClick={() =>
          dispatch(invoicesActions.setSelectedInvoice(get(item, "order", "")))
        }
      >
        <div className={s.invoiceDetails}>
          <div className={s.invoiceNumber}>
            INV. # - {get(item, "order", "")}
          </div>
        </div>
        <div className={s.items}>
          Items - {get(item, "productDetails.items", []).length}
        </div>
        <div className={s.customerDetails}>
          <div className={s.customerName}>
            {get(item, "customerDetails.fullName", "Unknown User")}
          </div>
          <div className={s.customerGrandTotal}>
            ₹ {get(item, "productDetails.grandTotal", 0)}
          </div>
        </div>
      </div>
    );
  }, areEqual);
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  const fuseOptions = {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 50,
    maxPatternLength: 12,
    minMatchCharLength: 1,
    keys: ["customerDetails.fullName", "productDetails.order"],
  };
  const fuse = new Fuse(list, fuseOptions);
  const data = searchTerm ? fuse.search(searchTerm).map((c) => c.item) : list;
  return (
    <div className={s.leftPanel}>
      <div className={s.searchContainer}>
        <div className={s.icon}>
          <SearchIcon />
        </div>
        <Input
          type="text"
          placeholder={"Search Invoices"}
          value={searchTerm || ""}
          onChange={(val) => setSearchTerm(val)}
        />
      </div>
      <div className={s.listContainer} ref={listContainerRef}>
        <FixedSizeList
          itemData={data}
          height={containerHeight ? containerHeight : 800}
          itemCount={get(data, "length", 0)}
          width={"100%"}
          itemSize={80}
          className={s.list}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default LeftPanel;

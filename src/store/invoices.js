import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    {
      customerDetails: {
        fullName: "Harsh Shah",
        phone: "8097707287",
        email: "harshsh31@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 6,
    },
    {
      customerDetails: {
        fullName: "Harsh Shah",
        phone: "8097707287",
        email: "harshsh31@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 5,
    },
    {
      customerDetails: {
        fullName: "Harsh Shah",
        phone: "8097707287",
        email: "harshsh31@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 4,
    },
    {
      customerDetails: {
        fullName: "Harsh Shah",
        phone: "8097707287",
        email: "harshsh31@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 3,
    },
    {
      customerDetails: {
        fullName: "Harsh Shah",
        phone: "8097707287",
        email: "harshsh31@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 2,
    },
    {
      customerDetails: {
        fullName: "Harsh Shah",
        phone: "8097707287",
        email: "harshsh31@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 1,
    },
    {
      customerDetails: {
        fullName: "Saloni Shah",
        phone: "8197707287",
        email: "saloni@gmail.com",
        pincode: "400002",
      },
      productDetails: {
        items: [
          {
            name: "Dal",
            quantity: "2",
            price: "200",
          },
          {
            name: "Rice",
            quantity: "2",
            price: "45",
          },
          {
            name: "Jowar",
            quantity: "2",
            price: "90",
          },
        ],
        tax: "5",
        discount: "2",
        grandTotal: 689.43,
        discountVal: 14.07,
        taxVal: 33.5,
        subTotal: 670,
      },
      order: 0,
    },
  ],
  selectedInvoice: 0,
};

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  reducers: {
    addInvoiceItem: (state, action) => {
      state.list.unshift({ ...action.payload, order: state.list.length });
    },
    setSelectedInvoice: (state, action) => {
      state.selectedInvoice = action.payload;
    },
  },
});
export const invoicesActions = invoiceSlice.actions;
export default invoiceSlice.reducer;

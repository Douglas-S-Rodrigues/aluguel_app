import React, { useState, useContext } from "react";
import axiosApi from "../services/axiosApi";
import MyContext from "../context/MyContext";
import { useNavigate } from "react-router";

export default function CheckoutForm() {
  const { cart, setCart } = useContext(MyContext);

  const [detailsInfo, setDetailsInfo] = useState({
    id: 0,
    name: "",
    price: 0,
    urlImage: "",
    deliveryTime: "",
    subscriptionPeriod: "",
    address: "",
    addressNumber: "",
  });

  const [validateImg, setValidateImg] = useState(false);

  let navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setDetailsInfo({ ...detailsInfo, [name]: value });
  };

  const finishOrder = async () => {
    try {
      const pickIdLocalStorage = JSON.parse(localStorage.getItem("userId"));
      const newSale = cart.map((product) => ({
        userId: pickIdLocalStorage.id,
        name: product.name,
        price: product.price,
        urlImage: product.urlImage,
        deliveryTime: product.deliveryTime,
        subscriptionPeriod: product.subscriptionPeriod,
        address: detailsInfo.address,
        number: detailsInfo.addressNumber,
      }));
      console.log("oi", newSale);

      await axiosApi.post("/rented", [...newSale]);

      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
    } catch (err) {
      console.log(err);
    }

    navigate("/profile");
  };

  const validate = () => {
    setValidateImg(true);
  };

  return (
    <section>
      <label htmlFor="address-input">
        Endereço
        <input
          id="address-input"
          name="address"
          value={detailsInfo.address}
          type="text"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="addressNumber-input">
        Número
        <input
          id="addressNumber-input"
          name="addressNumber"
          value={detailsInfo.addressNumber}
          type="text"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="document-input">
        Documento de identificação em formato pdf
      </label>
      <input
        id="address-input"
        type="file"
        accept="application/pdf"
        onChange={validate}
      />
      <button type="submit" disabled={!validateImg} onClick={finishOrder}>
        FINALIZAR PEDIDO
      </button>
    </section>
  );
}

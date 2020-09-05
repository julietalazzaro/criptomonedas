import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import axios from "axios";

import Error from "./Error.js";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  color: #fff;
  padding: 10px;
  font-size: 20px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;
const Formulario = ({ setMoneda, setCriptomoneda }) => {
  const [listaCripto, setListaCripto] = useState({});
  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolar de Estados Unidos" },
    { codigo: "MXN", nombre: "Peso mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra esterlina" },
  ];
  //utilizar use moneda
  const [moneda, SelectMonedas] = useMoneda("Elije tu moneda", "", MONEDAS);
  const [criptomoneda, SelectCripto] = useCriptomoneda(
    "Elije tu criptomoneda",
    "",
    listaCripto
  );

  //llamado api
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);
      setListaCripto(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (moneda === "" || criptomoneda === "") {
      setError(true);
      return;
    }
    setError(false);
    setCriptomoneda(criptomoneda);
    setMoneda(moneda);
  };
  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

Formulario.propTypes = {
  setCriptomoneda: PropTypes.func.isRequired,
  setMoneda: PropTypes.func.isRequired,
};
export default Formulario;

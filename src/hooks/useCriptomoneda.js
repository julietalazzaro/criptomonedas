import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  --webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

const useCriptomoneda = (label, stateInicial, opciones) => {
  opciones = Array.from(opciones);

  //state del custom hook
  const [state, setState] = useState(stateInicial);

  const SeleccionarCripto = () => (
    <Fragment>
      <Label htmlFor="moneda">{label}</Label>
      <Select
        onChange={(e) => setState(e.target.value)}
        value={state}
        name="moneda"
      >
        <option value="">--- Seleccione ---</option>
        {opciones.map((opcion) => (
          <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>
            {opcion.CoinInfo.FullName}
          </option>
        ))}
      </Select>
    </Fragment>
  );

  //retornar state, iterfaz y fn  modif state
  return [state, SeleccionarCripto, setState];
};

export default useCriptomoneda;

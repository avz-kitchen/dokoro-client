/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
const TitleContext = createContext();

function TitleProvider({ children }) {
  const [title, setTitle] = useState("Default Title");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}
const useTitle = () => useContext(TitleContext);

export { TitleProvider, useTitle };

import { createContext, ReactNode, useState } from "react";

interface EproPropertiesInfos {
  title: string;
}

interface CascadeContextData {
  [propertyId: string]: any;
  toggleDisplayingProperties: (propertyId: string) => void;
}

interface CascadeProviderProps {
  children: ReactNode;
}

const eproDisplayingProperties = {
  "pn": {},
  "revision": {},
  "quantity": {}
}

const eproPropertiesInfo = {
  "pn": {
    title: "PN"
  },
  "revision": {
    title: "Revisão"
  },
  "quantity": {
    title: "Qtd."
  }
}

export const CascadeContext = createContext({} as CascadeContextData);

export function CascadeProvider ({
  children,
  ...rest
}: CascadeProviderProps) {
  const [ displayingProperties, setDisplayingProperties ] = useState(eproDisplayingProperties);

  function toggleDisplayingProperties(propertyId: string) {
    if(displayingProperties[propertyId]){
      delete displayingProperties[propertyId];
    } 
    else {
      displayingProperties[propertyId] = {};
      setDisplayingProperties(displayingProperties);
    }
    console.log(displayingProperties);
  }

  return(
    <CascadeContext.Provider
      value={{
        displayingProperties,
        eproPropertiesInfo,
        toggleDisplayingProperties
      }}
    >
      {children}
    </CascadeContext.Provider>
  );
}
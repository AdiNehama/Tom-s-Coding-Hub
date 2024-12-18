import React, { createContext, useContext, useState, ReactNode } from "react";

interface AlertContextType {
  alertMessage: string | null;
  setAlertMessage: (message: string | null) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  return (
    <AlertContext.Provider value={{ alertMessage, setAlertMessage }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};

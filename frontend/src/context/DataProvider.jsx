import { createContext, useState } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const participantUser = JSON.parse(sessionStorage.getItem("ParticipantUser"));
  const organiserUser = JSON.parse(sessionStorage.getItem("OrganiserUser"));

  const storedUser = participantUser ||
    organiserUser || { username: "", email: "" , id:"" };

  const [account, setAccount] = useState(storedUser);

  return (
    <DataContext.Provider value={{ account, setAccount }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [player_id, setPlayer_Id] = useState("");

  return (
    <UserContext.Provider value={{ player_id, setPlayer_Id }}>
      {children}
    </UserContext.Provider>
  );
};

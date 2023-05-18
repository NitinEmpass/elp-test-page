import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [player_id, setPlayer_Id] = useState("");
  const [questions, setQuestions] = useState("");
  const [name, setName] = useState("");

  return (
    <UserContext.Provider
      value={{
        player_id,
        setPlayer_Id,
        questions,
        setQuestions,
        name,
        setName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

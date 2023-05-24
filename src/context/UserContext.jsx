import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [player_id, setPlayer_Id] = useState("");
  const [questions, setQuestions] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");

  return (
    <UserContext.Provider
      value={{
        player_id,
        setPlayer_Id,
        questions,
        setQuestions,
        name,
        setName,
        email,
        setEmail,
        age,
        setAge,
        gender,
        setGender,
        grade,
        setGrade,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

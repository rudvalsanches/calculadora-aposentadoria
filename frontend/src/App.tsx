import React, { useState } from "react";
import Form from "./components/Form";
import ResultPage from "./pages/ResultPage";

function App() {
  const [result, setResult] = useState<{
    montante: number;
    tempo: number;
    rendaMensal: number;
    aporteMensal: number;
    aporteInicial: number;
    taxaAnual: number;
  } | null>(null);

  const saveUserData = async (userData: { nome: string; email: string; dataNascimento: string }) => {
    try {
      const response = await fetch("http://localhost:5000/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar os dados no backend!");
      }

    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    }
  };

  return (
    <div>
      {result === null ? (
        <Form
          onCalculate={(res) => setResult(res)}
          onSaveUser={(userData) => saveUserData(userData)}
        />
      ) : (
        <ResultPage result={result} />
      )}
    </div>
  );
}

export default App;

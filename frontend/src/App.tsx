import React from "react";
import Form from "./components/Form";
import ResultPage from "./pages/ResultPage";

function App() {
  const [result, setResult] = React.useState<{
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
    <div style={{ textAlign: "center", color: "white", backgroundColor: "#121212", minHeight: "100vh", padding: "20px" }}>
      {/* Header com Nome e descricao */}
      <header style={{ marginBottom: "20px" }}>
      <h1 style={{ fontSize: "24px", color: "#ffffff", margin: "10px 0" }}>Calculadora de Aposentadoria</h1>
      <p style={{ fontSize: "16px", color: "#b0b0b0", maxWidth: "600px", margin: "0 auto" }}>
        Use nossa calculadora para planejar sua aposentadoria. Preencha os campos com seus dados e veja quanto tempo levará para atingir o montante necessário para sua renda desejada.
      </p>
      
    </header>


      {/* Renderização do Formulário ou Resultado */}
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

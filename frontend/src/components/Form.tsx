import React, { useState } from "react";

interface FormProps {
  onCalculate: (result: {
    montante: number;
    tempo: number;
    rendaMensal: number;
    aporteMensal: number;
    aporteInicial: number;
    taxaAnual: number;
  }) => void;
  onSaveUser: (userData: { nome: string; email: string; dataNascimento: string }) => void;
}

const Form: React.FC<FormProps> = ({ onCalculate, onSaveUser }) => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    rendaMensal: "",
    aporteInicial: "",
    aporteMensal: "",
    taxaAnual: "",
  });

  const handleInputChange = (field: string, value: string) => {
    if (["rendaMensal", "aporteInicial", "aporteMensal"].includes(field)) {
      // Formatar valores monetários no formato brasileiro
      const formattedValue = value
        .replace(/\D/g, "") // Remove caracteres não numéricos
        .replace(/(\d)(\d{2})$/, "$1,$2") // Adiciona vírgula para centavos
        .replace(/(?=(\d{3})+(\D))\B/g, "."); // Adiciona pontos de milhar

      setFormData((prev) => ({
        ...prev,
        [field]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const {
      nome,
      email,
      dataNascimento,
      rendaMensal,
      aporteInicial,
      aporteMensal,
      taxaAnual,
    } = formData;

    if (
      !nome ||
      !email ||
      !dataNascimento ||
      !rendaMensal ||
      !aporteInicial ||
      !aporteMensal ||
      !taxaAnual
    ) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    // Convertendo para valores numéricos
    const rendaMensalNum = parseFloat(rendaMensal.replace(/\./g, "").replace(",", "."));
    const aporteInicialNum = parseFloat(aporteInicial.replace(/\./g, "").replace(",", "."));
    const aporteMensalNum = parseFloat(aporteMensal.replace(/\./g, "").replace(",", "."));
    const taxaAnualNum = parseFloat(taxaAnual.replace(/\./g, "").replace(",", "."));

    if (
      isNaN(rendaMensalNum) ||
      isNaN(aporteInicialNum) ||
      isNaN(aporteMensalNum) ||
      isNaN(taxaAnualNum)
    ) {
      alert("Por favor, insira valores válidos.");
      return;
    }

    const taxaMensal = Math.pow(1 + taxaAnualNum / 100, 1 / 12) - 1;
    const montanteFinal = rendaMensalNum / taxaMensal;

    let tempoMeses = 0;
    let montanteAtual = aporteInicialNum;

    while (montanteAtual < montanteFinal && tempoMeses < 1200) {
      montanteAtual += aporteMensalNum;
      montanteAtual *= 1 + taxaMensal;
      tempoMeses++;
    }

    if (tempoMeses >= 1200) {
      alert(
        "Com os valores informados, será muito difícil atingir o montante necessário. Tente ajustar os aportes ou a taxa de retorno."
      );
      return;
    }

    onSaveUser({ nome, email, dataNascimento });

    onCalculate({
      montante: montanteFinal,
      tempo: tempoMeses / 12,
      rendaMensal: rendaMensalNum,
      aporteMensal: aporteMensalNum,
      aporteInicial: aporteInicialNum,
      taxaAnual: taxaAnualNum,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Preencha os dados</h2>

      <label htmlFor="nome">Nome:</label>
      <input
        id="nome"
        type="text"
        value={formData.nome}
        onChange={(e) => handleInputChange("nome", e.target.value)}
      />

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        value={formData.email}
        onChange={(e) => handleInputChange("email", e.target.value)}
      />

      <label htmlFor="dataNascimento">Data de Nascimento:</label>
      <input
        id="dataNascimento"
        type="date"
        value={formData.dataNascimento}
        onChange={(e) => handleInputChange("dataNascimento", e.target.value)}
      />

      <label htmlFor="rendaMensal">Renda Mensal Desejada (R$):</label>
      <input
        id="rendaMensal"
        type="text"
        value={formData.rendaMensal}
        onChange={(e) => handleInputChange("rendaMensal", e.target.value)}
      />

      <label htmlFor="aporteInicial">Aporte Inicial (R$):</label>
      <input
        id="aporteInicial"
        type="text"
        value={formData.aporteInicial}
        onChange={(e) => handleInputChange("aporteInicial", e.target.value)}
      />

      <label htmlFor="aporteMensal">Aporte Mensal (R$):</label>
      <input
        id="aporteMensal"
        type="text"
        value={formData.aporteMensal}
        onChange={(e) => handleInputChange("aporteMensal", e.target.value)}
      />

      <label htmlFor="taxaAnual">Taxa Anual (%):</label>
      <input
        id="taxaAnual"
        type="text"
        value={formData.taxaAnual}
        onChange={(e) => handleInputChange("taxaAnual", e.target.value)}
      />

      <button type="submit">Calcular</button>
    </form>
  );
};

export default Form;

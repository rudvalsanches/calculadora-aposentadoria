import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ResultPageProps {
  result: {
    montante: number;
    tempo: number;
    rendaMensal: number;
    aporteMensal: number;
    aporteInicial: number;
    taxaAnual: number;
  };
}

const ResultPage: React.FC<ResultPageProps> = ({ result }) => {
  if (!result) {
    return (
      <div
        style={{
          color: "white",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#121212",
          borderRadius: "8px",
        }}
      >
        <h2>Erro</h2>
        <p>Os dados necessários para a simulação não foram fornecidos.</p>
      </div>
    );
  }

  const montanteFormatado = result.montante.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const rendaMensalFormatada = result.rendaMensal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const tempoAnos = Math.floor(result.tempo);
  const tempoMeses = Math.round((result.tempo - tempoAnos) * 12);

  const labels = Array.from({ length: Math.ceil(result.tempo) }, (_, i) => `Ano ${i + 1}`);
  const valores = labels.map((_, i) => result.montante * (i / labels.length));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Progresso do Montante",
        data: valores,
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) =>
            `R$ ${tooltipItem.raw.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Tempo (anos)" } },
      y: { title: { display: true, text: "Montante (R$)" } },
    },
  };

  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#121212",
        borderRadius: "8px",
        maxWidth: "800px",
        margin: "20px auto",
      }}
    >
      <h2>Resultado da Simulação</h2>

      {/* Cartões */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "20px",
          gap: "15px",
        }}
      >
        <div
          style={{
            flex: "1 1 calc(50% - 15px)",
            padding: "15px",
            background: "linear-gradient(135deg, #007bff, #0056b3)",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <strong>Renda Mensal Desejada</strong>
          <p>{rendaMensalFormatada}</p>
          <small style={{ display: "block", marginTop: "10px", fontSize: "12px" }}>
            Valor que você pretende receber mensalmente após atingir o montante necessário.
          </small>
        </div>

        <div
          style={{
            flex: "1 1 calc(50% - 15px)",
            padding: "15px",
            background: "linear-gradient(135deg, #28a745, #1e7e34)",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <strong>Montante Final Necessário</strong>
          <p>{montanteFormatado}</p>
          <small style={{ display: "block", marginTop: "10px", fontSize: "12px" }}>
            Total acumulado para sustentar sua renda mensal desejada.
          </small>
        </div>

        <div
          style={{
            flex: "1 1 calc(50% - 15px)",
            padding: "15px",
            background: "linear-gradient(135deg, #6f42c1, #452071)",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <strong>Tempo Estimado</strong>
          <p>
            {tempoAnos} anos e {tempoMeses} meses
          </p>
          <small style={{ display: "block", marginTop: "10px", fontSize: "12px" }}>
            Tempo necessário para atingir o montante, considerando aportes mensais.
          </small>
        </div>
      </div>

      {/* Gráfico */}
      <div style={{ marginTop: "30px" }}>
        <h3>Progresso do Montante ao Longo do Tempo</h3>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ResultPage;

document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const email = document.getElementById('email').value;

    const valorMensal = parseFloat(document.getElementById('valor-mensal').value);
    const rentabilidadeAnual = parseFloat(document.getElementById('rentabilidade').value);
    const aporteMensal = parseFloat(document.getElementById('aporte').value);

    const montanteNecessario = valorMensal * 12 / (rentabilidadeAnual / 100);
    let saldoAtual = 0;
    let meses = 0;

    while (saldoAtual < montanteNecessario) {
        saldoAtual += aporteMensal;
        saldoAtual += saldoAtual * (rentabilidadeAnual / 100 / 12);
        meses++;
    }

    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    const resultado = `
        Para receber R$ ${valorMensal.toLocaleString('pt-BR')} por mês, você precisará de um montante total de R$ ${montanteNecessario.toLocaleString('pt-BR')}.
        Com um aporte mensal de R$ ${aporteMensal.toLocaleString('pt-BR')} e rentabilidade anual de ${rentabilidadeAnual.toFixed(2)}%, você alcançará esse montante em aproximadamente ${anos} anos e ${mesesRestantes} meses.
    `;
    document.getElementById('resultado').textContent = resultado;

    enviarParaMongoDB(nome, dataNascimento, email, valorMensal, rentabilidadeAnual, aporteMensal, anos, mesesRestantes);
});


const { MongoClient } = require('mongodb');

async function enviarParaMongoDB(nome, dataNascimento, email, valorMensal, rentabilidade, aporteMensal, anos, meses) {
    const uri = "mongodb+srv://calculadora-aposentadoria:MTbRuIiP1ZW8rPY4@cluster-mc2r.shsme.mongodb.net/?retryWrites=true&w=majority&appName=cluster-mc2r"; // Substitua pela sua URL completa
    const client = new MongoClient(uri);

    try {
        // Conectar ao cluster MongoDB
        await client.connect();

        // Selecionar banco de dados e coleção
        const database = client.db("calculadoraDB");
        const collection = database.collection("usuarios");

        // Criar o documento com os dados
        const documento = {
            nome: nome,
            dataNascimento: dataNascimento,
            email: email,
            valorMensal: valorMensal,
            rentabilidade: rentabilidade,
            aporteMensal: aporteMensal,
            tempoEstimado: `${anos} anos e ${meses} meses`,
            dataHora: new Date().toISOString(),
        };

        // Inserir o documento no MongoDB
        const resultado = await collection.insertOne(documento);
        console.log(`Documento inserido com ID: ${resultado.insertedId}`);
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro);
    } finally {
        // Fechar a conexão
        await client.close();
    }
}

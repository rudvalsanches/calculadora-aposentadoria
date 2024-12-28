document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    // Capturar dados do usuário
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('data-nascimento').value;
    const email = document.getElementById('email').value;

    // Capturar dados da calculadora
    const valorMensal = parseFloat(document.getElementById('valor-mensal').value);
    const rentabilidadeAnual = parseFloat(document.getElementById('rentabilidade').value) / 100;
    const aporteMensal = parseFloat(document.getElementById('aporte').value);

    // Calcular montante necessário
    const montanteNecessario = valorMensal * 12 / rentabilidadeAnual;

    // Calcular tempo necessário
    let saldoAtual = 0;
    let meses = 0;
    while (saldoAtual < montanteNecessario) {
        saldoAtual += aporteMensal;
        saldoAtual += saldoAtual * (rentabilidadeAnual / 12);
        meses++;
    }

    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;

    // Exibir o resultado
    const resultado = `
        Para receber R$ ${valorMensal.toLocaleString('pt-BR')} por mês, você precisará de um montante total de R$ ${montanteNecessario.toLocaleString('pt-BR')}.
        Com um aporte mensal de R$ ${aporteMensal.toLocaleString('pt-BR')} e rentabilidade anual de ${(rentabilidadeAnual * 100).toFixed(2)}%, você alcançará esse montante em aproximadamente ${anos} anos e ${mesesRestantes} meses.
    `;
    document.getElementById('resultado').textContent = resultado;

    // Enviar os dados para a planilha
    enviarParaPlanilha(nome, dataNascimento, email, valorMensal, rentabilidadeAnual * 100, aporteMensal, anos, mesesRestantes);
});

// Função para salvar os dados no Google Planilhas
async function enviarParaPlanilha(nome, dataNascimento, email, valorMensal, rentabilidade, aporteMensal, anos, meses) {
    const sheetId = '159Q_N0ZMyXJ1u5-LZ_SOdJO8CyDCy_66FZO4O34BT2E';
    const apiKey = 'AIzaSyAoVmEipkTkwqg93RpMqsQm_7CW-754Z9E';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    const dados = {
        values: [[
            nome,
            dataNascimento,
            email,
            valorMensal,
            rentabilidade,
            aporteMensal,
            `${anos} anos e ${meses} meses`,
            new Date().toLocaleString()
        ]],
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            console.log('Dados enviados com sucesso!');
        } else {
            console.error('Erro ao enviar os dados:', await response.text());
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

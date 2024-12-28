document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault();

    const idade = parseInt(document.getElementById('idade').value);
    const contribuicao = parseInt(document.getElementById('tempo-contribuicao').value);

    let resultado = '';
    if (idade >= 60 && contribuicao >= 35) {
        resultado = 'Você pode se aposentar!';
    } else {
        resultado = 'Ainda não é possível se aposentar.';
    }

    document.getElementById('resultado').textContent = resultado;
});

const enviarParaPlanilha = async (dados) => {
    const sheetId = '159Q_N0ZMyXJ1u5-LZ_SOdJO8CyDCy_66FZO4O34BT2E';
    const apiKey = 'AIzaSyAoVmEipkTkwqg93RpMqsQm_7CW-754Z9E';

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:append?valueInputOption=USER_ENTERED&key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            values: [dados],
        }),
    });

    if (!response.ok) {
        console.error('Erro ao salvar dados na planilha');
    }
};

// Exemplo de uso:
const dados = ['Nome do Usuário', 'idade', 'tempo de contribuição'];
enviarParaPlanilha(dados);

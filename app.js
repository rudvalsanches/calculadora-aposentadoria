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

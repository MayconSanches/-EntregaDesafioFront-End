$(document).ready(function() {
    function calcularTotal() {
        var linhas = $("#produtos-table tbody tr");

        linhas.each(function() {
           
            var qtdItem = parseInt($(this).find(".qtdItem").text());
            var valorItem = parseFloat($(this).find(".valorItem").text().replace(',', '.')); 

            var valorTotal = qtdItem * valorItem;

            $(this).find("td:nth-child(5)").text(valorTotal.toFixed(2).replace('.', ','));
        });
    }
    calcularTotal();

     // Clique no botão "Buscar"
     $('#buscar').click(function () {
        const cep = $('#cep').val();

        // Requisição API de CEP
        $.get(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
            if (!("erro" in data)) {
                $('#logradouro').val(data.logradouro);
                $('#bairro').val(data.bairro);
                $('#cidade').val(data.localidade);
                $('#estado').val(data.uf);
            } else {
                alert('CEP não encontrado. Verifique o CEP digitado.');
            }
        });
    });

    let anexos = [];

    // Evento de clique no botão "Adicionar Anexo"
    $('#adicionar-anexo').click(function () {
        const arquivoSelecionado = $('#anexo')[0].files[0];

        if (arquivoSelecionado) {
            // Adicione o anexo ao array
            anexos.push(arquivoSelecionado);

            // Adicione uma nova linha à tabela de anexos
            const newRow = $('<tr>');
            newRow.append('<td>' + arquivoSelecionado.name + '</td>');
            newRow.append('<td><button class="btn btn-danger remover-anexo">Remover</button></td>');

            $('#anexos-table tbody').append(newRow);

            // Limpe o campo de arquivo
            $('#anexo').val('');
        } else {
            alert('Nenhum arquivo selecionado.');
        }
    });

    $('#anexos-table').on('click', '.remover-anexo', function () {
        const rowIndex = $(this).closest('tr').index();

        anexos.splice(rowIndex, 1);
        $(this).closest('tr').remove();
    });
});

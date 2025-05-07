const btnEntrar = document.getElementById('btnEntrar');
const btnCadastrar = document.getElementById('btnCadastrar');
btnEntrar.addEventListener('click', function() {
      window.location.href = '../loginPage/index.html';
});

btnCadastrar.addEventListener('click', function() {
        // Aqui você pode implementar a lógica de cadastro
        // Se o cadastro for um sucesso, exibe o alerta:
    Swal.fire({
            title: "Usuário cadastrado!",
            text: "Seu usuário foi cadastrado com sucesso.",
            icon: "success",
            confirmButtonText: "OK"
    }).then((result) => {
        if(result.isConfirmed) {
                // Após confirmar o alerta, redireciona para a página de login
                window.location.href = '../loginPage/index.html';
        }
    });
});
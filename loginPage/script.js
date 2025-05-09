document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Coleta os dados do formulário
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    const payload = {
      email: email,
      senha: senha
    };

    const apiUrl = "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) { // Status 200 OK: autenticação realizada com sucesso
        const result = await response.json();

        // Armazena os dados no localStorage
        localStorage.setItem("emailUsuario", email);
        localStorage.setItem("tokenExpiracao", new Date(result.dataExpiracao).toLocaleString());

        await Swal.fire({
          title: "Autenticado com sucesso!",
          text: `Seja bem-vindo(a), ${email}! Seu token expira em ${new Date(result.dataExpiracao).toLocaleString()}.`,
          icon: "success",
          confirmButtonText: "OK"
        });

        // Redireciona para a tela de boas-vindas
        window.location.href = "../welcomePage/index.html";
      } else {
        let errorMessage = "";
        try {
          const errorData = await response.clone().json();
          if (errorData.errors) {
            Object.values(errorData.errors).forEach(errArray => {
              errorMessage += errArray.join("\n") + "\n";
            });
          } else if (errorData.title) {
            errorMessage = errorData.title;
          } else {
            errorMessage = "Erro ao processar a solicitação.";
          }
        } catch (jsonParseError) {
          errorMessage = await response.text();
        }
        Swal.fire("Erro", errorMessage, "error");
      }
    } catch (error) {
      Swal.fire("Erro", "Erro ao conectar com o servidor. " + error.message, "error");
    }
  });
});

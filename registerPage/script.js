document.addEventListener("DOMContentLoaded", () => {
        const btnEntrar = document.getElementById('btnEntrar');
        const registerForm = document.getElementById('registerForm');
      
        btnEntrar.addEventListener('click', () => {
          window.location.href = '../loginPage/index.html';
        });
      
        registerForm.addEventListener('submit', async (event) => {
          event.preventDefault();
      
          const email = document.getElementById('email').value.trim();
          const senha = document.getElementById('senha').value;
          const senhaConfirmada = document.getElementById('senhaConfirmada').value;
      
          if (senha !== senhaConfirmada) {
            Swal.fire("Erro", "As senhas não coincidem!", "error");
            return;
          }
      
          const payload = {
            email: email,
            senha: senha,
            senhaConfirmada: senhaConfirmada
          };
      
          const apiUrl = 'https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar';
      
          try {
            const response = await fetch(apiUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            });
                  
            if (response.status === 200) {
              await Swal.fire({
                title: "Usuário cadastrado!",
                text: "Seu usuário foi cadastrado com sucesso.",
                icon: "success",
                confirmButtonText: "OK"
              });
              window.location.href = '../loginPage/index.html';
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
      
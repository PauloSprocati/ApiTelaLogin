document.addEventListener("DOMContentLoaded", () => {

    const emailUsuario = localStorage.getItem("emailUsuario") || "usuário desconhecido";
    const tokenExpiracao = localStorage.getItem("tokenExpiracao") || "data não definida";

    document.getElementById("welcomeMessage").innerText = `Seja bem-vindo(a), ${emailUsuario}!`;
    document.getElementById("tokenInfo").innerText = `Seu token expira em: ${tokenExpiracao}`;
  
  });
  
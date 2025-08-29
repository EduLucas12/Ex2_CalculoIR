// Seletores dos campos
const form = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const login = document.getElementById("login");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmaSenha = document.getElementById("confirmaSenha");
const salario = document.getElementById("salario");
const dependentes = document.getElementById("dependentes");
const ir = document.getElementById("ir");

// Botões
const btnLimpar = document.getElementById("btnLimpar");

// Feedbacks
function setFeedback(input, message, ok = false) {
  const feedback = document.getElementById(input.id + "Feedback");
  if (ok) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    feedback.textContent = message;
    feedback.className = "feedback ok";
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
    feedback.textContent = message;
    feedback.className = "feedback err";
  }
}

// Validações dos campos
function validarNome() {
  if (nome.value.trim().length < 3) {
    setFeedback(nome, "O nome deve ter ao menos 3 caracteres.");
    return false;
  }
  setFeedback(nome, "Ok!", true);
  return true;
}

function validarCPF() {
  const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!regex.test(cpf.value)) {
    setFeedback(cpf, "CPF inválido. Use o formato 000.000.000-00.");
    return false;
  }
  setFeedback(cpf, "Ok!", true);
  return true;
}

function validarLogin() {
  const regex = /^[A-Za-z0-9._-]{4,}$/;
  if (!regex.test(login.value)) {
    setFeedback(login, "Login deve ter ao menos 4 caracteres e pode conter letras, números, . _ -");
    return false;
  }
  setFeedback(login, "Ok!", true);
  return true;
}

function validarEmail() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regex.test(email.value)) {
    setFeedback(email, "E-mail inválido.");
    return false;
  }
  setFeedback(email, "Ok!", true);
  return true;
}

function validarSenha() {
  const regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (!regex.test(senha.value)) {
    setFeedback(senha, "Senha deve ter ao menos 8 caracteres, incluindo letras e números.");
    return false;
  }
  setFeedback(senha, "Ok!", true);
  return true;
}

function validarConfirmaSenha() {
  if (confirmaSenha.value !== senha.value || confirmaSenha.value === "") {
    setFeedback(confirmaSenha, "As senhas não coincidem.");
    return false;
  }
  setFeedback(confirmaSenha, "Ok!", true);
  return true;
}

function validarSalario() {
  if (parseFloat(salario.value) <= 0 || isNaN(salario.value)) {
    setFeedback(salario, "Informe um salário válido.");
    return false;
  }
  setFeedback(salario, "Ok!", true);
  return true;
}

function validarDependentes() {
  if (parseInt(dependentes.value) < 0 || isNaN(dependentes.value)) {
    setFeedback(dependentes, "Informe um número de dependentes válido (≥ 0).");
    return false;
  }
  setFeedback(dependentes, "Ok!", true);
  return true;
}

// Função para Calculo do IR
dependentes.addEventListener("blur", calcularIR);

function calcularIR() {
  if (!validarSalario() || !validarDependentes()) {
    ir.value = "0,00";
    return;
  }
  let base = parseFloat(salario.value) - (200 * parseInt(dependentes.value));
  if (base < 0) base = 0;

  let aliquota = 0;
  if (base <= 1900) aliquota = 0;
  else if (base <= 2826.65) aliquota = 0.075;
  else if (base <= 3751.05) aliquota = 0.15;
  else if (base <= 4664.68) aliquota = 0.225;
  else aliquota = 0.275;

  let imposto = base * aliquota;
  ir.value = imposto.toFixed(2).replace(".", ",");
}

// Botão de mostrar/ocultar senha
document.querySelectorAll(".toggle-pass").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.target);
    target.type = target.type === "password" ? "text" : "password";
  });
});

// Execução do botão cadastrar
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Executa todas as validações
  const validacoes = [
    validarNome(),
    validarCPF(),
    validarLogin(),
    validarEmail(),
    validarSenha(),
    validarConfirmaSenha(),
    validarSalario(),
    validarDependentes()
  ];

  // Se houver erro, foca no primeiro erro
  if (validacoes.includes(false)) {
    const primeiroInvalido = document.querySelector(".is-invalid");
    if (primeiroInvalido) primeiroInvalido.focus();
    return;
  }

  alert("Usuário cadastrado com sucesso!");
  form.reset();
  ir.value = "0,00";
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("is-valid", "is-invalid"));
});

// EExecução do botão limpar
btnLimpar.addEventListener("click", () => {
  form.reset();
  ir.value = "0,00";
  document.querySelectorAll("input").forEach(inp => inp.classList.remove("is-valid", "is-invalid"));
  document.querySelectorAll(".feedback").forEach(fb => fb.textContent = "");
});

// Adicionar caracteres especiais ao CPF
cpf.addEventListener("input", () => {
  let valor = cpf.value.replace(/\D/g, ""); // remove tudo que não for número
  if (valor.length > 11) valor = valor.slice(0, 11); // limita a 11 dígitos

  if (valor.length > 9) {
    cpf.value = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
  } else if (valor.length > 6) {
    cpf.value = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
  } else if (valor.length > 3) {
    cpf.value = valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
  } else {
    cpf.value = valor;
  }
});

// Função para Calculo do IR
function calcularIR() {
  if (!validarSalario() || !validarDependentes()) {
    ir.value = "0,00";
    return;
  }

  let base = parseFloat(salario.value) - (200 * parseInt(dependentes.value));
  if (base < 0) base = 0;

  // Definindo a alíquota conforme a faixa
  let aliquota = 0;
  if (base <= 1900) {
    aliquota = 0;
  } else if (base <= 2826.65) {
    aliquota = 0.075;
  } else if (base <= 3751.05) {
    aliquota = 0.15;
  } else if (base <= 4664.68) {
    aliquota = 0.225;
  } else {
    aliquota = 0.275;
  }

  let imposto = base * aliquota;
  ir.value = imposto.toFixed(2).replace(".", ",");
}


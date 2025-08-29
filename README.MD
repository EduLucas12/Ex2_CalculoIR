# Cadastro de Usuários com Validação (HTML, CSS e JavaScript)

## 📌 Descrição
Este projeto foi desenvolvido como atividade avaliativa complementar da disciplina **Programação para Internet**.  
O objetivo é criar uma aplicação web simples que permita o **cadastro de usuários** com **validação de formulários**, utilizando apenas **HTML, CSS e JavaScript puro**.  

A aplicação também realiza o **cálculo do Imposto de Renda (IR)** com base no salário e no número de dependentes informados.

---

## 🚀 Funcionalidades
- Validação dos campos do formulário:
  - **Nome completo** (mínimo 3 caracteres)  
  - **CPF** com máscara automática (`000.000.000-00`)  
  - **Login** (mínimo 4 caracteres, letras, números e símbolos `._-`)  
  - **E-mail** (validação de formato)  
  - **Senha** (mínimo 8 caracteres, pelo menos 1 letra e 1 número)  
  - **Confirmação de senha** (deve ser idêntica à senha)  
  - **Salário** (numérico > 0)  
  - **Número de dependentes** (inteiro ≥ 0)  
- **Cálculo automático do IR** após sair do campo dependentes.  
- **Feedback visual** de erros e sucessos (borda verde/vermelha, mensagens).  
- Botão **Cadastrar**:
  - Valida todos os campos  
  - Impede envio com erros  
  - Exibe mensagem de sucesso  
  - Reseta o formulário  
- Botão **Limpar**:
  - Reseta todos os campos  
  - Remove feedback visual  
  - Zera o campo IR  

---

## 🧮 Cálculo do IR (didático)
Base de cálculo = `Salário – (200 × Dependentes)`  
Se a base for negativa, será considerado 0.  
A alíquota é aplicada conforme a faixa abaixo:  

| Base de cálculo (R$)      | Alíquota |
|---------------------------|----------|
| até 1.900                 | 0%       |
| de 1.900,01 até 2.826,65  | 7,5%     |
| de 2.826,66 até 3.751,05  | 15%      |
| de 3.751,06 até 4.664,68  | 22,5%    |
| acima de 4.664,68         | 27,5%    |

---

## 🖼️ Exemplo de Uso
- Ao preencher os dados corretamente, o botão **Cadastrar** exibirá a mensagem:  
  > "Usuário cadastrado com sucesso!"  

- O **CPF** digitado sem pontos/traço será **automaticamente formatado** no padrão `000.000.000-00`.  

- O **IR** será calculado automaticamente após preencher o número de dependentes.  

---

## 🛠️ Tecnologias Utilizadas
- HTML5  
- CSS3 (com variáveis, layout responsivo e feedback visual)  
- JavaScript (validação, regex, máscaras e cálculo do IR)  

---

## ▶️ Como Executar
1. Baixe ou clone este repositório
2. Entre na pasta do projeto
3. Abra o arquivo index.html em qualquer navegador

## Observações:
- Para a realização e entedimento de algumas etapas do exercício foi utilizado IA.
- Este é um calculo simples e fictício para uso somente no exercício e não deve ser utilizado como regra
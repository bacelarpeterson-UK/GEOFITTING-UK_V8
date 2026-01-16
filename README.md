# 🌍 Geofitting - UK Consultoria Migratória

Sistema de questionário online para análise de perfil migratório com integração de email e banco de dados.

## 📋 Funcionalidades

- ✅ Questionário completo com 11 seções
- ✅ Análise automática de perfil com scoring
- ✅ Ranking de países e rotas recomendadas
- ✅ **Envio de email** quando cliente finaliza
- ✅ **Salvamento em Google Sheets** (banco de dados)
- ✅ Botão de WhatsApp para contato direto
- ✅ Design responsivo (mobile e desktop)

---

## 🚀 PASSO A PASSO PARA COLOCAR NO AR

### PASSO 1: Criar conta no GitHub (se não tiver)
1. Acesse https://github.com
2. Clique em "Sign up"
3. Crie sua conta gratuitamente

### PASSO 2: Criar repositório no GitHub
1. Clique no botão "+" no canto superior direito
2. Selecione "New repository"
3. Nome: `geofitting-uk`
4. Deixe público
5. Clique "Create repository"

### PASSO 3: Fazer upload dos arquivos
1. Na página do repositório, clique em "uploading an existing file"
2. Arraste todos os arquivos da pasta `geofitting-uk`
3. Clique "Commit changes"

### PASSO 4: Conectar com Vercel (hospedagem)
1. Acesse https://vercel.com
2. Clique em "Sign up" → "Continue with GitHub"
3. Autorize o acesso
4. Clique em "Add New..." → "Project"
5. Selecione o repositório `geofitting-uk`
6. Clique "Deploy"

🎉 **Pronto! Seu site estará no ar em ~2 minutos!**

Você receberá uma URL tipo: `https://geofitting-uk.vercel.app`

---

## ⚙️ CONFIGURAR INTEGRAÇÕES

### CONFIGURAR EMAIL (EmailJS)

1. **Criar conta no EmailJS**
   - Acesse https://www.emailjs.com
   - Clique "Sign Up Free"
   - Crie sua conta

2. **Conectar seu email**
   - No dashboard, clique "Email Services"
   - Clique "Add New Service"
   - Selecione seu provedor (Gmail, Outlook, etc)
   - Siga as instruções para conectar
   - Anote o **Service ID** (ex: `service_abc123`)

3. **Criar template de email**
   - Clique em "Email Templates"
   - Clique "Create New Template"
   - Cole este template:

```
Assunto: 🌍 Novo Lead Geofitting - {{client_name}}

Novo questionário preenchido!

📋 DADOS DO CLIENTE
-------------------
Nome: {{client_name}}
Email: {{client_email}}
Telefone: {{client_phone}}
Faixa Etária: {{client_age}}

💼 PERFIL PROFISSIONAL
----------------------
Área: {{client_area}}
Experiência: {{client_experience}}
Formação: {{client_education}}
Inglês: {{client_english}}

🎯 INTERESSES
-------------
Países: {{countries_interest}}
Motivações: {{motivations}}
Timeline: {{client_timeline}}
Investimento: {{client_budget}}

📊 RESULTADO DA ANÁLISE
-----------------------
1º {{top_country_1}} - {{top_country_1_score}}%
2º {{top_country_2}} - {{top_country_2_score}}%
3º {{top_country_3}} - {{top_country_3_score}}%

Rota Recomendada: {{recommended_route}}

📅 Enviado em: {{submission_date}}
```

   - Clique "Save"
   - Anote o **Template ID** (ex: `template_xyz789`)

4. **Pegar Public Key**
   - Clique em "Account" no menu
   - Copie a **Public Key**

5. **Adicionar variáveis no Vercel**
   - No Vercel, vá em Settings → Environment Variables
   - Adicione:
     - `NEXT_PUBLIC_EMAILJS_SERVICE_ID` = seu Service ID
     - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` = seu Template ID
     - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` = sua Public Key
     - `NEXT_PUBLIC_NOTIFICATION_EMAIL` = seu email para receber notificações

---

### CONFIGURAR GOOGLE SHEETS (Banco de Dados)

1. **Criar planilha**
   - Acesse https://sheets.google.com
   - Crie uma nova planilha
   - Nome: "Geofitting - Respostas"
   - Na linha 1, coloque os cabeçalhos:
   ```
   Timestamp | Nome | Email | Telefone | Idade | Estado Civil | Cidadania | Área | Cargo | Experiência | Formação | Inglês | Espanhol | Renda | Patrimônio | Filhos | Motivações | Países Interesse | Timeline | País 1 | Score 1 | País 2 | Score 2 | País 3 | Score 3 | Rota Recomendada
   ```

2. **Criar Google Apps Script**
   - No menu da planilha: Extensões → Apps Script
   - Delete o código existente e cole:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var row = [
      data.timestamp || new Date().toISOString(),
      data.nome || '',
      data.email || '',
      data.telefone || '',
      data.faixaEtaria || '',
      data.estadoCivil || '',
      data.duplaCidadania || '',
      data.areaAtuacao || '',
      data.nivelCargo || '',
      data.anosExperiencia || '',
      data.nivelFormacao || '',
      data.ingles || '',
      data.espanhol || '',
      data.rendaMensal || '',
      data.patrimonio || '',
      data.numeroFilhos || '',
      data.motivacoes || '',
      data.paisesInteresse || '',
      data.prazoIdeal || '',
      data.pais1 || '',
      data.score1 || '',
      data.pais2 || '',
      data.score2 || '',
      data.pais3 || '',
      data.score3 || '',
      data.rotaRecomendada || ''
    ];
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Geofitting API funcionando!");
}
```

3. **Publicar o script**
   - Clique em "Implantar" → "Nova implantação"
   - Tipo: "App da Web"
   - Executar como: "Eu"
   - Quem tem acesso: "Qualquer pessoa"
   - Clique "Implantar"
   - Autorize o acesso
   - **Copie a URL** (será algo como `https://script.google.com/macros/s/xxx/exec`)

4. **Adicionar no Vercel**
   - No Vercel: Settings → Environment Variables
   - Adicione:
     - `NEXT_PUBLIC_GOOGLE_SHEETS_URL` = URL do Apps Script

---

### CONFIGURAR WHATSAPP

No Vercel, adicione:
- `NEXT_PUBLIC_WHATSAPP_NUMBER` = seu número com código do país (ex: `5511999999999`)

---

## 🔄 Após configurar variáveis

1. No Vercel, vá em "Deployments"
2. Clique nos 3 pontinhos do último deploy
3. Clique "Redeploy"

Pronto! As integrações estarão funcionando.

---

## 🌐 Domínio Personalizado (Opcional)

Para usar seu próprio domínio (ex: `geofitting.ukconsultoria.com.br`):

1. No Vercel: Settings → Domains
2. Adicione seu domínio
3. Configure o DNS conforme instruções do Vercel

---

## 📱 Testando

1. Acesse seu site
2. Preencha o questionário completo
3. Verifique:
   - ✅ Email chegou na sua caixa de entrada
   - ✅ Dados apareceram na planilha Google Sheets
   - ✅ Botão do WhatsApp funciona

---

## 💰 Custos

| Serviço | Limite Gratuito | Custo após limite |
|---------|-----------------|-------------------|
| Vercel | Ilimitado para sites simples | $0 |
| EmailJS | 200 emails/mês | $15/mês (1000 emails) |
| Google Sheets | Ilimitado | $0 |

**Para até 200 clientes/mês, o custo é ZERO!**

---

## 🆘 Suporte

Se tiver dúvidas:
1. Verifique se todas as variáveis de ambiente estão corretas
2. Verifique o console do navegador (F12) para erros
3. Teste as integrações individualmente

---

## 📁 Estrutura de Arquivos

```
geofitting-uk/
├── pages/
│   ├── _app.js          # Configuração do Next.js
│   └── index.js         # Página principal (questionário)
├── lib/
│   └── integrations.js  # Funções de email e sheets
├── styles/
│   └── globals.css      # Estilos globais
├── package.json         # Dependências
├── next.config.js       # Configuração Next.js
├── tailwind.config.js   # Configuração Tailwind CSS
├── postcss.config.js    # Configuração PostCSS
├── .env.example         # Exemplo de variáveis
└── README.md            # Este arquivo
```

---

Desenvolvido para **UK Consultoria Migratória** 🇧🇷✈️🌍

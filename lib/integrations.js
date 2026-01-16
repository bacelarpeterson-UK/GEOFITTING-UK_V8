import emailjs from '@emailjs/browser';

// Inicializar EmailJS
export const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

// Enviar email com resumo do questionário
export const sendEmailNotification = async (formData, analysisResults) => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const notificationEmail = process.env.NEXT_PUBLIC_NOTIFICATION_EMAIL;

  if (!serviceId || !templateId) {
    console.warn('EmailJS não configurado');
    return { success: false, error: 'EmailJS não configurado' };
  }

  const templateParams = {
    to_email: notificationEmail,
    client_name: formData.nomeCompleto || 'Não informado',
    client_email: formData.email || 'Não informado',
    client_phone: formData.telefone || 'Não informado',
    client_age: formData.faixaEtaria || 'Não informado',
    client_area: formData.areaAtuacao || 'Não informado',
    client_experience: formData.anosExperiencia || 'Não informado',
    client_education: formData.nivelFormacao || 'Não informado',
    client_english: formData.nivelIngles || 'Não informado',
    client_timeline: formData.prazoIdeal || 'Não informado',
    client_budget: formData.capacidadeInvestimento || 'Não informado',
    top_country_1: analysisResults.topCountries[0]?.name || 'N/A',
    top_country_1_score: analysisResults.topCountries[0]?.score || 'N/A',
    top_country_2: analysisResults.topCountries[1]?.name || 'N/A',
    top_country_2_score: analysisResults.topCountries[1]?.score || 'N/A',
    top_country_3: analysisResults.topCountries[2]?.name || 'N/A',
    top_country_3_score: analysisResults.topCountries[2]?.score || 'N/A',
    recommended_route: analysisResults.recommendedRoute || 'N/A',
    submission_date: new Date().toLocaleString('pt-BR'),
    countries_interest: formData.paisesInteresse?.join(', ') || 'Não informado',
    motivations: formData.motivacaoPrincipal?.join(', ') || 'Não informado',
  };

  try {
    const response = await emailjs.send(serviceId, templateId, templateParams);
    console.log('Email enviado com sucesso:', response);
    return { success: true, response };
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return { success: false, error };
  }
};

// Salvar dados no Google Sheets via Apps Script
export const saveToGoogleSheets = async (formData, analysisResults) => {
  const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.warn('Google Sheets não configurado');
    return { success: false, error: 'Google Sheets não configurado' };
  }

  const payload = {
    timestamp: new Date().toISOString(),
    
    // Dados Pessoais
    nome: formData.nomeCompleto || '',
    email: formData.email || '',
    telefone: formData.telefone || '',
    faixaEtaria: formData.faixaEtaria || '',
    estadoCivil: formData.estadoCivil || '',
    nacionalidade: formData.nacionalidade || '',
    duplaCidadania: formData.possuiDuplaCidadania || '',
    cidadeAtual: formData.cidadeAtual || '',
    
    // Perfil Profissional
    areaAtuacao: formData.areaAtuacao || '',
    subAreaTech: formData.subAreaTech || '',
    nivelCargo: formData.nivelCargo || '',
    tipoContrato: formData.tipoContrato || '',
    anosExperiencia: formData.anosExperiencia || '',
    gestaoEquipe: formData.gestaoEquipe || '',
    trabalhoRemoto: formData.trabalhoRemoto || '',
    
    // Realizações
    premios: formData.possuiPremios || '',
    publicacoes: formData.possuiPublicacoes || '',
    patentes: formData.possuiPatentes || '',
    palestras: formData.possuiPalestras || '',
    midia: formData.aparicoesMidia || '',
    
    // Formação
    nivelFormacao: formData.nivelFormacao || '',
    areaCurso: formData.areaCurso || '',
    tipoInstituicao: formData.tipoInstituicao || '',
    certificacoes: formData.certificacoes?.join(', ') || '',
    
    // Empresarial
    possuiEmpresa: formData.possuiEmpresa || '',
    faturamentoAnual: formData.faturamentoAnual || '',
    atuacaoInternacional: formData.atuacaoInternacional || '',
    interesseEmpreender: formData.interesseEmpreenderExterior || '',
    
    // Idiomas
    ingles: formData.nivelIngles || '',
    espanhol: formData.nivelEspanhol || '',
    alemao: formData.nivelAlemao || '',
    disposicaoAprender: formData.disposicaoAprender || '',
    
    // Financeiro
    rendaMensal: formData.rendaMensalFamiliar || '',
    patrimonio: formData.patrimonioLiquido || '',
    investimentoProcesso: formData.capacidadeInvestimento || '',
    goldenVisa: formData.disposicaoGoldenVisa || '',
    
    // Família
    situacaoConjuge: formData.situacaoConjuge || '',
    flexibilidadeConjuge: formData.flexibilidadeConjuge || '',
    numeroFilhos: formData.numeroFilhos || '',
    faixaEtariaFilhos: formData.faixaEtariaFilhos?.join(', ') || '',
    
    // Objetivos
    motivacoes: formData.motivacaoPrincipal?.join(', ') || '',
    objetivoCarreira: formData.objetivoCarreira || '',
    expectativaSalarial: formData.expectativaSalarial || '',
    planoRetorno: formData.planoRetorno || '',
    
    // Preferências
    paisesInteresse: formData.paisesInteresse?.join(', ') || '',
    preferenciaClima: formData.preferenciaClima || '',
    importanciaComunidadeBR: formData.importanciaComunidadeBR || '',
    preferenciaIdioma: formData.preferenciaIdiomaPais || '',
    toleranciaCusto: formData.toleranciaCustoVida || '',
    
    // Timeline
    prazoIdeal: formData.prazoIdeal || '',
    flexibilidadePrazo: formData.flexibilidadePrazo || '',
    situacaoBrasil: formData.situacaoAtualBrasil || '',
    jaIniciouProcesso: formData.jaIniciouProcesso || '',
    conhecimentoRotas: formData.conhecimentoRotas || '',
    
    // Resultados da Análise
    pais1: analysisResults.topCountries[0]?.name || '',
    score1: analysisResults.topCountries[0]?.score || '',
    pais2: analysisResults.topCountries[1]?.name || '',
    score2: analysisResults.topCountries[1]?.score || '',
    pais3: analysisResults.topCountries[2]?.name || '',
    score3: analysisResults.topCountries[2]?.score || '',
    rotaRecomendada: analysisResults.recommendedRoute || '',
  };

  try {
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      mode: 'no-cors', // Necessário para Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('Dados enviados para Google Sheets');
    return { success: true };
  } catch (error) {
    console.error('Erro ao salvar no Google Sheets:', error);
    return { success: false, error };
  }
};

// Função principal que executa ambas integrações
export const submitQuestionnaireData = async (formData, analysisResults) => {
  const results = {
    email: { success: false },
    sheets: { success: false },
  };

  // Executar em paralelo
  const [emailResult, sheetsResult] = await Promise.all([
    sendEmailNotification(formData, analysisResults),
    saveToGoogleSheets(formData, analysisResults),
  ]);

  results.email = emailResult;
  results.sheets = sheetsResult;

  return results;
};

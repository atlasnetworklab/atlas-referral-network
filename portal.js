'use strict';

// Shared configuration. Keep the partner-specific block at the top of each HTML file.
const CALENDLY_URL = null; // Awaiting Kerim's approved 15-minute event URL.
const MIN_PROJECT_USD = null; // OFF. See projectBudgetUSD() and README before enabling.
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwgJayLgU9KnF8lAIO8OhMCTl8xLO63RwQz2lYwq3wauG580svPVTejD393RmUOaC8C/exec';
const CONTACT_EMAIL = null; // Awaiting the approved public contact address.

// One text dictionary. Columns: EN, ES, FR, IT, PT.
// ES / FR / IT / PT: translated drafts, TO BE REVIEWED by native-language reviewers.
// Option labels translate; their approved English submission values do not change.
const LANGUAGES = ['en', 'es', 'fr', 'it', 'pt'];
const COPY = {
  pageTitle: ['Start Your Project · Atlas Referral Network','Empieza tu proyecto · Atlas Referral Network','Lancez votre projet · Atlas Referral Network','Inizia il tuo progetto · Atlas Referral Network','Comece seu projeto · Atlas Referral Network'],
  exploreTitle: ['Explore Atlas · Atlas Referral Network','Descubre Atlas · Atlas Referral Network','Découvrez Atlas · Atlas Referral Network','Scopri Atlas · Atlas Referral Network','Explore a Atlas · Atlas Referral Network'],
  skip: ['Skip to the form','Ir al formulario','Aller au formulaire','Vai al modulo','Ir para o formulário'],
  skipWork: ['Skip to our work','Ir a nuestros productos','Aller à nos réalisations','Vai ai nostri progetti','Ir para nossos produtos'],
  backTop: ['Atlas, back to top','Atlas, volver arriba','Atlas, retour en haut','Atlas, torna in alto','Atlas, voltar ao topo'],
  backProject: ['Back to your project','Volver a tu proyecto','Revenir à votre projet','Torna al tuo progetto','Voltar ao seu projeto'],
  intro: ['A PERSONAL INTRODUCTION','UNA PRESENTACIÓN PERSONAL','UNE MISE EN RELATION PERSONNELLE','UNA PRESENTAZIONE PERSONALE','UMA APRESENTAÇÃO PESSOAL'],
  language: ['Language','Idioma','Langue','Lingua','Idioma'],
  hero: ['WHAT WOULD YOU LIKE TO MAKE TODAY?','¿QUÉ TE GUSTARÍA CREAR HOY?','QUE SOUHAITEZ-VOUS CRÉER AUJOURD’HUI ?','COSA VORRESTI CREARE OGGI?','O QUE VOCÊ GOSTARIA DE CRIAR HOJE?'],
  tagline: ['Let Atlas Do the Heavy Lifting.','Deja el trabajo difícil en manos de Atlas.','Laissez Atlas s’occuper du plus difficile.','Lascia ad Atlas il lavoro più impegnativo.','Deixe o trabalho pesado com a Atlas.'],
  preview: ['DESIGN REVIEW · NOTHING WILL BE SENT','VISTA PREVIA · NO SE ENVIARÁ NADA','APERÇU · AUCUN ENVOI NE SERA EFFECTUÉ','ANTEPRIMA · NON VERRÀ INVIATO NULLA','PRÉVIA · NADA SERÁ ENVIADO'],
  name: ['Name','Nombre','Nom','Nome','Nome'],
  namePh: ['Your name','Tu nombre','Votre nom','Il tuo nome','Seu nome'],
  nameError: ['Please enter your name.','Escribe tu nombre.','Veuillez saisir votre nom.','Inserisci il tuo nome.','Informe seu nome.'],
  email: ['Email','Correo electrónico','E-mail','Email','E-mail'],
  emailPh: ['you@company.com','tu@empresa.com','vous@entreprise.com','tu@azienda.com','voce@empresa.com'],
  emailError: ['Please enter a valid email.','Escribe un correo válido.','Veuillez saisir une adresse e-mail valide.','Inserisci un indirizzo email valido.','Informe um e-mail válido.'],
  company: ['Company','Empresa','Entreprise','Azienda','Empresa'],
  companyPh: ['Company name','Nombre de la empresa','Nom de l’entreprise','Nome dell’azienda','Nome da empresa'],
  companyError: ['Please enter your company.','Escribe el nombre de tu empresa.','Veuillez saisir le nom de votre entreprise.','Inserisci il nome della tua azienda.','Informe o nome da sua empresa.'],
  phone: ['Phone','Teléfono','Téléphone','Telefono','Telefone'],
  phonePh: ['Phone number','Número de teléfono','Numéro de téléphone','Numero di telefono','Número de telefone'],
  optional: ['(optional)','(opcional)','(facultatif)','(facoltativo)','(opcional)'],
  product: ['What are you making?','¿Qué estás creando?','Que souhaitez-vous fabriquer ?','Cosa vuoi realizzare?','O que você está criando?'],
  productPh: ['Product or project name','Nombre del producto o proyecto','Nom du produit ou du projet','Nome del prodotto o del progetto','Nome do produto ou projeto'],
  productError: ['Please tell us what you’re making.','Cuéntanos qué quieres crear.','Indiquez ce que vous souhaitez fabriquer.','Dicci cosa vuoi realizzare.','Conte o que você quer criar.'],
  category: ['Product category','Categoría del producto','Catégorie de produit','Categoria del prodotto','Categoria do produto'],
  categoryPh: ['Select category','Selecciona una categoría','Choisir une catégorie','Seleziona una categoria','Selecione uma categoria'],
  categoryError: ['Please select a category.','Selecciona una categoría.','Veuillez choisir une catégorie.','Seleziona una categoria.','Selecione uma categoria.'],
  catSpirits: ['Spirits & Beverage','Bebidas y destilados','Spiritueux et boissons','Distillati e bevande','Destilados e bebidas'],
  catPackaging: ['CPG & Packaging','Bienes de consumo y envases','Biens de consommation et emballages','Beni di consumo e imballaggi','Bens de consumo e embalagens'],
  catApparel: ['Apparel & Textiles','Ropa y textiles','Habillement et textiles','Abbigliamento e tessuti','Vestuário e têxteis'],
  catMachinery: ['Machinery & Innovation','Maquinaria e innovación','Machines et innovation','Macchinari e innovazione','Máquinas e inovação'],
  catLuxury: ['Luxury & Premium Goods','Artículos de lujo y prémium','Articles de luxe et haut de gamme','Articoli di lusso e di alta gamma','Artigos de luxo e premium'],
  catOther: ['Other','Otra','Autre','Altro','Outra'],
  other: ['Other category','Otra categoría','Autre catégorie','Altra categoria','Outra categoria'],
  otherPh: ['Enter the product category','Escribe la categoría del producto','Précisez la catégorie de produit','Indica la categoria del prodotto','Informe a categoria do produto'],
  otherError: ['Please enter the category.','Escribe la categoría.','Veuillez préciser la catégorie.','Indica la categoria.','Informe a categoria.'],
  description: ['Describe the project','Describe el proyecto','Décrivez le projet','Descrivi il progetto','Descreva o projeto'],
  descriptionPh: ['Materials, dimensions, finish, specifications or other useful details','Materiales, dimensiones, acabados, especificaciones u otros detalles útiles','Matériaux, dimensions, finitions, spécifications ou autres détails utiles','Materiali, dimensioni, finiture, specifiche o altri dettagli utili','Materiais, dimensões, acabamento, especificações ou outros detalhes úteis'],
  descriptionError: ['Please add a short project description.','Añade una breve descripción del proyecto.','Veuillez ajouter une courte description du projet.','Aggiungi una breve descrizione del progetto.','Adicione uma breve descrição do projeto.'],
  quantity: ['Target quantity','Cantidad prevista','Quantité souhaitée','Quantità prevista','Quantidade prevista'],
  quantityPh: ['Select quantity','Selecciona la cantidad','Choisir une quantité','Seleziona la quantità','Selecione a quantidade'],
  quantityError: ['Please select a target quantity.','Selecciona la cantidad prevista.','Veuillez choisir la quantité souhaitée.','Seleziona la quantità prevista.','Selecione a quantidade prevista.'],
  qty1: ['Under 1,000 units','Menos de 1.000 unidades','Moins de 1 000 unités','Meno di 1.000 unità','Menos de 1.000 unidades'],
  qty2: ['1,000 – 10,000 units','1.000 – 10.000 unidades','1 000 – 10 000 unités','1.000 – 10.000 unità','1.000 – 10.000 unidades'],
  qty3: ['10,000 – 50,000 units','10.000 – 50.000 unidades','10 000 – 50 000 unités','10.000 – 50.000 unità','10.000 – 50.000 unidades'],
  qty4: ['50,000+ units','Más de 50.000 unidades','50 000 unités ou plus','Oltre 50.000 unità','Mais de 50.000 unidades'],
  qty5: ['Not sure yet','Aún no lo sé','Je ne sais pas encore','Non so ancora','Ainda não sei'],
  timeline: ['When do you need it?','¿Cuándo lo necesitas?','Pour quand en avez-vous besoin ?','Quando ti serve?','Para quando você precisa?'],
  timelinePh: ['Select timeline','Selecciona un plazo','Choisir un délai','Seleziona una tempistica','Selecione um prazo'],
  time1: ['As soon as possible','Lo antes posible','Dès que possible','Il prima possibile','O mais rápido possível'],
  time2: ['Within 3 months','En los próximos 3 meses','Dans les 3 mois','Entro 3 mesi','Dentro de 3 meses'],
  time3: ['3 – 6 months','De 3 a 6 meses','Dans 3 à 6 mois','Tra 3 e 6 mesi','De 3 a 6 meses'],
  time4: ['6 months or more','6 meses o más','Dans 6 mois ou plus','Tra 6 mesi o più','6 meses ou mais'],
  time5: ['Still planning','Aún en planificación','Encore en réflexion','Ancora in fase di pianificazione','Ainda em planejamento'],
  upload: ['Add project files','Añade archivos del proyecto','Ajouter des fichiers','Aggiungi file del progetto','Adicionar arquivos do projeto'],
  uploadHint: ['Optional · Drop files or browse','Opcional · Arrastra archivos o busca','Facultatif · Glisser ou parcourir','Facoltativo · Trascina o sfoglia','Opcional · Arraste arquivos ou procure'],
  submit: ['Let’s Bring Your Idea to Life.','Hagamos realidad tu idea.','Donnons vie à votre idée.','Diamo vita alla tua idea.','Vamos dar vida à sua ideia.'],
  sending: ['Sending your project','Enviando tu proyecto','Envoi de votre projet','Invio del tuo progetto','Enviando seu projeto'],
  sendingBody: ['Please keep this window open while we prepare your files.','Mantén esta ventana abierta mientras preparamos tus archivos.','Gardez cette fenêtre ouverte pendant la préparation de vos fichiers.','Tieni aperta questa finestra mentre prepariamo i tuoi file.','Mantenha esta janela aberta enquanto preparamos seus arquivos.'],
  next: ['YOUR NEXT STEP. YOUR CHOICE.','TU PRÓXIMO PASO. TÚ ELIGES.','LA SUITE. À VOUS DE CHOISIR.','IL PROSSIMO PASSO. SCEGLI TU.','SEU PRÓXIMO PASSO. SUA ESCOLHA.'],
  thanks: ['Thank you for sharing your idea.','Gracias por compartir tu idea.','Merci de nous avoir présenté votre idée.','Grazie per aver condiviso la tua idea.','Obrigado por compartilhar sua ideia.'],
  thanksBody: ['Talk it through with Atlas, or get to know what we can make together.','Habla con Atlas o descubre lo que podemos crear juntos.','Échangez avec Atlas ou découvrez ce que nous pouvons créer ensemble.','Parlane con Atlas o scopri cosa possiamo realizzare insieme.','Converse com a Atlas ou descubra o que podemos criar juntos.'],
  book: ['BOOK YOUR CALL','RESERVA TU LLAMADA','RÉSERVEZ UN APPEL','PRENOTA UNA CHIAMATA','AGENDE SUA CHAMADA'],
  explore: ['EXPLORE ATLAS','DESCUBRE ATLAS','DÉCOUVREZ ATLAS','SCOPRI ATLAS','EXPLORE A ATLAS'],
  minimum: ['Thank you for your interest. This project falls below our current minimum. Our team can help you consider a suitable next step.','Gracias por tu interés. Este proyecto está por debajo de nuestro mínimo actual. Nuestro equipo puede ayudarte a considerar un próximo paso adecuado.','Merci de votre intérêt. Ce projet est inférieur à notre minimum actuel. Notre équipe peut vous aider à envisager une suite adaptée.','Grazie per il tuo interesse. Questo progetto è al di sotto della nostra soglia minima attuale. Il nostro team può aiutarti a valutare un passo successivo adatto.','Obrigado pelo interesse. Este projeto está abaixo do nosso mínimo atual. Nossa equipe pode ajudar você a considerar um próximo passo adequado.'],
  reviewSent: ['Review only. Nothing was sent.','Solo vista previa: no se ha enviado nada.','Aperçu uniquement. Aucun envoi effectué.','Solo anteprima: non è stato inviato nulla.','Apenas prévia. Nada foi enviado.'],
  sent: ['Request sent. Delivery has not been independently confirmed.','Solicitud enviada. La entrega no se ha confirmado de forma independiente.','Demande envoyée. La réception n’a pas été confirmée indépendamment.','Richiesta inviata. La ricezione non è stata confermata in modo indipendente.','Solicitação enviada. O recebimento não foi confirmado de forma independente.'],
  sendError: ['We couldn’t send your project. Your details are still here; please check your connection and try again.','No pudimos enviar tu proyecto. Tus datos siguen aquí; revisa tu conexión e inténtalo de nuevo.','Impossible d’envoyer votre projet. Vos informations sont conservées ici ; vérifiez votre connexion et réessayez.','Non è stato possibile inviare il progetto. I tuoi dati sono ancora qui; controlla la connessione e riprova.','Não foi possível enviar seu projeto. Seus dados continuam aqui; verifique sua conexão e tente novamente.'],
  sizeError: ['Files exceed the 50 MB total limit. Remove a file to continue.','Los archivos superan el límite total de 50 MB. Elimina un archivo para continuar.','Les fichiers dépassent la limite totale de 50 Mo. Supprimez un fichier pour continuer.','I file superano il limite totale di 50 MB. Rimuovi un file per continuare.','Os arquivos excedem o limite total de 50 MB. Remova um arquivo para continuar.'],
  blocked: ['Blocked · not sent','Bloqueado · no se enviará','Bloqué · non envoyé','Bloccato · non inviato','Bloqueado · não será enviado'],
  remove: ['Remove file','Eliminar archivo','Supprimer le fichier','Rimuovi file','Remover arquivo'],
  productBanner: ['A selection of Atlas products','Una selección de productos Atlas','Une sélection de produits Atlas','Una selezione di prodotti Atlas','Uma seleção de produtos Atlas'],
  journey: ['THE ATLAS JOURNEY','EL RECORRIDO ATLAS','LE PARCOURS ATLAS','IL PERCORSO ATLAS','A JORNADA ATLAS'],
  journeyTitle: ['One partner. Every step.','Un socio. Cada paso.','Un partenaire. À chaque étape.','Un partner. In ogni fase.','Um parceiro. Em cada etapa.'],
  step1: ['Concept','Concepto','Concept','Concept','Conceito'],
  step2: ['Sourcing','Abastecimiento','Approvisionnement','Approvvigionamento','Fornecimento'],
  step3: ['Manufacturing','Fabricación','Fabrication','Produzione','Fabricação'],
  step4: ['Quality Control','Control de calidad','Contrôle qualité','Controllo qualità','Controle de qualidade'],
  step5: ['Logistics','Logística','Logistique','Logistica','Logística'],
  step6: ['Delivery','Entrega','Livraison','Consegna','Entrega'],
  stepBody1: ['Turn your idea into a clear brief.','Convertimos tu idea en un proyecto claro.','Transformer votre idée en un cahier des charges clair.','Trasformiamo la tua idea in un brief chiaro.','Transformamos sua ideia em um briefing claro.'],
  stepBody2: ['Connect the right materials and partners.','Conectamos los materiales y socios adecuados.','Réunir les bons matériaux et partenaires.','Troviamo i materiali e i partner giusti.','Conectamos os materiais e parceiros certos.'],
  stepBody3: ['Bring the details together in production.','Damos forma a los detalles en la producción.','Donner forme aux détails lors de la production.','Diamo forma ai dettagli in produzione.','Damos forma aos detalhes na produção.'],
  stepBody4: ['Check the work against your specifications.','Verificamos el trabajo según tus especificaciones.','Vérifier la conformité à vos spécifications.','Verifichiamo il lavoro rispetto alle tue specifiche.','Verificamos o trabalho conforme suas especificações.'],
  stepBody5: ['Coordinate the journey across borders.','Coordinamos el recorrido entre fronteras.','Coordonner le parcours au-delà des frontières.','Coordiniamo il percorso oltre i confini.','Coordenamos o percurso além das fronteiras.'],
  stepBody6: ['Get your product where it needs to be.','Llevamos tu producto a su destino.','Acheminer votre produit à destination.','Portiamo il tuo prodotto a destinazione.','Levamos seu produto ao destino.'],
  contactPending: ['Contact details pending confirmation','Datos de contacto pendientes de confirmar','Coordonnées en attente de confirmation','Contatti in attesa di conferma','Contato aguardando confirmação'],
  close: ['Close','Cerrar','Fermer','Chiudi','Fechar'],
  conversation: ['LET’S TALK','HABLEMOS','PARLONS-EN','PARLIAMONE','VAMOS CONVERSAR'],
  bookTitle: ['Book your call','Reserva tu llamada','Réservez un appel','Prenota una chiamata','Agende sua chamada'],
  bookingPending: ['Our booking link is being confirmed. It will open here when ready.','Estamos confirmando el enlace de reserva. Se abrirá aquí cuando esté listo.','Notre lien de réservation est en cours de confirmation. Il s’ouvrira ici dès qu’il sera prêt.','Il link di prenotazione è in fase di conferma. Si aprirà qui quando sarà pronto.','Nosso link de agendamento está sendo confirmado. Ele abrirá aqui quando estiver pronto.'],
  bookingLoading: ['Loading the booking calendar…','Cargando el calendario de reservas…','Chargement du calendrier…','Caricamento del calendario…','Carregando o calendário…'],
  bookingError: ['The calendar could not load. You can open the booking page below.','No se pudo cargar el calendario. Puedes abrir la página de reserva abajo.','Le calendrier n’a pas pu se charger. Ouvrez la page de réservation ci-dessous.','Impossibile caricare il calendario. Puoi aprire la pagina di prenotazione qui sotto.','Não foi possível carregar o calendário. Abra a página de agendamento abaixo.'],
  bookingFallback: ['Open the booking page','Abrir la página de reserva','Ouvrir la page de réservation','Apri la pagina di prenotazione','Abrir a página de agendamento'],
  ourWork: ['OUR WORK','NUESTRO TRABAJO','NOS RÉALISATIONS','IL NOSTRO LAVORO','NOSSO TRABALHO'],
  workTitle: ['There’s Nothing We Can’t Make.','No hay nada que no podamos crear.','Rien ne nous est impossible à créer.','Non c’è nulla che non possiamo realizzare.','Não há nada que não possamos criar.'],
  claim: ['[CLAIM PENDING KERIM CONFIRMATION]','[AFIRMACIÓN PENDIENTE DE CONFIRMACIÓN DE KERIM]','[AFFIRMATION EN ATTENTE DE CONFIRMATION PAR KERIM]','[AFFERMAZIONE IN ATTESA DI CONFERMA DA KERIM]','[AFIRMAÇÃO AGUARDANDO CONFIRMAÇÃO DE KERIM]'],
  captionSpirits: ['Spirits & beverage','Bebidas y destilados','Spiritueux et boissons','Distillati e bevande','Destilados e bebidas'],
  captionLuxury: ['Luxury & presentation','Lujo y presentación','Luxe et présentation','Lusso e presentazione','Luxo e apresentação'],
  captionApparel: ['Apparel & textiles','Ropa y textiles','Habillement et textiles','Abbigliamento e tessuti','Vestuário e têxteis'],
  captionPackaging: ['Packaging & materials','Envases y materiales','Emballages et matériaux','Imballaggi e materiali','Embalagens e materiais'],
  captionEquipment: ['Equipment & innovation','Equipos e innovación','Équipements et innovation','Attrezzature e innovazione','Equipamentos e inovação'],
  captionDetails: ['The finishing details','Los detalles finales','Les finitions','I dettagli finali','Os detalhes finais'],
  altAfrohead: ['Afrohead rum bottles','Botellas de ron Afrohead','Bouteilles de rhum Afrohead','Bottiglie di rum Afrohead','Garrafas de rum Afrohead'],
  altWatches: ['Core Seven Sins watches and presentation cases','Relojes Core Seven Sins y sus estuches','Montres Core Seven Sins et leurs écrins','Orologi Core Seven Sins e custodie','Relógios Core Seven Sins e estojos'],
  altApparel: ['Embroidered polo and golf apparel','Polo bordado y ropa de golf','Polo brodé et vêtements de golf','Polo ricamata e abbigliamento da golf','Polo bordada e roupas de golfe'],
  altMaterials: ['Glass, wood and textile packaging materials','Vidrio, madera y textiles para envases','Verre, bois et textiles pour emballages','Vetro, legno e tessuti per imballaggi','Vidro, madeira e tecidos para embalagens'],
  altEquipment: ['Treadmills on an assembly line','Cintas de correr en una línea de montaje','Tapis de course sur une chaîne d’assemblage','Tapis roulant su una linea di assemblaggio','Esteiras em uma linha de montagem'],
  altWaikulu: ['Waikulu bottle and tasting glass','Botella y copa de degustación Waikulu','Bouteille et verre de dégustation Waikulu','Bottiglia e bicchiere da degustazione Waikulu','Garrafa e taça de degustação Waikulu'],
  philosophy: ['OUR PHILOSOPHY','NUESTRA FILOSOFÍA','NOTRE PHILOSOPHIE','LA NOSTRA FILOSOFIA','NOSSA FILOSOFIA'],
  philosophyTitle: ['A world of connections. A personal commitment.','Un mundo de conexiones. Un compromiso personal.','Un monde de connexions. Un engagement personnel.','Un mondo di connessioni. Un impegno personale.','Um mundo de conexões. Um compromisso pessoal.'],
  philosophyBody: ['We connect the right people, materials and expertise around your idea. From the first conversation to final delivery, our focus stays the same: quality, reliability and a simpler way forward.','Conectamos a las personas, los materiales y la experiencia adecuados para tu idea. Desde la primera conversación hasta la entrega final, mantenemos el mismo enfoque: calidad, fiabilidad y un camino más sencillo.','Nous réunissons les bonnes personnes, les bons matériaux et les savoir-faire autour de votre idée. Du premier échange à la livraison finale, notre priorité reste la même : qualité, fiabilité et simplicité.','Mettiamo in connessione le persone, i materiali e le competenze giuste per la tua idea. Dal primo confronto alla consegna finale, il nostro obiettivo resta lo stesso: qualità, affidabilità e un percorso più semplice.','Conectamos as pessoas, os materiais e a experiência certos para sua ideia. Da primeira conversa à entrega final, nosso foco é o mesmo: qualidade, confiabilidade e um caminho mais simples.'],
  philosophySignature: ['Global reach. End-to-end support. A true partnership.','Alcance global. Apoyo de principio a fin. Una verdadera alianza.','Portée mondiale. Accompagnement de bout en bout. Un vrai partenariat.','Portata globale. Supporto dall’inizio alla fine. Una vera partnership.','Alcance global. Apoio de ponta a ponta. Uma parceria de verdade.'],
  approach: ['OUR APPROACH','NUESTRO ENFOQUE','NOTRE APPROCHE','IL NOSTRO APPROCCIO','NOSSA ABORDAGEM'],
  approachTitle: ['From possibility to something real.','De una posibilidad a algo real.','Du possible au concret.','Dalla possibilità alla realtà.','Da possibilidade à realidade.'],
  closing: ['Let’s talk about your next idea.','Hablemos de tu próxima idea.','Parlons de votre prochaine idée.','Parliamo della tua prossima idea.','Vamos conversar sobre sua próxima ideia.'],
  closingBody: ['One conversation can set the whole process in motion.','Una conversación puede poner todo en marcha.','Un échange peut lancer tout le processus.','Una conversazione può avviare l’intero processo.','Uma conversa pode colocar todo o processo em movimento.'],
  agent: ['Ask our Atlas agent','Pregunta a nuestro agente Atlas','Interrogez notre assistant Atlas','Chiedi al nostro assistente Atlas','Pergunte ao nosso agente Atlas'],
  comingSoon: ['Coming soon','Próximamente','Bientôt disponible','Prossimamente','Em breve'],
  agentPending: ['This is the reserved space for the Atlas assistant. The real chat service will be connected later.','Este espacio está reservado para el asistente Atlas. El servicio de chat real se conectará más adelante.','Cet espace est réservé à l’assistant Atlas. Le véritable service de chat sera connecté ultérieurement.','Questo spazio è riservato all’assistente Atlas. Il servizio di chat reale verrà collegato in seguito.','Este espaço está reservado para o assistente Atlas. O serviço de chat real será conectado posteriormente.']
};

const params = new URLSearchParams(location.search);
// A downloaded/local-file copy is always safe to review. Hosted pages use the approved endpoint.
const PREVIEW_MODE = location.protocol === 'file:' || params.get('preview') === '1' || !FORM_ENDPOINT;
const effectivePartnerId = params.get('ref') || PARTNER.id;
let language = LANGUAGES.includes(params.get('lang')) ? params.get('lang') : (LANGUAGES.includes(PARTNER.defaultLang) ? PARTNER.defaultLang : 'en');
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const t = (key) => COPY[key]?.[LANGUAGES.indexOf(language)] ?? COPY[key]?.[0] ?? key;
let submitted = false;
let inFlight = false;
let globalErrorKey = '';
let bookingState = 'bookingPending';
let invitee = null;
let selectedFiles = [];
const MAX_TOTAL = 50 * 1024 * 1024;
const BLOCKED = new Set(['exe','bat','cmd','com','scr','msi','dll','sh','app','vbs','js','jar','ps1','apk','deb','pkg']);
const storageKey = `atlas-invitee:${effectivePartnerId}`;

function pageLink(page) {
  const query = new URLSearchParams({ ref: effectivePartnerId, lang: language });
  if (PREVIEW_MODE) query.set('preview', '1');
  return `${page}?${query}`;
}

function renderLanguage() {
  document.documentElement.lang = language;
  document.title = t(document.body.dataset.page === 'explore' ? 'exploreTitle' : 'pageTitle');
  $('#language').value = language;
  $$('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$('[data-placeholder]').forEach(el => { el.placeholder = t(el.dataset.placeholder); });
  $$('[data-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.label)));
  $$('[data-alt]').forEach(el => { el.alt = t(el.dataset.alt); });
  $$('[data-explore]').forEach(el => { el.href = pageLink('explore.html'); });
  $$('[data-home]').forEach(el => { el.href = pageLink('index.html'); });
  $$('[data-steps]').forEach(list => {
    list.replaceChildren();
    for (let i = 1; i <= 6; i++) {
      const item = document.createElement('li');
      const number = document.createElement('span'); number.className = 'step-number'; number.textContent = `0${i}`;
      const title = document.createElement('h3'); title.textContent = t(`step${i}`);
      item.append(number, title);
      if (list.dataset.steps === 'rich') { const body = document.createElement('p'); body.textContent = t(`stepBody${i}`); item.append(body); }
      list.append(item);
    }
  });
  renderFiles();
  if ($('#gerr') && globalErrorKey) $('#gerr').textContent = t(globalErrorKey);
  if (submitted) $('#submission-note').textContent = t(PREVIEW_MODE ? 'reviewSent' : 'sent');
  $('#booking-message').textContent = t(bookingState);
}

$$('[data-partner]').forEach(el => { el.textContent = PARTNER[el.dataset.partner] || ''; });
$$('.partner-photo').forEach(el => { el.src = PARTNER.photo; el.alt = PARTNER.name; });
if ($('#partner-id')) { $('#partner-id').value = effectivePartnerId; $('#partner-name').value = PARTNER.name; }
if (CONTACT_EMAIL) {
  $$('[data-contact]').forEach(el => { el.href = `mailto:${CONTACT_EMAIL}`; el.textContent = CONTACT_EMAIL; el.hidden = false; });
  $$('[data-contact-pending]').forEach(el => { el.hidden = true; });
}
$$('[data-preview]').forEach(el => { el.hidden = !PREVIEW_MODE; });
$('#language').addEventListener('change', event => {
  language = event.target.value;
  renderLanguage();
  // Keep the chosen language on refresh; file:// browsers may disallow history changes.
  try { const url = new URL(location.href); url.searchParams.set('lang', language); history.replaceState(null, '', url); } catch (_) { /* Navigation links still carry language. */ }
});

function acceptedTotal() { return selectedFiles.filter(item => !item.blocked).reduce((total, item) => total + item.file.size, 0); }
function fileSize(bytes) {
  if (!bytes) return '0 B';
  const unit = bytes >= 1024 * 1024 ? 'MB' : bytes >= 1024 ? 'KB' : 'B';
  const divisor = unit === 'MB' ? 1024 * 1024 : unit === 'KB' ? 1024 : 1;
  return `${new Intl.NumberFormat(language, { maximumFractionDigits: 1 }).format(bytes / divisor)} ${unit}`;
}
function renderFiles() {
  const list = $('#list'); if (!list) return;
  list.replaceChildren();
  selectedFiles.forEach((item, index) => {
    const row = document.createElement('div'); row.className = `file-row${item.blocked ? ' rejected' : ''}`;
    const name = document.createElement('span'); name.className = 'file-name'; name.textContent = item.file.name; name.title = item.file.name;
    const note = document.createElement('span'); note.className = 'file-note'; note.textContent = item.blocked ? t('blocked') : fileSize(item.file.size);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove-file'; remove.textContent = '×'; remove.setAttribute('aria-label', `${t('remove')}: ${item.file.name}`);
    remove.addEventListener('click', () => { selectedFiles.splice(index, 1); renderFiles(); if (acceptedTotal() <= MAX_TOTAL && globalErrorKey === 'sizeError') setError(''); });
    row.append(name, note, remove); list.append(row);
  });
  $('.meter').textContent = `${fileSize(acceptedTotal())} / 50 MB`;
  const over = acceptedTotal() > MAX_TOTAL;
  $('.meter').classList.toggle('over', over);
  $('#send').disabled = inFlight || over;
  if (over) setError('sizeError');
  else if (globalErrorKey === 'sizeError') setError('');
}
function addFiles(files) {
  for (const file of files) {
    const parts = file.name.toLowerCase().split('.');
    const extension = parts.length > 1 ? parts.pop() : '';
    selectedFiles.push({ file, extension, blocked: BLOCKED.has(extension) });
  }
  renderFiles();
}
function setError(key) { globalErrorKey = key; $('#gerr').hidden = !key; $('#gerr').textContent = key ? t(key) : ''; }
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); reader.onerror = reject;
    reader.onload = () => resolve({ name: file.name, type: file.type, size: file.size, data: String(reader.result).split(',')[1] });
    reader.readAsDataURL(file);
  });
}

// The approved SYP has no budget field. Never infer project value from unit quantity.
// Supply an approved numeric budget source here before enabling MIN_PROJECT_USD.
function projectBudgetUSD(_payload) { return null; }
function belowMinimum(value, minimum) {
  return typeof minimum === 'number' && Number.isFinite(minimum) && minimum > 0 &&
    typeof value === 'number' && Number.isFinite(value) && value >= 0 && value < minimum;
}
function rememberInvitee(name, email) {
  invitee = { name, email, expires: Date.now() + 30 * 60 * 1000 };
  // Tab-only, short-lived prefill; never store project descriptions or attachments.
  try { sessionStorage.setItem(storageKey, JSON.stringify(invitee)); } catch (_) { /* Current page prefill remains available. */ }
}
function getInvitee() {
  if (invitee?.expires > Date.now()) return { name: invitee.name, email: invitee.email };
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved?.expires > Date.now() && typeof saved.name === 'string' && typeof saved.email === 'string') return { name: saved.name, email: saved.email };
    sessionStorage.removeItem(storageKey);
  } catch (_) { /* Storage is optional, including file:// previews. */ }
  return {};
}
if ($('#form')) {
  const form = $('#form');
  function syncOther() {
    const active = $('#cat').value === 'Other';
    $('[data-other-field]').hidden = !active; $('#other').required = active; $('#other').disabled = !active;
    if (!active) { $('#other').value = ''; $('#other').removeAttribute('aria-invalid'); }
  }
  $('#cat').addEventListener('change', syncOther); syncOther();
  $$('.field input, .field select, .field textarea').forEach(input => {
    if ($(`#${input.id}-error`)) input.setAttribute('aria-describedby', `${input.id}-error`);
    input.addEventListener('input', () => { if (form.classList.contains('checked')) input.setAttribute('aria-invalid', String(!input.checkValidity())); });
  });
  $('#files').addEventListener('change', event => { addFiles(event.target.files); event.target.value = ''; });
  $('#drop').addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); $('#files').click(); } });
  ['dragenter', 'dragover'].forEach(name => $('#drop').addEventListener(name, event => { event.preventDefault(); $('#drop').classList.add('dragging'); }));
  ['dragleave', 'drop'].forEach(name => $('#drop').addEventListener(name, event => { event.preventDefault(); $('#drop').classList.remove('dragging'); }));
  $('#drop').addEventListener('drop', event => addFiles(event.dataTransfer.files));
  form.addEventListener('submit', async event => {
    event.preventDefault(); if ($('#send').disabled) return;
    setError(''); form.classList.add('checked');
    const invalid = [...form.elements].filter(input => input.willValidate && !input.checkValidity());
    [...form.elements].filter(input => input.willValidate).forEach(input => input.setAttribute('aria-invalid', String(!input.checkValidity())));
    if (invalid.length) { invalid[0].focus(); return; }
    if (acceptedTotal() > MAX_TOTAL) { setError('sizeError'); $('#drop').focus(); return; }
    inFlight = true; $('#send').disabled = true; form.hidden = true; $('#sending').hidden = false;
    try {
      const val = id => $(`#${id}`).value.trim();
      const payload = {
        name: val('name'), email: val('email'), company: val('company'), phone: val('phone'),
        product: val('product'), category: val('cat') === 'Other' ? val('other') : val('cat'),
        description: val('desc'), quantity: val('qty'), timeline: val('when'),
        submittedAt: new Date().toISOString(),
        files: await Promise.all(selectedFiles.filter(item => !item.blocked).map(item => fileToBase64(item.file))),
        partner_id: effectivePartnerId, partner_name: PARTNER.name
      };
      if (!PREVIEW_MODE) {
        // Same transport as the approved SYP. An opaque response cannot confirm server-side storage.
        await fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
      }
      rememberInvitee(payload.name, payload.email);
      const gated = belowMinimum(projectBudgetUSD(payload), MIN_PROJECT_USD);
      $('#next-actions').hidden = gated; $('#minimum-message').hidden = !gated;
      submitted = true; $('#sending').hidden = true; $('#done').hidden = false;
      $('#submission-note').textContent = t(PREVIEW_MODE ? 'reviewSent' : 'sent');
      $('#thanks-title').focus({ preventScroll: true });
      $('#project-area').scrollIntoView({ block: 'nearest' });
    } catch (_) {
      $('#sending').hidden = true; form.hidden = false; setError('sendError'); $('#send').focus();
    } finally { inFlight = false; $('#send').disabled = false; }
  });
}

function calendlyLink(base) {
  const url = new URL(base);
  if (url.protocol !== 'https:' || !(url.hostname === 'calendly.com' || url.hostname.endsWith('.calendly.com'))) throw new Error('Use an approved HTTPS Calendly event URL.');
  url.searchParams.set('utm_source', 'atlas-referral');
  url.searchParams.set('utm_campaign', effectivePartnerId);
  url.searchParams.set('utm_content', PARTNER.name);
  url.searchParams.set('ref', effectivePartnerId);
  return url;
}
let widgetPromise = null;
function loadCalendly() {
  if (window.Calendly) return Promise.resolve();
  if (widgetPromise) return widgetPromise;
  widgetPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = 'https://assets.calendly.com/assets/external/widget.js'; script.async = true;
    const timer = setTimeout(() => reject(new Error('Calendar timed out.')), 15000);
    script.onload = () => { clearTimeout(timer); window.Calendly ? resolve() : reject(new Error('Calendar unavailable.')); };
    script.onerror = () => { clearTimeout(timer); reject(new Error('Calendar unavailable.')); };
    document.head.append(script);
  });
  return widgetPromise;
}
async function openBooking() {
  const dialog = $('#booking-dialog'); dialog.showModal();
  if (!CALENDLY_URL) { bookingState = 'bookingPending'; $('#booking-message').textContent = t(bookingState); return; }
  bookingState = 'bookingLoading'; $('#booking-message').hidden = false; $('#booking-message').textContent = t(bookingState);
  try {
    const url = calendlyLink(CALENDLY_URL);
    const prefill = getInvitee();
    const fallback = new URL(url);
    if (prefill.name) fallback.searchParams.set('name', prefill.name);
    if (prefill.email) fallback.searchParams.set('email', prefill.email);
    $('#booking-fallback').href = fallback.href;
    $('#booking-fallback').hidden = false;
    await loadCalendly();
    if (!dialog.open) return;
    $('#calendly-embed').replaceChildren();
    window.Calendly.initInlineWidget({ url: url.href, parentElement: $('#calendly-embed'), prefill, utm: { utmSource: 'atlas-referral', utmCampaign: effectivePartnerId, utmContent: PARTNER.name } });
    $('#booking-message').hidden = true;
  } catch (_) { bookingState = 'bookingError'; $('#booking-message').textContent = t(bookingState); }
}
$$('[data-book]').forEach(button => button.addEventListener('click', openBooking));
$$('[data-close]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
$$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
}));
$('#agent-button')?.addEventListener('click', () => $('#agent-dialog').showModal());
renderLanguage();

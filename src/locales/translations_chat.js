// translations.js (or you can use .json if preferred)

export const translations = {
  en: {
    title: "🌟 AI STUDY ASSISTANT - Chat 🌟",
    greeting: (firstName, lastName, email, language ) => {
      return `Information about the User : 
      - First Name: ${firstName}
      - Last Name: ${lastName}
      - Email: ${email}
      - Language: ${language}

      `
    },
    errorMessage: "An error occurred. Please try again.",
    FailedToLoadHistory: "Failed to load conversation history.",
    FailedToInitializeChat: "Failed to initialize chat.",
    FailedToSendMessage: "Failed to send message.",
    retryMessage: "Retry",
    placeholderText: "Type your message here...",
    mustSignIn: "You need to sign in to access the chat.",
    pleaseSignIn: "Please Sign In",
    signIn: "🔐 Sign In",
    loadingMore: "Loading older messages...",
    chatWithAI: "Chat with AI",
    serverStarting: "Server is starting, please wait a moment...",
    serverOffline: "Server is offline. Please try again later.",
  },
  fr: {
    title: "🌟 ASSISTANT D'ÉTUDE IA - Chat 🌟",
    greeting: (firstName, lastName, email, language ) => {
      return `Informations sur l'utilisateur : 
      - Prénom : ${firstName}
      - Nom : ${lastName}
      - Email : ${email}
      - Langue : ${language}

      `
    },
    errorMessage: "Une erreur est survenue. Veuillez réessayer.",
    FailedToLoadHistory: "Échec du chargement de l'historique de la conversation.",
    FailedToInitializeChat: "Échec de l'initialisation du chat.",
    FailedToSendMessage: "Échec de l'envoi du message.",
    retryMessage: "Réessayer",
    placeholderText: "Tapez votre message ici...",
    mustSignIn: "Vous devez vous connecter pour accéder au chat.",
    pleaseSignIn: "Veuillez vous connecter",
    signIn: "🔐 Se connecter",
    loadingMore: "Chargement des messages plus anciens...",
    chatWithAI: "Discuter avec l'IA",
    serverStarting: "Le serveur démarre, veuillez patienter un moment...",
    serverOffline: "Le serveur est hors ligne. Veuillez réessayer plus tard.",
  },
  ar: {
    title: "🌟 مساعد الدراسة الذكي - دردشة 🌟",
    greeting: (firstName, lastName, email, language ) => {
      return `معلومات عن المستخدم : 
      - الاسم الأول: ${firstName}
      - اسم العائلة: ${lastName}
      - البريد الإلكتروني: ${email}
      - اللغة: ${language}

      `
    },
    errorMessage: "حدث خطأ. يرجى المحاولة مرة أخرى.",
    FailedToLoadHistory: "فشل في تحميل سجل المحادثة.",
    FailedToInitializeChat: "فشل في تهيئة الدردشة.",
    FailedToSendMessage: "فشل في إرسال الرسالة.",
    retryMessage: "إعادة المحاولة",
    placeholderText: "...اكتب رسالتك هنا",
    mustSignIn: "يجب عليك تسجيل الدخول للوصول إلى الدردشة.",
    pleaseSignIn: "يرجى تسجيل الدخول",
    signIn: "🔐 تسجيل الدخول",
    loadingMore: "...جارٍ تحميل الرسائل الأقدم",
    chatWithAI: "الدردشة مع الذكاء الاصطناعي",
    serverStarting: "...الخادم قيد التشغيل، يرجى الانتظار لحظة",
    serverOffline: "الخادم غير متصل. يرجى المحاولة مرة أخرى لاحقًا.",
  },
};

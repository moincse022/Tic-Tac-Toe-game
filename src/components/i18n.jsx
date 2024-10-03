import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


const resources = {
    en: {
      translation: {
        title: "Tic Tac Toe Game",
        welcome: "Welcome to the Tic Tac Toe Game!",
        nextPlayer: "Next Player: {{player}}",
        reset: "Reset Game",
        congratulations: "Congratulations!",
        winner: "Winner",
        OK: "OK",
      },
    },
    bn: {
      translation: {
        title: "টিক ট্যাক টো গেম",
        welcome: "টিক ট্যাক টো গেমটিতে স্বাগতম!",
        nextPlayer: "পরবর্তী খেলোয়াড়: {{player}}",
        reset: "গেম রিসেট",
        congratulations: "অভিনন্দন!",
        winner: "বিজয়ী",
        OK: "ঠিক আছে",
      },
    },
  };
  

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en', 
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;

export default {
  video: {
    cantLoad: 'Váš prohlížeč nepodporuje video tag.',
  },
  anchors: {
    game: 'Hra',
    controls: 'Ovládání',
    contact: 'Kontakt',
  },
  snackbars: {
    mobileVerification:
      'Hra není podporována na mobilních zařízeních. Pro její spuštění otevřete stránku na stolním počítači.',
    serverConnectionError: 'Nepodařilo se připojit k serveru. Zkuste to znovu později.',
    mailSendSuccess: 'E-mail úspěšně odeslán.',
    mailSendError: 'Nepodařilo se odeslat e-mail. Zkuste to znovu později.',
    serverNotConnected: 'Stránka není připojena k serveru. Zkuste ji znovu načíst, nebo opakujte akci později.',
    gameLogSaveSuccess: 'Herní logy byly úspěšně odeslány.',
  },
  home: {
    heroMain: 'COIN CRUSADE',
    heroSubtitle: 'KNIGHT´S QUEST',
    engines: {
      LinearGenerator: {
        header: 'Lineární generátor',
        content: 'Obtížnost hry je zvedána lieárně nezávisle na tom, jak se hráči ve hře daří.',
      },
      HamletSystem: {
        header: 'Hamlet systém',
        content:
          'Upravuje obtížnost v závislosti na tom jak se hráči v jednotlivých úsecích hry daří. Algoritmus pro úpravu obtížnosti se inspiruje Teorií zásob.',
      },
      NeuralNetworkGenerator: {
        header: 'Neuronová síť',
        content:
          'Obtížnost hry je upravována na základě dat sesbíraných v průběhu hraní, která jsou následně vyhodnocena za pomoci neuronové sítě. Dle výsledků neuronové sítě je následně upravena obtížnost.',
      },
      ReinforcementLearningGenerator: {
        header: 'Posilované učení',
        content:
          'Hra upravuje svou obtížnost na základě modelu posilovaného učení. Čím déle hráč hru hraje, tím více je algoritmus schopný správně odhadnout, jak upravit obtížnost hry.',
      },
      button: 'Hrát',
      config: 'Konfigurace',
    },
    controls: {
      header: 'Ovládání',
      movement: {
        headerRight: 'Pohyb doprava',
        headerLeft: 'Pohyb doleva',
        headerJump: 'Skok',
        right: {
          text: 'Stisknutím šipky doprava je provedeno zrychlení postavy ve směru automatického pohybu.',
        },
        left: {
          text: 'Stisknutím šipky doleva je provedeno zrychlení postavy ve směru proti automatickému pohybu.',
        },
        jump: {
          text: 'Podržením šipky nahoru nebo mezerníku je proveden skok. Čím déle je klávesa stisknuta, tím je skok větší. Během probíhajícího skoku nelze zahájit skok nový.',
        },
      },
    },
    contact: {
      header: 'Kontakt',
      text: 'Našli jste nějakou chybu, nebo máte nápad jak hru zlepšit? Budeme rádi, když se nám ozvete.',
      form: {
        email: 'E-mail',
        message: 'Zpráva',
        send: 'Odeslat',
      },
      info: {
        github: 'Zdrojový kód',
      },
    },
    settings: {
      header: 'Nastavení hry',
      warning:
        'Použití hodnot, které nejsou výchozí, může vést k nepříjemnému hernímu zážitku. Pečlivě zvažte úpravy herních parametrů.',
      healRate: {
        label: 'Rychlost hojení',
        text: 'Počet sekund, po jejichž uplynutí bude obnoven jeden život hráče.',
      },
      baseTimeInSeconds: {
        label: 'Základní čas',
        text: 'Počet sekund které budou hráči připsány na začátku hry.',
      },
      maxPlayerLifes: {
        label: 'Životy',
        text: 'Maximální počet herních životů, které může hráč mít.',
      },
      immortalityDuration: {
        label: 'Trvání v ms',
        text: 'Doba v milisekundách, po kterou trvá nesmrtelnost.',
      },
      addTimeEveryNumberOfCoins: {
        label: 'Počet',
        text: 'Počet minci, který je potřeba sebrat pro navýšení časomíry.',
      },
      timeAdditionInSeconds: {
        label: 'Počet',
        text: 'Počet sekund přidaných po sebrání požadovaného počtu mincí.',
      },
    },
  },
  game: {
    settingsPergamen: {
      header: 'Herní menu',
      quit: 'Odejít',
      restart: 'Restartovat',
      resume: 'Pokračovat',
    },
  },
} as const

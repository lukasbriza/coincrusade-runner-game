export default {
  video: {
    cantLoad: 'Your browser does not support the video tag.',
  },
  anchors: {
    game: 'Game',
    controls: 'Controls',
    contact: 'Contact',
  },
  snackbars: {
    mobileVerification:
      'The game is not supported on mobile devices. To play the game, open the page on a desktop computer.',
  },
  home: {
    heroMain: 'COIN CRUSADE',
    heroSubtitle: 'KNIGHT´S QUEST',
    engines: {
      LinearGenerator: {
        header: 'Linear generator',
        content: 'The difficulty of the game is raised independently of how the player performs in the game.',
      },
      HamletSystem: {
        header: 'Hamlet system',
        content:
          'Adjusts the difficulty depending on how the player performs in each section of the game. The algorithm for adjusting difficulty is inspired by Stock Theory.',
      },
      NeuralNetworkGenerator: {
        header: 'Neural network',
        content:
          'The difficulty of the game is adjusted based on data collected during gameplay, which is then evaluated using a neural network. The difficulty is then adjusted according to the neural network results.',
      },
      ReinforcementLearningGenerator: {
        header: 'Reinforcement learning',
        content:
          "The game adjusts its difficulty based on a reinforcement learning model. The longer the player plays the game, the more the algorithm is able to correctly estimate how to adjust the game's difficulty.",
      },
      button: 'Play',
      config: 'Config',
    },
    controls: {
      header: 'Controls',
      movement: {
        headerRight: 'Movement right',
        headerLeft: 'Movement left',
        headerJump: 'Power jump',
        right: {
          text: 'Press the right arrow to accelerate the character in the direction of automatic movement.',
        },
        left: {
          text: 'Press the left arrow to accelerate the character in the direction opposite to the automatic movement.',
        },
        jump: {
          text: 'Hold down the up arrow or space bar to jump. The longer the key is pressed, the larger the jump. A new jump cannot be started while a jump is in progress.',
        },
      },
    },
    contact: {
      header: 'Contact',
      text: 'Did you find any bugs or have an idea how to improve the game? We will be glad to hear from you.',
      form: {
        email: 'E-mail',
        message: 'Message',
        send: 'Send',
      },
      info: {
        github: 'Source code',
      },
    },
    settings: {
      header: 'Game settings',
      warning:
        'Using values other than the default ones may result in a negative gaming experience. Adjust game settings thoughtfully.',
      healRate: {
        label: 'Heal rate',
        text: "The number of seconds after which a player's life will be restored.",
      },
      baseTimeInSeconds: {
        label: 'Base time',
        text: 'The number of seconds the player will be credited at the start of the game.',
      },
      maxPlayerLifes: {
        label: 'Lifes',
        text: 'The maximum number of lifes a player can have.',
      },
      immortalityDuration: {
        label: 'Duration in ms',
        text: 'The time in milliseconds that immortality lasts.',
      },
      addTimeEveryNumberOfCoins: {
        label: 'Count',
        text: 'The number of coins that need to be collected to increase the timer.',
      },
      timeAdditionInSeconds: {
        label: 'Count',
        text: 'The number of seconds added after collecting the required number of coins.',
      },
    },
  },
  game: {
    settingsPergamen: {
      header: 'Game menu',
      quit: 'Quit',
      restart: 'Restart',
      resume: 'Resume',
    },
  },
} as const

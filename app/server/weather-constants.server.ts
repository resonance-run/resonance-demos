export const wmoToDescriptionMap: Record<
  number,
  {
    day: { description: string; image: string };
    night: { description: string; image: string };
  }
> = {
  0: {
    day: {
      description: 'Sunny',
      image: 'https://img.icons8.com/?size=96&id=M0RPnzNPMiZi&format=png',
    },
    night: {
      description: 'Clear',
      image: 'https://img.icons8.com/?size=96&id=7SC2Bgnj2MfC&format=png',
    },
  },
  1: {
    day: {
      description: 'Mainly Sunny',
      image: 'https://img.icons8.com/?size=96&id=M0RPnzNPMiZi&format=png',
    },
    night: {
      description: 'Mainly Clear',
      image: 'https://img.icons8.com/?size=96&id=7SC2Bgnj2MfC&format=png',
    },
  },
  2: {
    day: {
      description: 'Partly Cloudy',
      image: 'https://img.icons8.com/?size=96&id=R5QLDwYPNm1R&format=png',
    },
    night: {
      description: 'Partly Cloudy',
      image: 'https://img.icons8.com/?size=96&id=Al5kevhvRLMt&format=png',
    },
  },
  3: {
    day: {
      description: 'Cloudy',
      image: 'https://img.icons8.com/?size=96&id=YCGDxvKcUXYv&format=png',
    },
    night: {
      description: 'Cloudy',
      image: 'https://img.icons8.com/?size=96&id=YCGDxvKcUXYv&format=png',
    },
  },
  45: {
    day: {
      description: 'Foggy',
      image: 'https://img.icons8.com/?size=96&id=W1YHvCxiIHyN&format=png',
    },
    night: {
      description: 'Foggy',
      image: 'https://img.icons8.com/?size=96&id=EXzNOoFd761m&format=png',
    },
  },
  48: {
    day: {
      description: 'Rime Fog',
      image: 'https://img.icons8.com/?size=96&id=W1YHvCxiIHyN&format=png',
    },
    night: {
      description: 'Rime Fog',
      image: 'https://img.icons8.com/?size=96&id=EXzNOoFd761m&format=png',
    },
  },
  51: {
    day: {
      description: 'Light Drizzle',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
    night: {
      description: 'Light Drizzle',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
  },
  53: {
    day: {
      description: 'Drizzle',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
    night: {
      description: 'Drizzle',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
  },
  55: {
    day: {
      description: 'Heavy Drizzle',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
    night: {
      description: 'Heavy Drizzle',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
  },
  56: {
    day: {
      description: 'Light Freezing Drizzle',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
    night: {
      description: 'Light Freezing Drizzle',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
  },
  57: {
    day: {
      description: 'Freezing Drizzle',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
    night: {
      description: 'Freezing Drizzle',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
  },
  61: {
    day: {
      description: 'Light Rain',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
    night: {
      description: 'Light Rain',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
  },
  63: {
    day: {
      description: 'Rain',
      image: 'https://img.icons8.com/?size=96&id=GK560aMYh659&format=png',
    },
    night: {
      description: 'Rain',
      image: 'https://img.icons8.com/?size=96&id=GK560aMYh659&format=png',
    },
  },
  65: {
    day: {
      description: 'Heavy Rain',
      image: 'https://img.icons8.com/?size=96&id=95scIGHYeKzT&format=png',
    },
    night: {
      description: 'Heavy Rain',
      image: 'https://img.icons8.com/?size=96&id=95scIGHYeKzT&format=png',
    },
  },
  66: {
    day: {
      description: 'Light Freezing Rain',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
    night: {
      description: 'Light Freezing Rain',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
  },
  67: {
    day: {
      description: 'Freezing Rain',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
    night: {
      description: 'Freezing Rain',
      image: 'https://img.icons8.com/?size=96&id=oS1WLreuoz9s&format=png',
    },
  },
  71: {
    day: {
      description: 'Light Snow',
      image: 'https://img.icons8.com/?size=96&id=4rxJF884zJ7Q&format=png',
    },
    night: {
      description: 'Light Snow',
      image: 'https://img.icons8.com/?size=96&id=4rxJF884zJ7Q&format=png',
    },
  },
  73: {
    day: {
      description: 'Snow',
      image: 'https://img.icons8.com/?size=96&id=Wu1eZc4HmPiT&format=png',
    },
    night: {
      description: 'Snow',
      image: 'https://img.icons8.com/?size=96&id=Wu1eZc4HmPiT&format=png',
    },
  },
  75: {
    day: {
      description: 'Heavy Snow',
      image: 'https://img.icons8.com/?size=96&id=oYGjazh2cGfB&format=png',
    },
    night: {
      description: 'Heavy Snow',
      image: 'https://img.icons8.com/?size=96&id=oYGjazh2cGfB&format=png',
    },
  },
  77: {
    day: {
      description: 'Snow Grains',
      image: 'https://img.icons8.com/?size=96&id=Wu1eZc4HmPiT&format=png',
    },
    night: {
      description: 'Snow Grains',
      image: 'https://img.icons8.com/?size=96&id=Wu1eZc4HmPiT&format=png',
    },
  },
  80: {
    day: {
      description: 'Light Showers',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
    night: {
      description: 'Light Showers',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
  },
  81: {
    day: {
      description: 'Showers',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
    night: {
      description: 'Showers',
      image: 'https://img.icons8.com/?size=96&id=Els9zZ3nyEze&format=png',
    },
  },
  82: {
    day: {
      description: 'Heavy Showers',
      image: 'https://img.icons8.com/?size=96&id=lfxt9xjBFntJ&format=png',
    },
    night: {
      description: 'Heavy Showers',
      image: 'https://img.icons8.com/?size=96&id=lfxt9xjBFntJ&format=png',
    },
  },
  85: {
    day: {
      description: 'Light Snow Showers',
      image: 'https://img.icons8.com/?size=96&id=4rxJF884zJ7Q&format=png',
    },
    night: {
      description: 'Light Snow Showers',
      image: 'https://img.icons8.com/?size=96&id=4rxJF884zJ7Q&format=png',
    },
  },
  86: {
    day: {
      description: 'Snow Showers',
      image: 'https://img.icons8.com/?size=96&id=4rxJF884zJ7Q&format=png',
    },
    night: {
      description: 'Snow Showers',
      image: 'https://img.icons8.com/?size=96&id=4rxJF884zJ7Q&format=png',
    },
  },
  95: {
    day: {
      description: 'Thunderstorm',
      image: 'https://img.icons8.com/?size=96&id=LGuzFFJr1J9a&format=png',
    },
    night: {
      description: 'Thunderstorm',
      image: 'https://img.icons8.com/?size=96&id=LGuzFFJr1J9a&format=png',
    },
  },
  96: {
    day: {
      description: 'Light Thunderstorms With Hail',
      image: 'https://img.icons8.com/?size=96&id=1MIo4L4pTj6s&format=png',
    },
    night: {
      description: 'Light Thunderstorms With Hail',
      image: 'https://img.icons8.com/?size=96&id=1MIo4L4pTj6s&format=png',
    },
  },
  99: {
    day: {
      description: 'Thunderstorm With Hail',
      image: 'https://img.icons8.com/?size=96&id=1MIo4L4pTj6s&format=png',
    },
    night: {
      description: 'Thunderstorm With Hail',
      image: 'https://img.icons8.com/?size=96&id=1MIo4L4pTj6s&format=png',
    },
  },
};

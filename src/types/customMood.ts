export interface CustomMoodConfig {
  id: string;
  label: string;
  emoji: string;
  description: string;
  genreIds: number[];
  theme: {
    color1: string;
    color2: string;
  };
}

export interface UnifiedMoodConfig extends CustomMoodConfig {
  isCustom?: boolean;
}

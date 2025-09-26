export enum AchievementRequirementType {
  TotalMoneyEarned,
  PastryLevel,
  TotalPastryLevels,
  UpgradesPurchased,
  LifeLessons,
  GlobalMultiplierReached,
  PastriesSold,
  TotalPastriesSold,
}

export enum RewardType {
  MONEY,
  LIFE_LESSONS,
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  requirementType: AchievementRequirementType;
  requirementValue: number;
  fulfilled: boolean;
  pastryId?: number;
  rewardType?: RewardType;
  rewardValue?: number;
  icon?: string;
  hidden?: boolean;
}

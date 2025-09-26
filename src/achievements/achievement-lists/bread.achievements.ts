import { Achievement, AchievementRequirementType } from '../achievements.type';

export const BREAD_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    name: 'Bread Enthusiast',
    description: 'Sell 100 Bread Loafs to prove your baking skills.',
    requirementType: AchievementRequirementType.PastriesSold,
    requirementValue: 100,
    pastryId: 1,
    fulfilled: false,
    icon: '/pastries/07_bread.png',
    hidden: false,
  },
];

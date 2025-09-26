import { Achievement, AchievementRequirementType } from '../achievements.type';

export const CROISSANT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    name: 'Croissant Enthusiast',
    description: 'Sell 100 Croissants to prove your baking skills.',
    requirementType: AchievementRequirementType.PastriesSold,
    requirementValue: 100,
    pastryId: 2,
    fulfilled: false,
    icon: '/pastries/croissant_icon.png',
    hidden: false,
  },
];

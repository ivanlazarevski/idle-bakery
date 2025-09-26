import { Achievement, AchievementRequirementType } from '../achievements.type';

export const GLOBAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    name: 'Pastry Collector',
    description: 'Sell a total of 1,000 pastries of any type.',
    requirementType: AchievementRequirementType.TotalPastriesSold,
    requirementValue: 1000,
    fulfilled: false,
    icon: 'pastries/03_dish_pile.png',
    hidden: false,
  },
];

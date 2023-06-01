import { ImageTheme } from 'shared/types/image';

const IMAGE_FILTERS: Record<ImageTheme, string> = {
  animals: 'Животные',
  art: 'Искусcтво',
  cities: 'Города',
  food: 'Еда',
  nature: 'Природа',
  people: 'Люди',
  science: 'Наука',
  sport: 'Спорт',
  tech: 'Технологии',
  other: 'Другое'
} as const;

export { IMAGE_FILTERS };

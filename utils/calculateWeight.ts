// src/utils/calculateWeight.ts

export function calculateWeight(volume: number, material: string): number {
    const densities: Record<string, number> = {
      PET: 1.38,   // Polyethylene Terephthalate
      PE: 0.92,    // Polyethylene
      PP: 0.91,    // Polypropylene
      PS: 1.04,    // Polystyrene
    };
  
    // Check if a custom category is selected and stored in localStorage
    const customCategory = localStorage.getItem('customCategory');
    const selectedCategory = customCategory
      ? JSON.parse(customCategory)
      : { name: material, volume, density: densities[material] };
  
    const density = selectedCategory.density;
  
    // Convert volume (liters) to cm³ (1 liter = 1000 cm³)
    const volumeInCm3 = selectedCategory.volume * 1000;
  
    // Calculate weight in grams
    const weightInGrams = volumeInCm3 * density;
  
    // Convert to kilograms
    return weightInGrams / 1000;
  }
  
interface MenuItem {
  name: string;
  price: number;
  description?: string;
  allergens?: string[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
  type: 'starters' | 'mains' | 'desserts' | 'sharing' | 'tasting' | 'drinks' | 'sides' | 'brunch' | 'other';
}

interface StructuredMenu {
  restaurantName: string;
  menuType: 'traditional' | 'sharing' | 'tasting' | 'casual' | 'brunch' | 'mixed';
  sections: MenuSection[];
  priceRange: {
    min: number;
    max: number;
    average: number;
  };
}

class MenuAnalyzer {
  private starterKeywords = [
    'entrée', 'entrées', 'amuse', 'apéritif', 'starter', 'appetizer',
    'mise en bouche', 'hors d\'oeuvre', 'antipasti', 'mezze'
  ];

  private mainKeywords = [
    'plat', 'plats', 'principal', 'principaux', 'main', 'mains',
    'viande', 'poisson', 'volaille', 'végétarien', 'pasta', 'risotto'
  ];

  private dessertKeywords = [
    'dessert', 'desserts', 'sucré', 'sucrés', 'pâtisserie', 'glace',
    'sorbet', 'tarte', 'gâteau', 'mousse', 'tiramisu'
  ];

  private sharingKeywords = [
    'partage', 'partager', 'sharing', 'plateau', 'planche', 'assortiment',
    'sélection', 'dégustation', 'tapas', 'mezze', 'antipasti'
  ];

  private tastingKeywords = [
    'menu', 'dégustation', 'tasting', 'découverte', 'chef', 'surprise',
    'accord', 'parcours', 'expérience'
  ];

  private brunchKeywords = [
    'brunch', 'petit-déjeuner', 'breakfast', 'morning', 'œuf', 'pancake',
    'toast', 'granola', 'smoothie', 'jus'
  ];

  private drinkKeywords = [
    'boisson', 'boissons', 'drink', 'drinks', 'vin', 'vins', 'cocktail',
    'bière', 'café', 'thé', 'jus', 'eau', 'spiritueux'
  ];

  private sideKeywords = [
    'accompagnement', 'garniture', 'side', 'sides', 'légume', 'légumes',
    'frite', 'frites', 'salade', 'pain'
  ];

  /**
   * Analyse un menu brut et le structure automatiquement
   */
  analyzeMenu(rawMenu: string, restaurantName: string): StructuredMenu {
    const sections = this.parseRawMenu(rawMenu);
    const classifiedSections = this.classifySections(sections);
    const menuType = this.detectMenuType(classifiedSections);
    const priceRange = this.calculatePriceRange(classifiedSections);

    return {
      restaurantName,
      menuType,
      sections: classifiedSections,
      priceRange
    };
  }

  /**
   * Parse le menu brut en sections
   */
  private parseRawMenu(rawMenu: string): MenuSection[] {
    const sections: MenuSection[] = [];
    const lines = rawMenu.split('\n').filter(line => line.trim());
    
    let currentSection: MenuSection | null = null;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Détection d'une nouvelle section (titre en majuscules ou avec des caractères spéciaux)
      if (this.isSectionTitle(trimmedLine)) {
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmedLine,
          items: [],
          type: 'other'
        };
      } else if (currentSection && this.isMenuItem(trimmedLine)) {
        // Parse l'item du menu
        const item = this.parseMenuItem(trimmedLine);
        if (item) {
          currentSection.items.push(item);
        }
      }
    }
    
    if (currentSection) {
      sections.push(currentSection);
    }
    
    return sections;
  }

  /**
   * Détermine si une ligne est un titre de section
   */
  private isSectionTitle(line: string): boolean {
    // Titre si : tout en majuscules, ou contient des caractères spéciaux, ou mots-clés de section
    return (
      line === line.toUpperCase() ||
      /[=\-_*]{2,}/.test(line) ||
      this.containsKeywords(line.toLowerCase(), [
        ...this.starterKeywords,
        ...this.mainKeywords,
        ...this.dessertKeywords,
        ...this.sharingKeywords,
        ...this.tastingKeywords,
        ...this.brunchKeywords,
        ...this.drinkKeywords,
        ...this.sideKeywords
      ])
    );
  }

  /**
   * Détermine si une ligne est un item de menu
   */
  private isMenuItem(line: string): boolean {
    // Item si contient un prix (€, EUR, ou nombre suivi d'€)
    return /\d+[,.]?\d*\s*€|€\s*\d+[,.]?\d*|\d+[,.]?\d*\s*EUR/i.test(line);
  }

  /**
   * Parse un item de menu individuel
   */
  private parseMenuItem(line: string): MenuItem | null {
    // Regex pour extraire nom, description et prix
    const priceMatch = line.match(/(\d+[,.]?\d*)\s*€/);
    if (!priceMatch) return null;

    const price = parseFloat(priceMatch[1].replace(',', '.'));
    const nameAndDesc = line.replace(/\d+[,.]?\d*\s*€.*$/, '').trim();
    
    // Séparer nom et description (souvent séparés par - ou :)
    const parts = nameAndDesc.split(/[-:]/);
    const name = parts[0].trim();
    const description = parts.length > 1 ? parts.slice(1).join(' ').trim() : undefined;

    return {
      name,
      price,
      description
    };
  }

  /**
   * Classifie les sections selon leur type
   */
  private classifySections(sections: MenuSection[]): MenuSection[] {
    return sections.map(section => ({
      ...section,
      type: this.classifySection(section)
    }));
  }

  /**
   * Classifie une section individuelle
   */
  private classifySection(section: MenuSection): MenuSection['type'] {
    const title = section.title.toLowerCase();
    
    if (this.containsKeywords(title, this.starterKeywords)) return 'starters';
    if (this.containsKeywords(title, this.mainKeywords)) return 'mains';
    if (this.containsKeywords(title, this.dessertKeywords)) return 'desserts';
    if (this.containsKeywords(title, this.sharingKeywords)) return 'sharing';
    if (this.containsKeywords(title, this.tastingKeywords)) return 'tasting';
    if (this.containsKeywords(title, this.brunchKeywords)) return 'brunch';
    if (this.containsKeywords(title, this.drinkKeywords)) return 'drinks';
    if (this.containsKeywords(title, this.sideKeywords)) return 'sides';
    
    // Classification par analyse des prix (heuristique)
    const avgPrice = section.items.reduce((sum, item) => sum + item.price, 0) / section.items.length;
    
    if (avgPrice < 15) return 'starters';
    if (avgPrice > 35) return 'mains';
    if (avgPrice < 12 && section.items.some(item => 
      item.name.toLowerCase().includes('glace') || 
      item.name.toLowerCase().includes('tarte')
    )) return 'desserts';
    
    return 'other';
  }

  /**
   * Détecte le type global du menu
   */
  private detectMenuType(sections: MenuSection[]): StructuredMenu['menuType'] {
    const types = sections.map(s => s.type);
    
    if (types.includes('tasting')) return 'tasting';
    if (types.includes('brunch')) return 'brunch';
    if (types.includes('sharing') && !types.includes('starters')) return 'sharing';
    if (types.includes('starters') && types.includes('mains') && types.includes('desserts')) return 'traditional';
    if (types.filter(t => t === 'other').length > types.length / 2) return 'casual';
    
    return 'mixed';
  }

  /**
   * Calcule la fourchette de prix
   */
  private calculatePriceRange(sections: MenuSection[]): StructuredMenu['priceRange'] {
    const allPrices = sections.flatMap(section => section.items.map(item => item.price));
    
    if (allPrices.length === 0) {
      return { min: 0, max: 0, average: 0 };
    }
    
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const average = allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length;
    
    return {
      min: Math.round(min),
      max: Math.round(max),
      average: Math.round(average * 100) / 100
    };
  }

  /**
   * Vérifie si un texte contient des mots-clés
   */
  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  /**
   * Convertit le menu structuré vers le format de l'app
   */
  convertToAppFormat(structuredMenu: StructuredMenu): {
    name: string;
    priceRange: {
      starters: { min: number; max: number };
      mains: { min: number; max: number };
      desserts: { min: number; max: number };
      averageTotal: number;
    };
  } {
    const starterSection = structuredMenu.sections.find(s => s.type === 'starters');
    const mainSection = structuredMenu.sections.find(s => s.type === 'mains');
    const dessertSection = structuredMenu.sections.find(s => s.type === 'desserts');

    const getMinMax = (section: MenuSection | undefined) => {
      if (!section || section.items.length === 0) return { min: 0, max: 0 };
      const prices = section.items.map(item => item.price);
      return {
        min: Math.min(...prices),
        max: Math.max(...prices)
      };
    };

    const starters = getMinMax(starterSection);
    const mains = getMinMax(mainSection);
    const desserts = getMinMax(dessertSection);

    // Calcul du total moyen basé sur les prix moyens de chaque catégorie
    const avgStarter = starters.min > 0 ? (starters.min + starters.max) / 2 : 0;
    const avgMain = mains.min > 0 ? (mains.min + mains.max) / 2 : 0;
    const avgDessert = desserts.min > 0 ? (desserts.min + desserts.max) / 2 : 0;
    
    const averageTotal = Math.round(avgStarter + avgMain + avgDessert);

    return {
      name: structuredMenu.restaurantName,
      priceRange: {
        starters,
        mains,
        desserts,
        averageTotal
      }
    };
  }
}

// Exemple d'utilisation
export const menuAnalyzer = new MenuAnalyzer();

// Fonction utilitaire pour analyser un menu depuis du HTML
export function analyzeMenuFromHTML(html: string, restaurantName: string): StructuredMenu {
  // Nettoie le HTML et extrait le texte
  const cleanText = html
    .replace(/<[^>]*>/g, '\n') // Remplace les balises par des retours à la ligne
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

  return menuAnalyzer.analyzeMenu(cleanText, restaurantName);
}

// Exemple de menu brut pour test
export const exampleRawMenu = `
ENTRÉES
Velouté de potimarron aux châtaignes - 14€
Foie gras mi-cuit, chutney de figues - 28€
Tartare de Saint-Jacques, caviar d'Aquitaine - 24€

PLATS PRINCIPAUX  
Côte de bœuf Black Angus, jus au thym - 45€
Bar de ligne en croûte d'herbes, beurre blanc - 38€
Risotto aux cèpes et truffe noire - 32€

DESSERTS
Tarte fine aux pommes, glace vanille - 12€
Soufflé au Grand Marnier - 16€
Sélection de fromages affinés - 18€

MENU DÉGUSTATION
Menu Découverte 5 services - 85€
Menu Prestige 7 services - 120€
`;
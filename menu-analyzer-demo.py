#!/usr/bin/env python3
"""
Démonstrateur Python du système d'analyse de menus
Version simplifiée pour montrer la logique principale
"""

import re
import json
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, asdict

@dataclass
class MenuItem:
    name: str
    price: float
    description: Optional[str] = None

@dataclass
class MenuSection:
    title: str
    items: List[MenuItem]
    section_type: str = 'other'

@dataclass
class StructuredMenu:
    restaurant_name: str
    menu_type: str
    sections: List[MenuSection]
    price_range: Dict[str, float]

class MenuAnalyzer:
    def __init__(self):
        self.keywords = {
            'starters': ['entrée', 'entrées', 'amuse', 'apéritif', 'starter', 'appetizer'],
            'mains': ['plat', 'plats', 'principal', 'principaux', 'main', 'viande', 'poisson'],
            'desserts': ['dessert', 'desserts', 'sucré', 'pâtisserie', 'glace', 'tarte'],
            'sharing': ['partage', 'partager', 'plateau', 'planche', 'tapas', 'mezze'],
            'tasting': ['menu', 'dégustation', 'tasting', 'découverte', 'chef'],
            'brunch': ['brunch', 'petit-déjeuner', 'breakfast', 'œuf', 'pancake'],
            'drinks': ['boisson', 'vin', 'cocktail', 'bière', 'café', 'thé'],
            'sides': ['accompagnement', 'garniture', 'side', 'légume', 'frite']
        }
    
    def analyze_menu(self, raw_menu: str, restaurant_name: str) -> StructuredMenu:
        """Analyse un menu brut et le structure automatiquement"""
        sections = self._parse_raw_menu(raw_menu)
        classified_sections = self._classify_sections(sections)
        menu_type = self._detect_menu_type(classified_sections)
        price_range = self._calculate_price_range(classified_sections)
        
        return StructuredMenu(
            restaurant_name=restaurant_name,
            menu_type=menu_type,
            sections=classified_sections,
            price_range=price_range
        )
    
    def _parse_raw_menu(self, raw_menu: str) -> List[MenuSection]:
        """Parse le menu brut en sections"""
        sections = []
        lines = [line.strip() for line in raw_menu.split('\n') if line.strip()]
        
        current_section = None
        
        for line in lines:
            if self._is_section_title(line):
                if current_section:
                    sections.append(current_section)
                current_section = MenuSection(title=line, items=[])
            elif current_section and self._is_menu_item(line):
                item = self._parse_menu_item(line)
                if item:
                    current_section.items.append(item)
        
        if current_section:
            sections.append(current_section)
        
        return sections
    
    def _is_section_title(self, line: str) -> bool:
        """Détermine si une ligne est un titre de section"""
        # Titre si tout en majuscules ou contient des mots-clés
        return (line.isupper() or 
                any(keyword in line.lower() for keywords in self.keywords.values() 
                    for keyword in keywords))
    
    def _is_menu_item(self, line: str) -> bool:
        """Détermine si une ligne est un item de menu"""
        return bool(re.search(r'\d+[,.]?\d*\s*€', line))
    
    def _parse_menu_item(self, line: str) -> Optional[MenuItem]:
        """Parse un item de menu individuel"""
        price_match = re.search(r'(\d+[,.]?\d*)\s*€', line)
        if not price_match:
            return None
        
        price = float(price_match.group(1).replace(',', '.'))
        name_and_desc = re.sub(r'\d+[,.]?\d*\s*€.*$', '', line).strip()
        
        # Séparer nom et description
        parts = re.split(r'[-:]', name_and_desc, 1)
        name = parts[0].strip()
        description = parts[1].strip() if len(parts) > 1 else None
        
        return MenuItem(name=name, price=price, description=description)
    
    def _classify_sections(self, sections: List[MenuSection]) -> List[MenuSection]:
        """Classifie les sections selon leur type"""
        for section in sections:
            section.section_type = self._classify_section(section)
        return sections
    
    def _classify_section(self, section: MenuSection) -> str:
        """Classifie une section individuelle"""
        title_lower = section.title.lower()
        
        for section_type, keywords in self.keywords.items():
            if any(keyword in title_lower for keyword in keywords):
                return section_type
        
        # Classification par prix (heuristique)
        if section.items:
            avg_price = sum(item.price for item in section.items) / len(section.items)
            if avg_price < 15:
                return 'starters'
            elif avg_price > 35:
                return 'mains'
        
        return 'other'
    
    def _detect_menu_type(self, sections: List[MenuSection]) -> str:
        """Détecte le type global du menu"""
        types = [s.section_type for s in sections]
        
        if 'tasting' in types:
            return 'tasting'
        elif 'brunch' in types:
            return 'brunch'
        elif 'sharing' in types and 'starters' not in types:
            return 'sharing'
        elif all(t in types for t in ['starters', 'mains', 'desserts']):
            return 'traditional'
        elif types.count('other') > len(types) / 2:
            return 'casual'
        else:
            return 'mixed'
    
    def _calculate_price_range(self, sections: List[MenuSection]) -> Dict[str, float]:
        """Calcule la fourchette de prix"""
        all_prices = [item.price for section in sections for item in section.items]
        
        if not all_prices:
            return {'min': 0, 'max': 0, 'average': 0}
        
        return {
            'min': min(all_prices),
            'max': max(all_prices),
            'average': sum(all_prices) / len(all_prices)
        }
    
    def convert_to_app_format(self, structured_menu: StructuredMenu) -> Dict[str, Any]:
        """Convertit vers le format de l'app"""
        def get_min_max(section_type: str) -> Dict[str, float]:
            section = next((s for s in structured_menu.sections if s.section_type == section_type), None)
            if not section or not section.items:
                return {'min': 0, 'max': 0}
            prices = [item.price for item in section.items]
            return {'min': min(prices), 'max': max(prices)}
        
        starters = get_min_max('starters')
        mains = get_min_max('mains')
        desserts = get_min_max('desserts')
        
        # Calcul du total moyen
        avg_starter = (starters['min'] + starters['max']) / 2 if starters['min'] > 0 else 0
        avg_main = (mains['min'] + mains['max']) / 2 if mains['min'] > 0 else 0
        avg_dessert = (desserts['min'] + desserts['max']) / 2 if desserts['min'] > 0 else 0
        
        return {
            'name': structured_menu.restaurant_name,
            'priceRange': {
                'starters': starters,
                'mains': mains,
                'desserts': desserts,
                'averageTotal': round(avg_starter + avg_main + avg_dessert)
            }
        }

# Exemples de test
def main():
    analyzer = MenuAnalyzer()
    
    # Menu traditionnel
    traditional_menu = """
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
"""
    
    # Menu tapas
    tapas_menu = """
À PARTAGER
Planche de charcuterie ibérique - 22€
Assortiment de fromages français - 18€
Croquettes de jambon ibérico - 8€
Patatas bravas maison - 6€
Gambas à l'ail et piment - 12€
"""
    
    print("=== MENU TRADITIONNEL ===")
    result1 = analyzer.analyze_menu(traditional_menu, "Le Gourmet")
    print(json.dumps(asdict(result1), indent=2, ensure_ascii=False))
    print("Format App:", json.dumps(analyzer.convert_to_app_format(result1), indent=2, ensure_ascii=False))
    
    print("\n=== MENU TAPAS ===")
    result2 = analyzer.analyze_menu(tapas_menu, "Casa Tapas")
    print(json.dumps(asdict(result2), indent=2, ensure_ascii=False))
    print("Format App:", json.dumps(analyzer.convert_to_app_format(result2), indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
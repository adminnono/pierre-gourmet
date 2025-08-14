import { menuAnalyzer, analyzeMenuFromHTML } from './menuAnalyzer';

// Exemples de différents types de menus pour démonstration

export const traditionalMenu = `
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
`;

export const tapasMenu = `
À PARTAGER
Planche de charcuterie ibérique - 22€
Assortiment de fromages français - 18€
Croquettes de jambon ibérico - 8€
Patatas bravas maison - 6€
Gambas à l'ail et piment - 12€
Tortilla española traditionnelle - 9€

BOISSONS
Sangria rouge ou blanche - 6€
Rioja Crianza - 8€
Bière Estrella Galicia - 4€
`;

export const tastingMenu = `
MENU DÉGUSTATION "DÉCOUVERTE"
7 services, accord mets et vins inclus - 145€

MENU DÉGUSTATION "PRESTIGE" 
9 services, grands crus inclus - 195€

MENU VÉGÉTARIEN
5 services créatifs - 95€
`;

export const brunchMenu = `
BRUNCH WEEKEND
Œufs Benedict, saumon fumé - 16€
Pancakes aux myrtilles, sirop d'érable - 12€
Avocado toast, graines de tournesol - 14€
Granola maison, fruits de saison - 9€

BOISSONS CHAUDES
Café de spécialité - 4€
Thé premium - 5€
Chocolat chaud maison - 6€

JUS FRAIS
Orange pressée - 5€
Smoothie détox - 7€
`;

export const casualMenu = `
NOS BURGERS
Classic Burger, frites maison - 16€
Chicken Crispy, sauce BBQ - 15€
Veggie Burger, galette quinoa - 14€

SALADES & BOWLS
Buddha Bowl, légumes grillés - 13€
Salade César, poulet grillé - 12€
Poke Bowl saumon, avocat - 17€

DESSERTS
Brownie chocolat, glace vanille - 8€
Cheesecake fruits rouges - 7€
`;

// Fonction de test pour tous les exemples
export function testAllMenuTypes() {
  console.log('=== TEST MENU TRADITIONNEL ===');
  const traditional = menuAnalyzer.analyzeMenu(traditionalMenu, 'Le Gourmet');
  console.log(JSON.stringify(traditional, null, 2));
  console.log('Format App:', menuAnalyzer.convertToAppFormat(traditional));

  console.log('\n=== TEST MENU TAPAS ===');
  const tapas = menuAnalyzer.analyzeMenu(tapasMenu, 'Casa Tapas');
  console.log(JSON.stringify(tapas, null, 2));
  console.log('Format App:', menuAnalyzer.convertToAppFormat(tapas));

  console.log('\n=== TEST MENU DÉGUSTATION ===');
  const tasting = menuAnalyzer.analyzeMenu(tastingMenu, 'Restaurant Étoilé');
  console.log(JSON.stringify(tasting, null, 2));
  console.log('Format App:', menuAnalyzer.convertToAppFormat(tasting));

  console.log('\n=== TEST MENU BRUNCH ===');
  const brunch = menuAnalyzer.analyzeMenu(brunchMenu, 'Café Moderne');
  console.log(JSON.stringify(brunch, null, 2));
  console.log('Format App:', menuAnalyzer.convertToAppFormat(brunch));

  console.log('\n=== TEST MENU CASUAL ===');
  const casual = menuAnalyzer.analyzeMenu(casualMenu, 'Street Food');
  console.log(JSON.stringify(casual, null, 2));
  console.log('Format App:', menuAnalyzer.convertToAppFormat(casual));
}

// Exemple d'analyse depuis du HTML
export const htmlMenuExample = `
<div class="menu">
  <h2>ENTRÉES</h2>
  <div class="item">
    <span class="name">Velouté de potimarron</span>
    <span class="price">14€</span>
  </div>
  <div class="item">
    <span class="name">Foie gras mi-cuit</span>
    <span class="description">chutney de figues</span>
    <span class="price">28€</span>
  </div>
  
  <h2>PLATS</h2>
  <div class="item">
    <span class="name">Côte de bœuf Black Angus</span>
    <span class="price">45€</span>
  </div>
</div>
`;

export function testHTMLParsing() {
  console.log('=== TEST PARSING HTML ===');
  const result = analyzeMenuFromHTML(htmlMenuExample, 'Restaurant HTML');
  console.log(JSON.stringify(result, null, 2));
  console.log('Format App:', menuAnalyzer.convertToAppFormat(result));
}
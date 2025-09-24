import { BottlePayload } from '@/services/bottle.service';
import fs from 'fs';
import path from 'path';

export const bottles: BottlePayload[] = [
  {
    name: 'Rhum Trois Rivières Ambré',
    description: `
    **Type** :
    Rhum agricole AOC Martinique, vieilli 12-18 mois en fûts de chêne, distillé à partir de pur jus de canne (vesou).

    **Profil sensoriel** :
    | Étape       | Arômes et saveurs                                                                 |
    |-------------|-----------------------------------------------------------------------------------|
    | **Nez**     | Fruits exotiques (banane, ananas), fleur d’oranger, vanille, épices douces, minéralité. |
    | **Bouche**  | Rondeur sucrée (fruits confits, miel), zestes d’orange, noix de coco toastée, épices. |
    | **Finale**  | Persistante : vanille, clou de girofle, cacao, fruits secs.                        |

    **Accords** :
    - **Dégustation** : 18-20°C, verre tulipe.
    - **Cocktails** : Ti’ Punch, Mai Tai, gingembre frais.
    - **Mets** : Chocolat noir, Roquefort, tarte aux fruits tropicaux.

    **Évolution** :
    Se bonifie en bouteille sur 2-3 ans, notes torréfiées.
    `,
    image: {
      buffer: fs.readFileSync(path.join(__dirname, 'assets', 'rhum-agricole-trois-rivieres-ambre.jpg')),
      originalname: 'rhum-agricole-trois-rivieres-ambre.jpg',
    },
    categories: [2, 6],
    countryId: 2,
  },
  {
    name: 'Rhum Saint James Blanc',
    description: `
    **Type** :
    Rhum agricole blanc AOC Martinique, distillé à partir de pur jus de canne à sucre (vesou), non vieilli.

    **Profil sensoriel** :
      Étape       | Arômes et saveurs                                                                 |
    |-------------|-----------------------------------------------------------------------------------|
    | **Nez**     | Notes fraîches de canne à sucre, agrumes (citron, pamplemousse), fleurs blanches, légère touche herbacée. |
    | **Bouche**  | Attaque vive et fruité (poire, pomme verte), minéralité, finesse végétale.         |
    | **Finale**  | Courte et fraîche, avec une pointe de poivre blanc et de sucre de canne.          |

    **Accords** :
    - **Dégustation** : Frais, entre 16-18°C, idéal en Ti’ Punch ou dans des cocktails tropicaux.
    - **Cocktails** : Ti’ Punch, Mojito, Daiquiri, ou avec des jus de fruits exotiques.
    - **Mets** : Huîtres, ceviche, ou plats épicés (cari antillais).

    **Particularités** :
    - **Degré d'alcool** : 40% ou 50% selon les versions.
    - **Utilisation** : Souvent utilisé comme base pour cocktails grâce à son profil frais et neutre.
    `,
    image: {
      buffer: fs.readFileSync(
        path.join(__dirname, 'assets', 'RumWhiteSaintJames100cl-ImperialBlanc-Dilmoor-min_grande.webp'),
      ),
      originalname: 'RumWhiteSaintJames100cl-ImperialBlanc-Dilmoor-min_grande.webp',
    },
    categories: [1, 6],
    countryId: 2,
  },
];

// SPDX-License-Identifier: MIT
/**
 * @file lang/fr-FR.js
 * @fileoverview Dicionário i18n fr-FR do Quillit Editor.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export default {
  placeholder: {
    default: 'Saisissez votre contenu...'
  },
  common: {
    close: 'Fermer',
    cancel: 'Annuler',
    insert: 'Insérer',
    back: 'Retour',
    loading: 'Chargement...',
    error: 'Erreur'
  },
  status: {
    ready: 'Prêt à éditer',
    code: 'Mode code HTML',
    visual: 'Mode visuel',
    fullscreen: 'Mode plein écran activé'
  },
  unit: {
    character: { one: 'caractère', other: 'caractères' },
    word: { one: 'mot', other: 'mots' }
  },
  toolbar: {
    group: { style: 'Style', advanced: 'Avancé', technical: 'Technique', lists: 'Listes', ordered: 'Numérotation', align: 'Aligner', insert: 'Insérer' }
  },
  tool: {
    paragraph: 'Paragraphe',
    heading1: 'Titre H1',
    heading2: 'Titre H2',
    heading3: 'Titre H3',
    heading4: 'Titre H4',
    heading5: 'Titre H5',
    heading6: 'Titre H6',

    bold: 'Gras',
    italic: 'Italique',
    underline: 'Souligner',
    strike: 'Barré',
    subscript: 'Indice',
    superscript: 'Exposant',
    mark: 'Surligner',

    unorderedList: 'Liste à puces',
    orderedList: 'Liste ordonnée',
    orderedListDecimal: 'Numérotation : 1,2,3',
    orderedListDecimalLeadingZero: 'Numérotation : 01,02,03',
    orderedListUpperAlpha: 'Numérotation : A,B,C',
    orderedListLowerAlpha: 'Numérotation : a,b,c',
    orderedListUpperRoman: 'Numérotation : I,II,III',
    orderedListLowerRoman: 'Numérotation : i,ii,iii',
    orderedListLowerGreek: 'Numérotation : α,β,γ',
    orderedListStart: 'Définir le début...',
    orderedListReversed: 'Basculer numérotation inversée',
    orderedListItemValue: 'Définir le numéro de l’élément...',
    unorderedListDisc: 'Puce : disc',
    unorderedListCircle: 'Puce : circle',
    unorderedListSquare: 'Puce : square',
    unorderedListDiamond: 'Puce : diamond',
    indent: 'Augmenter le retrait',
    outdent: 'Diminuer le retrait',

    quote: 'Citation',
    codeBlock: 'Bloc de code',

    alignLeft: 'Aligner à gauche',
    alignCenter: 'Centrer',
    alignRight: 'Aligner à droite',
    alignJustify: 'Justifier',

    hr: 'Ligne horizontale',

    clear: 'Effacer la mise en forme',
    undo: 'Annuler',
    redo: 'Rétablir',

    source: 'HTML',
    link: 'Insérer un lien',
    unlink: 'Supprimer le lien',
    image: 'Insérer une image',
    video: 'Insérer une vidéo',
    audio: 'Insérer un audio',
    inlineCode: 'Code en ligne',
    table: 'Insérer un tableau',
    kbd: 'Touche clavier',
    abbr: 'Abréviation',
    defList: 'Liste de définitions',
    foreColor: 'Couleur du texte',
    backColor: 'Couleur de fond',
    fullscreen: 'Plein écran'
  },
  modal: {
    orderedListStart: { title: 'Début de la liste numérotée', label: 'Commencer à :' },
    orderedListItemValue: { title: 'Numéro de l’élément', label: 'Définir le numéro de l’élément :' },
    foreColor: { title: 'Couleur du Texte', pick: 'Choisissez une couleur :' },
    backColor: { title: 'Couleur de Fond', pick: 'Choisissez une couleur :' },
    link: {
      title: 'Insérer un Lien',
      url: 'URL :',
      text: 'Texte (optionnel) :',
      textPlaceholder: 'Texte du lien',
      newTab: 'Ouvrir dans un nouvel onglet'
    },
    image: {
      title: 'Insérer une Image',
      tabRemote: '🌐 Distant',
      tabLocal: '📁 Local',
      url: "URL de l'image :",
      alt: 'Texte alternatif :',
      altPlaceholder: "Description de l'image",
      width: 'Largeur max (px, optionnel) :',
      localPath: 'Chemin du fichier :',
      localPathPlaceholder: 'images/mon-image.jpg',
      browseTitle: "Ouvrir la bibliothèque d'images",
      browseChecking: '📂 Vérification...',
      browseOpen: '📂 Ouvrir la bibliothèque',
      browseUnavailable: '📂 Bibliothèque indisponible',
      dirLabel: 'Répertoire',
      dirNotConfigured: 'non configuré',
      statusNeedLocalDir: 'Définissez <code>mediaLocalDir</code> pour activer la bibliothèque locale.',
      statusNeedEndpoint: 'Bibliothèque indisponible : définissez <code>mediaLibraryEndpoint</code> (ou gardez le endpoint avec le composant pour auto-resolve).',
      statusUnavailableHint: "Ce projet ne sert pas l'endpoint. Vous pouvez saisir le chemin manuellement."
    },
    imageLibrary: {
      title: "Bibliothèque d'Images",
      close: 'Fermer',
      directory: 'Répertoire :',
      folder: 'Dossier :',
      filterPlaceholder: 'Filtrer les images...',
      filterAria: 'Filtrer les images',
      loadingImages: 'Chargement des images...',
      loading: 'Chargement...',
      none: 'Aucune image trouvée.',
      backTitle: 'Retour',
      openFolderError: "Erreur lors de l'ouverture du dossier : {message}",
      loadItemsError: 'Erreur lors du chargement : {message}',
      notConfigured: "Bibliothèque non configurée. Définissez <code>mediaLibraryEndpoint</code> et <code>mediaLocalDir</code>."
    },
    table: {
      title: 'Insérer un Tableau',
      rows: 'Lignes :',
      cols: 'Colonnes :',
      includeHeader: "Inclure l'en-tête",
      headerPrefix: 'En-tête {n}'
    },
    kbd: { title: 'Touche Clavier', key: 'Touche :' },
    abbr: { title: 'Abréviation', abbr: 'Abréviation :', meaning: 'Signification complète :'},
    defList: { title: 'Liste de Définitions', count: "Nombre d'éléments :", term: 'Terme {n}', def: 'Définition {n}' },
    video: {
      title: 'Insérer une Vidéo',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Distant',
      localPath: 'Chemin du fichier :',
      localPathPlaceholder: 'videos/ma-video.mp4',
      remoteUrl: 'URL (YouTube, Vimeo ou direct) :',
      remoteUrlPlaceholder: 'https://www.youtube.com/watch?v=...'
    },
    audio: {
      title: 'Insérer un Audio',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Distant',
      localPath: 'Chemin du fichier :',
      localPathPlaceholder: 'audio/chanson.mp3',
      remoteUrl: "URL de l'audio :",
      remoteUrlPlaceholder: 'https://exemple.com/audio.mp3'
    }
  },
  insertDefaults: { inlineCode: 'code', mark: 'surlignage' },
  errors: {
    mediaLibraryHttp: 'Impossible de charger la bibliothèque (HTTP {status})',
    mediaLibraryInvalid: 'Réponse invalide de la bibliothèque de médias'
  },
  browser: {
    noVideo: "Votre navigateur ne prend pas en charge la vidéo.",
    noAudio: "Votre navigateur ne prend pas en charge l'audio."
  }
};

// SPDX-License-Identifier: MIT
/**
 * @file lang/de-DE.js
 * @fileoverview Dicionário i18n de-DE do Quillit Editor.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export default {
  placeholder: {
    default: 'Geben Sie Ihren Inhalt ein...'
  },
  common: {
    close: 'Schließen',
    cancel: 'Abbrechen',
    insert: 'Einfügen',
    back: 'Zurück',
    loading: 'Laden...',
    error: 'Fehler'
  },
  status: {
    ready: 'Bereit zum Bearbeiten',
    code: 'HTML-Code-Modus',
    visual: 'Visueller Modus',
    fullscreen: 'Vollbildmodus aktiviert'
  },
  unit: {
    character: { one: 'Zeichen', other: 'Zeichen' },
    word: { one: 'Wort', other: 'Wörter' }
  },
  toolbar: {
    group: { style: 'Stil', advanced: 'Erweitert', technical: 'Technisch', lists: 'Listen', ordered: 'Nummerierung', align: 'Ausrichten', insert: 'Einfügen' }
  },
  tool: {
    paragraph: 'Absatz',
    heading1: 'Überschrift H1',
    heading2: 'Überschrift H2',
    heading3: 'Überschrift H3',
    heading4: 'Überschrift H4',
    heading5: 'Überschrift H5',
    heading6: 'Überschrift H6',

    bold: 'Fett',
    italic: 'Kursiv',
    underline: 'Unterstreichen',
    strike: 'Durchgestrichen',
    subscript: 'Tiefgestellt',
    superscript: 'Hochgestellt',
    mark: 'Hervorheben',

    unorderedList: 'Aufzählung',
      orderedList: 'Geordnete Liste',
    orderedListDecimal: 'Nummerierung: 1,2,3',
    orderedListDecimalLeadingZero: 'Nummerierung: 01,02,03',
    orderedListUpperAlpha: 'Nummerierung: A,B,C',
    orderedListLowerAlpha: 'Nummerierung: a,b,c',
    orderedListUpperRoman: 'Nummerierung: I,II,III',
    orderedListLowerRoman: 'Nummerierung: i,ii,iii',
    orderedListLowerGreek: 'Nummerierung: α,β,γ',
    orderedListStart: 'Startnummer setzen...',
    orderedListReversed: 'Umgekehrte Nummerierung umschalten',
    orderedListItemValue: 'Elementnummer setzen...',
    unorderedListDisc: 'Aufzählungszeichen: disc',
    unorderedListCircle: 'Aufzählungszeichen: circle',
    unorderedListSquare: 'Aufzählungszeichen: square',
    unorderedListDiamond: 'Aufzählungszeichen: diamond',
    indent: 'Einzug erhöhen',
    outdent: 'Einzug verringern',

    quote: 'Zitat',
    codeBlock: 'Codeblock',

    alignLeft: 'Links ausrichten',
    alignCenter: 'Zentrieren',
    alignRight: 'Rechts ausrichten',
    alignJustify: 'Blocksatz',

    hr: 'Horizontale Linie',

    clear: 'Formatierung entfernen',
    undo: 'Rückgängig',
    redo: 'Wiederholen',

    source: 'HTML',
    link: 'Link einfügen',
    unlink: 'Link entfernen',
    image: 'Bild einfügen',
    video: 'Video einfügen',
    audio: 'Audio einfügen',
    inlineCode: 'Inline-Code',
    table: 'Tabelle einfügen',
    kbd: 'Tastenkürzel',
    abbr: 'Abkürzung',
    defList: 'Definitionsliste',
    foreColor: 'Textfarbe',
    backColor: 'Hintergrundfarbe',
    fullscreen: 'Vollbild'
  },
  modal: {
    orderedListStart: { title: 'Start der nummerierten Liste', label: 'Beginnen bei:' },
    orderedListItemValue: { title: 'Elementnummer', label: 'Elementnummer setzen:' },
    foreColor: { title: 'Textfarbe', pick: 'Farbe wählen:' },
    backColor: { title: 'Hintergrundfarbe', pick: 'Farbe wählen:' },
    link: {
      title: 'Link einfügen',
      url: 'URL:',
      text: 'Text (optional):',
      textPlaceholder: 'Linktext',
      newTab: 'In neuem Tab öffnen'
    },
    image: {
      title: 'Bild einfügen',
      tabRemote: '🌐 Remote',
      tabLocal: '📁 Lokal',
      url: 'Bild-URL:',
      alt: 'Alternativtext:',
      altPlaceholder: 'Bildbeschreibung',
      width: 'Max. Breite (px, optional):',
      localPath: 'Dateipfad:',
      localPathPlaceholder: 'bilder/mein-bild.jpg',
      browseTitle: 'Bildbibliothek öffnen',
      browseChecking: '📂 Prüfen...',
      browseOpen: '📂 Bibliothek öffnen',
      browseUnavailable: '📂 Bibliothek nicht verfügbar',
      dirLabel: 'Verzeichnis',
      dirNotConfigured: 'nicht konfiguriert',
      statusNeedLocalDir: 'Setzen Sie <code>mediaLocalDir</code>, um die lokale Bibliothek zu aktivieren.',
      statusNeedEndpoint: 'Bibliothek nicht verfügbar: setzen Sie <code>mediaLibraryEndpoint</code> (oder behalten Sie den Endpoint beim Component für auto-resolve).',
      statusUnavailableHint: 'Dieses Projekt stellt den Endpoint nicht bereit. Sie können den Pfad manuell eingeben.'
    },
    imageLibrary: {
      title: 'Bildbibliothek',
      close: 'Schließen',
      directory: 'Verzeichnis:',
      folder: 'Ordner:',
      filterPlaceholder: 'Bilder filtern...',
      filterAria: 'Bilder filtern',
      loadingImages: 'Bilder werden geladen...',
      loading: 'Laden...',
      none: 'Keine Bilder gefunden.',
      backTitle: 'Zurück',
      openFolderError: 'Ordner konnte nicht geöffnet werden: {message}',
      loadItemsError: 'Elemente konnten nicht geladen werden: {message}',
      notConfigured: 'Bibliothek ist nicht konfiguriert. Setzen Sie <code>mediaLibraryEndpoint</code> und <code>mediaLocalDir</code>.'
    },
    table: {
      title: 'Tabelle einfügen',
      rows: 'Zeilen:',
      cols: 'Spalten:',
      includeHeader: 'Kopfzeile einfügen',
      headerPrefix: 'Kopf {n}'
    },
    kbd: { title: 'Tastenkürzel', key: 'Taste:' },
    abbr: { title: 'Abkürzung', abbr: 'Abkürzung:', meaning: 'Bedeutung:' },
    defList: { title: 'Definitionsliste', count: 'Anzahl der Einträge:', term: 'Begriff {n}', def: 'Definition {n}' },
    video: {
      title: 'Video einfügen',
      tabLocal: '📁 Lokal',
      tabRemote: '🌐 Remote',
      localPath: 'Dateipfad:',
      localPathPlaceholder: 'videos/mein-video.mp4',
      remoteUrl: 'URL (YouTube, Vimeo oder direkt):',
      remoteUrlPlaceholder: 'https://www.youtube.com/watch?v=...'
    },
    audio: {
      title: 'Audio einfügen',
      tabLocal: '📁 Lokal',
      tabRemote: '🌐 Remote',
      localPath: 'Dateipfad:',
      localPathPlaceholder: 'audio/song.mp3',
      remoteUrl: 'Audio-URL:',
      remoteUrlPlaceholder: 'https://beispiel.de/audio.mp3'
    }
  },
  insertDefaults: { inlineCode: 'code', mark: 'hervorhebung' },
  errors: {
    mediaLibraryHttp: 'Bibliothek konnte nicht geladen werden (HTTP {status})',
    mediaLibraryInvalid: 'Ungültige Antwort der Medienbibliothek'
  },
  browser: {
    noVideo: 'Ihr Browser unterstützt keine Videos.',
    noAudio: 'Ihr Browser unterstützt kein Audio.'
  }
};

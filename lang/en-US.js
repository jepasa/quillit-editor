// SPDX-License-Identifier: MIT
/**
 * @file lang/en-US.js
 * @fileoverview Dicionário i18n en-US do Quillit Editor.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export default {
  placeholder: {
    default: 'Type your content...'
  },
  common: {
    close: 'Close',
    cancel: 'Cancel',
    insert: 'Insert',
    back: 'Back',
    loading: 'Loading...',
    error: 'Error'
  },
  status: {
    ready: 'Ready to edit',
    code: 'HTML code mode',
    visual: 'Visual mode',
    fullscreen: 'Fullscreen mode enabled'
  },
  unit: {
    character: { one: 'character', other: 'characters' },
    word: { one: 'word', other: 'words' }
  },
  toolbar: {
    group: {
      style: 'Style',
      advanced: 'Advanced',
      technical: 'Technical',
      lists: 'Lists',
      ordered: 'Numbering',
      align: 'Align',
      insert: 'Insert'
    }
  },
  tool: {
    paragraph: 'Paragraph',
    heading1: 'Heading H1',
    heading2: 'Heading H2',
    heading3: 'Heading H3',
    heading4: 'Heading H4',
    heading5: 'Heading H5',
    heading6: 'Heading H6',

    bold: 'Bold',
    italic: 'Italic',
    underline: 'Underline',
    strike: 'Strikethrough',
    subscript: 'Subscript',
    superscript: 'Superscript',
    mark: 'Highlight',

    unorderedList: 'Bulleted list',
    orderedList: 'Ordered list',
    orderedListDecimal: 'Numbering: 1,2,3',
    orderedListDecimalLeadingZero: 'Numbering: 01,02,03',
    orderedListUpperAlpha: 'Numbering: A,B,C',
    orderedListLowerAlpha: 'Numbering: a,b,c',
    orderedListUpperRoman: 'Numbering: I,II,III',
    orderedListLowerRoman: 'Numbering: i,ii,iii',
    orderedListLowerGreek: 'Numbering: α,β,γ',
    orderedListStart: 'Set start number...',
    orderedListReversed: 'Toggle reversed numbering',
    orderedListItemValue: 'Set item number...',
    unorderedListDisc: 'Bullet: disc',
    unorderedListCircle: 'Bullet: circle',
    unorderedListSquare: 'Bullet: square',
    unorderedListDiamond: 'Bullet: diamond',
    indent: 'Increase indent',
    outdent: 'Decrease indent',

    quote: 'Quote',
    codeBlock: 'Code block',

    alignLeft: 'Align left',
    alignCenter: 'Center',
    alignRight: 'Align right',
    alignJustify: 'Justify',

    hr: 'Horizontal rule',

    clear: 'Clear formatting',
    undo: 'Undo',
    redo: 'Redo',

    source: 'HTML',
    link: 'Insert link',
    unlink: 'Remove link',
    image: 'Insert image',
    video: 'Insert video',
    audio: 'Insert audio',
    inlineCode: 'Inline code',
    table: 'Insert table',
    kbd: 'Keyboard key',
    abbr: 'Abbreviation',
    defList: 'Definition list',
    foreColor: 'Text color',
    backColor: 'Background color',
    fullscreen: 'Fullscreen'
  },
  modal: {
    orderedListStart: { title: 'Numbered list start', label: 'Start at:' },
    orderedListItemValue: { title: 'Item number', label: 'Set item number:' },
    foreColor: { title: 'Text Color', pick: 'Pick a color:' },
    backColor: { title: 'Background Color', pick: 'Pick a color:' },
    link: {
      title: 'Insert Link',
      url: 'URL:',
      text: 'Text (optional):',
      textPlaceholder: 'Link text',
      newTab: 'Open in a new tab'
    },
    image: {
      title: 'Insert Image',
      tabRemote: '🌐 Remote',
      tabLocal: '📁 Local',
      url: 'Image URL:',
      alt: 'Alt text:',
      altPlaceholder: 'Image description',
      width: 'Max width (px, optional):',
      localPath: 'File path:',
      localPathPlaceholder: 'images/my-image.jpg',
      browseTitle: 'Open image library',
      browseChecking: '📂 Checking...',
      browseOpen: '📂 Open library',
      browseUnavailable: '📂 Library unavailable',
      dirLabel: 'Directory',
      dirNotConfigured: 'not configured',
      statusNeedLocalDir: 'Set <code>mediaLocalDir</code> in the editor options to enable the local library.',
      statusNeedEndpoint: 'Library unavailable: set <code>mediaLibraryEndpoint</code> (or keep the endpoint bundled with the component for auto-resolve).',
      statusUnavailableHint: 'This project is not serving the library endpoint. You can still type the path manually.'
    },
    imageLibrary: {
      title: 'Image Library',
      close: 'Close',
      directory: 'Directory:',
      folder: 'Folder:',
      filterPlaceholder: 'Filter images...',
      filterAria: 'Filter images',
      loadingImages: 'Loading images...',
      loading: 'Loading...',
      none: 'No images found.',
      backTitle: 'Back',
      openFolderError: 'Failed to open folder: {message}',
      loadItemsError: 'Failed to load items: {message}',
      notConfigured: 'Library is not configured. Set <code>mediaLibraryEndpoint</code> and <code>mediaLocalDir</code> in the editor options.'
    },
    table: {
      title: 'Insert Table',
      rows: 'Rows:',
      cols: 'Columns:',
      includeHeader: 'Include header',
      headerPrefix: 'Header {n}'
    },
    kbd: { title: 'Keyboard Key', key: 'Key:' },
    abbr: { title: 'Abbreviation', abbr: 'Abbreviation:', meaning: 'Full meaning:' },
    defList: {
      title: 'Definition List',
      count: 'Number of items:',
      term: 'Term {n}',
      def: 'Definition {n}'
    },
    video: {
      title: 'Insert Video',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Remote',
      localPath: 'File path:',
      localPathPlaceholder: 'videos/my-video.mp4',
      remoteUrl: 'URL (YouTube, Vimeo, or direct):',
      remoteUrlPlaceholder: 'https://www.youtube.com/watch?v=...'
    },
    audio: {
      title: 'Insert Audio',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Remote',
      localPath: 'File path:',
      localPathPlaceholder: 'audio/song.mp3',
      remoteUrl: 'Audio URL:',
      remoteUrlPlaceholder: 'https://example.com/audio.mp3'
    }
  },
  insertDefaults: { inlineCode: 'code', mark: 'highlight' },
  errors: {
    mediaLibraryHttp: 'Failed to load library (HTTP {status})',
    mediaLibraryInvalid: 'Invalid response from media library'
  },
  browser: {
    noVideo: 'Your browser does not support video.',
    noAudio: 'Your browser does not support audio.'
  }
};

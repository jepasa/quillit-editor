// SPDX-License-Identifier: MIT
/**
 * @file lang/es-ES.js
 * @fileoverview Dicionário i18n es-ES do Quillit Editor.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export default {
  placeholder: {
    default: 'Escribe tu contenido...'
  },
  common: {
    close: 'Cerrar',
    cancel: 'Cancelar',
    insert: 'Insertar',
    back: 'Volver',
    loading: 'Cargando...',
    error: 'Error'
  },
  status: {
    ready: 'Listo para editar',
    code: 'Modo código HTML',
    visual: 'Modo visual',
    fullscreen: 'Modo pantalla completa activado'
  },
  unit: {
    character: { one: 'carácter', other: 'caracteres' },
    word: { one: 'palabra', other: 'palabras' }
  },
  toolbar: {
    group: { style: 'Estilo', advanced: 'Avanzado', technical: 'Técnico', lists: 'Listas', ordered: 'Numeración', align: 'Alinear', insert: 'Insertar' }
  },
  tool: {
    paragraph: 'Párrafo',
    heading1: 'Título H1',
    heading2: 'Título H2',
    heading3: 'Título H3',
    heading4: 'Título H4',
    heading5: 'Título H5',
    heading6: 'Título H6',

    bold: 'Negrita',
    italic: 'Cursiva',
    underline: 'Subrayado',
    strike: 'Tachado',
    subscript: 'Subíndice',
    superscript: 'Superíndice',
    mark: 'Resaltar',

    unorderedList: 'Lista con viñetas',
      orderedList: 'Lista ordenada',
    orderedListDecimal: 'Numeración: 1,2,3',
    orderedListDecimalLeadingZero: 'Numeración: 01,02,03',
    orderedListUpperAlpha: 'Numeración: A,B,C',
    orderedListLowerAlpha: 'Numeración: a,b,c',
    orderedListUpperRoman: 'Numeración: I,II,III',
    orderedListLowerRoman: 'Numeración: i,ii,iii',
    orderedListLowerGreek: 'Numeración: α,β,γ',
    orderedListStart: 'Definir inicio...',
    orderedListReversed: 'Alternar numeración inversa',
    orderedListItemValue: 'Definir número del ítem...',
    unorderedListDisc: 'Marcador: disc',
    unorderedListCircle: 'Marcador: circle',
    unorderedListSquare: 'Marcador: square',
    unorderedListDiamond: 'Marcador: diamond',
    indent: 'Aumentar sangría',
    outdent: 'Disminuir sangría',

    quote: 'Cita',
    codeBlock: 'Bloque de código',

    alignLeft: 'Alinear a la izquierda',
    alignCenter: 'Centrar',
    alignRight: 'Alinear a la derecha',
    alignJustify: 'Justificar',

    hr: 'Línea horizontal',

    clear: 'Limpiar formato',
    undo: 'Deshacer',
    redo: 'Rehacer',

    source: 'HTML',
    link: 'Insertar enlace',
    unlink: 'Quitar enlace',
    image: 'Insertar imagen',
    video: 'Insertar vídeo',
    audio: 'Insertar audio',
    inlineCode: 'Código en línea',
    table: 'Insertar tabla',
    kbd: 'Tecla',
    abbr: 'Abreviatura',
    defList: 'Lista de definiciones',
    foreColor: 'Color del texto',
    backColor: 'Color de fondo',
    fullscreen: 'Pantalla completa'
  },
  modal: {
    orderedListStart: { title: 'Inicio de lista numerada', label: 'Empezar en:' },
    orderedListItemValue: { title: 'Número del ítem', label: 'Definir número del ítem:' },
    foreColor: { title: 'Color del Texto', pick: 'Elige un color:' },
    backColor: { title: 'Color de Fondo', pick: 'Elige un color:' },
    link: {
      title: 'Insertar Enlace',
      url: 'URL:',
      text: 'Texto (opcional):',
      textPlaceholder: 'Texto del enlace',
      newTab: 'Abrir en una nueva pestaña'
    },
    image: {
      title: 'Insertar Imagen',
      tabRemote: '🌐 Remoto',
      tabLocal: '📁 Local',
      url: 'URL de la imagen:',
      alt: 'Texto alternativo:',
      altPlaceholder: 'Descripción de la imagen',
      width: 'Ancho máximo (px, opcional):',
      localPath: 'Ruta del archivo:',
      localPathPlaceholder: 'imagenes/mi-imagen.jpg',
      browseTitle: 'Abrir biblioteca de imágenes',
      browseChecking: '📂 Verificando...',
      browseOpen: '📂 Abrir biblioteca',
      browseUnavailable: '📂 Biblioteca no disponible',
      dirLabel: 'Directorio',
      dirNotConfigured: 'no configurado',
      statusNeedLocalDir: 'Configura <code>mediaLocalDir</code> en las opciones para habilitar la biblioteca local.',
      statusNeedEndpoint: 'Biblioteca no disponible: configura <code>mediaLibraryEndpoint</code> (o deja el endpoint junto al componente para auto-resolve).',
      statusUnavailableHint: 'Este proyecto no está sirviendo el endpoint. Aún puedes escribir la ruta manualmente.'
    },
    imageLibrary: {
      title: 'Biblioteca de Imágenes',
      close: 'Cerrar',
      directory: 'Directorio:',
      folder: 'Carpeta:',
      filterPlaceholder: 'Filtrar imágenes...',
      filterAria: 'Filtrar imágenes',
      loadingImages: 'Cargando imágenes...',
      loading: 'Cargando...',
      none: 'No se encontraron imágenes.',
      backTitle: 'Volver',
      openFolderError: 'Error al abrir carpeta: {message}',
      loadItemsError: 'Error al cargar elementos: {message}',
      notConfigured: 'Biblioteca no configurada. Configura <code>mediaLibraryEndpoint</code> y <code>mediaLocalDir</code>.'
    },
    table: {
      title: 'Insertar Tabla',
      rows: 'Filas:',
      cols: 'Columnas:',
      includeHeader: 'Incluir encabezado',
      headerPrefix: 'Encabezado {n}'
    },
    kbd: { title: 'Tecla', key: 'Tecla:' },
    abbr: { title: 'Abreviatura', abbr: 'Abreviatura:', meaning: 'Significado completo:' },
    defList: { title: 'Lista de Definiciones', count: 'Número de elementos:', term: 'Término {n}', def: 'Definición {n}' },
    video: {
      title: 'Insertar Vídeo',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Remoto',
      localPath: 'Ruta del archivo:',
      localPathPlaceholder: 'videos/mi-video.mp4',
      remoteUrl: 'URL (YouTube, Vimeo o directo):',
      remoteUrlPlaceholder: 'https://www.youtube.com/watch?v=...'
    },
    audio: {
      title: 'Insertar Audio',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Remoto',
      localPath: 'Ruta del archivo:',
      localPathPlaceholder: 'audio/cancion.mp3',
      remoteUrl: 'URL del audio:',
      remoteUrlPlaceholder: 'https://ejemplo.com/audio.mp3'
    }
  },
  insertDefaults: { inlineCode: 'code', mark: 'resaltado' },
  errors: {
    mediaLibraryHttp: 'No se pudo cargar la biblioteca (HTTP {status})',
    mediaLibraryInvalid: 'Respuesta inválida de la biblioteca de medios'
  },
  browser: {
    noVideo: 'Tu navegador no admite vídeo.',
    noAudio: 'Tu navegador no admite audio.'
  }
};

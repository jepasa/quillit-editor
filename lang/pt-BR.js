// SPDX-License-Identifier: MIT
/**
 * @file lang/pt-BR.js
 * @fileoverview Dicionário i18n pt-BR do Quillit Editor.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export default {
  placeholder: {
    default: 'Digite seu conteúdo...'
  },
  common: {
    close: 'Fechar',
    cancel: 'Cancelar',
    insert: 'Inserir',
    back: 'Voltar',
    loading: 'Carregando...',
    error: 'Erro'
  },
  status: {
    ready: 'Pronto para edição',
    code: 'Modo código HTML',
    visual: 'Modo visual',
    fullscreen: 'Modo tela cheia ativo'
  },
  unit: {
    character: { one: 'caractere', other: 'caracteres' },
    word: { one: 'palavra', other: 'palavras' }
  },
  toolbar: {
    group: {
      style: 'Estilo',
      advanced: 'Avançado',
      technical: 'Técnico',
      lists: 'Listas',
      ordered: 'Numeração',
      align: 'Alinhar',
      insert: 'Inserir'
    }
  },
  tool: {
    paragraph: 'Parágrafo',
    heading1: 'Título H1',
    heading2: 'Título H2',
    heading3: 'Título H3',
    heading4: 'Título H4',
    heading5: 'Título H5',
    heading6: 'Título H6',

    bold: 'Negrito',
    italic: 'Itálico',
    underline: 'Sublinhar',
    strike: 'Tachado',
    subscript: 'Subscrito',
    superscript: 'Sobrescrito',
    mark: 'Destacar',

    unorderedList: 'Lista',
    orderedList: 'Lista ordenada',
    orderedListDecimal: 'Numeração: 1,2,3',
    orderedListDecimalLeadingZero: 'Numeração: 01,02,03',
    orderedListUpperAlpha: 'Numeração: A,B,C',
    orderedListLowerAlpha: 'Numeração: a,b,c',
    orderedListUpperRoman: 'Numeração: I,II,III',
    orderedListLowerRoman: 'Numeração: i,ii,iii',
    orderedListLowerGreek: 'Numeração: α,β,γ',
    orderedListStart: 'Começar numeração...',
    orderedListReversed: 'Alternar numeração reversa',
    orderedListItemValue: 'Definir número do item...',
    unorderedListDisc: 'Marcador: disc',
    unorderedListCircle: 'Marcador: circle',
    unorderedListSquare: 'Marcador: square',
    unorderedListDiamond: 'Marcador: diamond',
    indent: 'Aumentar indentação',
    outdent: 'Diminuir indentação',

    quote: 'Citação',
    codeBlock: 'Bloco de código',

    alignLeft: 'Alinhar à esquerda',
    alignCenter: 'Centralizar',
    alignRight: 'Alinhar à direita',
    alignJustify: 'Justificar',

    hr: 'Linha horizontal',

    clear: 'Limpar formatação',
    undo: 'Desfazer',
    redo: 'Refazer',

    source: 'Código HTML',
    link: 'Inserir link',
    unlink: 'Remover link',
    image: 'Inserir imagem',
    video: 'Inserir vídeo',
    audio: 'Inserir áudio',
    inlineCode: 'Código inline',
    table: 'Inserir tabela',
    kbd: 'Tecla de teclado',
    abbr: 'Abreviação',
    defList: 'Lista de definição',
    foreColor: 'Cor do texto',
    backColor: 'Cor de fundo',
    fullscreen: 'Tela cheia'
  },
  modal: {
    orderedListStart: {
      title: 'Início da lista numerada',
      label: 'Começar em:'
    },
    orderedListItemValue: {
      title: 'Número do item',
      label: 'Definir número do item:'
    },
    foreColor: {
      title: 'Cor do Texto',
      pick: 'Escolha a cor:'
    },
    backColor: {
      title: 'Cor de Fundo',
      pick: 'Escolha a cor:'
    },
    link: {
      title: 'Inserir Link',
      url: 'URL:',
      text: 'Texto (opcional):',
      textPlaceholder: 'Texto do link',
      newTab: 'Abrir em nova aba'
    },
    image: {
      title: 'Inserir Imagem',
      tabRemote: '🌐 Remoto',
      tabLocal: '📁 Local',
      url: 'URL da imagem:',
      alt: 'Texto alternativo:',
      altPlaceholder: 'Descrição da imagem',
      width: 'Largura máxima (px, opcional):',
      localPath: 'Caminho do arquivo:',
      localPathPlaceholder: 'imagens/minha-imagem.jpg',
      browseTitle: 'Abrir biblioteca de imagens',
      browseChecking: '📂 Verificando...',
      browseOpen: '📂 Abrir biblioteca',
      browseUnavailable: '📂 Biblioteca indisponível',
      dirLabel: 'Diretório',
      dirNotConfigured: 'não configurado',
      statusNeedLocalDir: 'Defina <code>mediaLocalDir</code> nas opções do editor para habilitar a biblioteca local.',
      statusNeedEndpoint: 'Biblioteca indisponível: defina <code>mediaLibraryEndpoint</code> (ou mantenha o endpoint junto do componente para auto-resolve).',
      statusUnavailableHint: 'Este projeto não está servindo o endpoint da biblioteca. Você ainda pode informar o caminho manualmente.'
    },
    imageLibrary: {
      title: 'Biblioteca de Imagens',
      close: 'Fechar',
      directory: 'Diretório:',
      folder: 'Pasta:',
      filterPlaceholder: 'Filtrar imagens...',
      filterAria: 'Filtrar imagens',
      loadingImages: 'Carregando imagens...',
      loading: 'Carregando...',
      none: 'Nenhuma imagem encontrada.',
      backTitle: 'Voltar',
      openFolderError: 'Erro ao abrir pasta: {message}',
      loadItemsError: 'Erro ao carregar itens: {message}',
      notConfigured: 'Biblioteca não configurada. Defina <code>mediaLibraryEndpoint</code> e <code>mediaLocalDir</code> nas opções do editor.'
    },
    table: {
      title: 'Inserir Tabela',
      rows: 'Linhas:',
      cols: 'Colunas:',
      includeHeader: 'Incluir cabeçalho',
      headerPrefix: 'Cabeçalho {n}'
    },
    kbd: {
      title: 'Tecla de Teclado',
      key: 'Tecla:'
    },
    abbr: {
      title: 'Abreviação',
      abbr: 'Abreviação:',
      meaning: 'Significado completo:'
    },
    defList: {
      title: 'Lista de Definição',
      count: 'Número de itens:',
      term: 'Termo {n}',
      def: 'Definição {n}'
    },
    video: {
      title: 'Inserir Vídeo',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Remoto',
      localPath: 'Caminho do arquivo:',
      localPathPlaceholder: 'videos/meu-video.mp4',
      remoteUrl: 'URL (YouTube, Vimeo ou direto):',
      remoteUrlPlaceholder: 'https://www.youtube.com/watch?v=...'
    },
    audio: {
      title: 'Inserir Áudio',
      tabLocal: '📁 Local',
      tabRemote: '🌐 Remoto',
      localPath: 'Caminho do arquivo:',
      localPathPlaceholder: 'audio/musica.mp3',
      remoteUrl: 'URL do áudio:',
      remoteUrlPlaceholder: 'https://exemplo.com/audio.mp3'
    }
  },
  insertDefaults: {
    inlineCode: 'code',
    mark: 'destaque'
  },
  errors: {
    mediaLibraryHttp: 'Falha ao carregar biblioteca (HTTP {status})',
    mediaLibraryInvalid: 'Resposta inválida da biblioteca de mídia'
  },
  browser: {
    noVideo: 'Seu navegador não suporta vídeos.',
    noAudio: 'Seu navegador não suporta áudio.'
  }
};

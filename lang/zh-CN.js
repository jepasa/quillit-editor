// SPDX-License-Identifier: MIT
/**
 * @file lang/zh-CN.js
 * @fileoverview Dicionário i18n zh-CN do Quillit Editor.
 * @author Jeferson Paidilha (https://jepasa.com)
 * @license MIT
 * @see ../LICENSE
 */

export default {
  placeholder: {
    default: '请输入内容…'
  },
  common: {
    close: '关闭',
    cancel: '取消',
    insert: '插入',
    back: '返回',
    loading: '加载中…',
    error: '错误'
  },
  status: {
    ready: '准备就绪',
    code: 'HTML 代码模式',
    visual: '可视化模式',
    fullscreen: '已开启全屏模式'
  },
  unit: {
    character: { one: '字符', other: '字符' },
    word: { one: '词', other: '词' }
  },
  toolbar: {
    group: { style: '样式', advanced: '高级', technical: '技术', lists: '列表', ordered: '编号', align: '对齐', insert: '插入' }
  },
  tool: {
    paragraph: '段落',
    heading1: '标题 H1',
    heading2: '标题 H2',
    heading3: '标题 H3',
    heading4: '标题 H4',
    heading5: '标题 H5',
    heading6: '标题 H6',

    bold: '加粗',
    italic: '斜体',
    underline: '下划线',
    strike: '删除线',
    subscript: '下标',
    superscript: '上标',
    mark: '高亮',

    unorderedList: '项目符号列表',
    orderedList: '有序列表',
    orderedListDecimal: '编号：1,2,3',
    orderedListDecimalLeadingZero: '编号：01,02,03',
    orderedListUpperAlpha: '编号：A,B,C',
    orderedListLowerAlpha: '编号：a,b,c',
    orderedListUpperRoman: '编号：I,II,III',
    orderedListLowerRoman: '编号：i,ii,iii',
    orderedListLowerGreek: '编号：α,β,γ',
    orderedListStart: '设置起始编号…',
    orderedListReversed: '切换倒序编号',
    orderedListItemValue: '设置条目编号…',
    unorderedListDisc: '项目符号：disc',
    unorderedListCircle: '项目符号：circle',
    unorderedListSquare: '项目符号：square',
    unorderedListDiamond: '项目符号：diamond',
    indent: '增加缩进',
    outdent: '减少缩进',

    quote: '引用',
    codeBlock: '代码块',

    alignLeft: '左对齐',
    alignCenter: '居中',
    alignRight: '右对齐',
    alignJustify: '两端对齐',

    hr: '水平线',

    clear: '清除格式',
    undo: '撤销',
    redo: '重做',

    source: 'HTML',
    link: '插入链接',
    unlink: '移除链接',
    image: '插入图片',
    video: '插入视频',
    audio: '插入音频',
    inlineCode: '行内代码',
    table: '插入表格',
    kbd: '键盘按键',
    abbr: '缩写',
    defList: '定义列表',
    foreColor: '文字颜色',
    backColor: '背景颜色',
    fullscreen: '全屏'
  },
  modal: {
    orderedListStart: { title: '编号列表起始值', label: '从…开始：' },
    orderedListItemValue: { title: '条目编号', label: '设置条目编号：' },
    foreColor: { title: '文字颜色', pick: '选择颜色：' },
    backColor: { title: '背景颜色', pick: '选择颜色：' },
    link: {
      title: '插入链接',
      url: 'URL：',
      text: '文本（可选）：',
      textPlaceholder: '链接文本',
      newTab: '在新标签页打开'
    },
    image: {
      title: '插入图片',
      tabRemote: '🌐 远程',
      tabLocal: '📁 本地',
      url: '图片 URL：',
      alt: '替代文本：',
      altPlaceholder: '图片描述',
      width: '最大宽度（px，可选）：',
      localPath: '文件路径：',
      localPathPlaceholder: 'images/my-image.jpg',
      browseTitle: '打开图片库',
      browseChecking: '📂 检查中…',
      browseOpen: '📂 打开图片库',
      browseUnavailable: '📂 图片库不可用',
      dirLabel: '目录',
      dirNotConfigured: '未配置',
      statusNeedLocalDir: '请在编辑器选项中设置 <code>mediaLocalDir</code> 以启用本地库。',
      statusNeedEndpoint: '图片库不可用：请设置 <code>mediaLibraryEndpoint</code>（或保留组件自带 endpoint 以自动解析）。',
      statusUnavailableHint: '当前项目未提供图片库 endpoint。你仍可手动输入路径。'
    },
    imageLibrary: {
      title: '图片库',
      close: '关闭',
      directory: '目录：',
      folder: '文件夹：',
      filterPlaceholder: '筛选图片…',
      filterAria: '筛选图片',
      loadingImages: '正在加载图片…',
      loading: '加载中…',
      none: '未找到图片。',
      backTitle: '返回',
      openFolderError: '打开文件夹失败：{message}',
      loadItemsError: '加载项目失败：{message}',
      notConfigured: '图片库未配置。请设置 <code>mediaLibraryEndpoint</code> 和 <code>mediaLocalDir</code>。'
    },
    table: {
      title: '插入表格',
      rows: '行：',
      cols: '列：',
      includeHeader: '包含表头',
      headerPrefix: '表头 {n}'
    },
    kbd: { title: '键盘按键', key: '按键：' },
    abbr: { title: '缩写', abbr: '缩写：', meaning: '完整含义：' },
    defList: { title: '定义列表', count: '项目数量：', term: '术语 {n}', def: '定义 {n}' },
    video: {
      title: '插入视频',
      tabLocal: '📁 本地',
      tabRemote: '🌐 远程',
      localPath: '文件路径：',
      localPathPlaceholder: 'videos/my-video.mp4',
      remoteUrl: 'URL（YouTube、Vimeo 或直链）：',
      remoteUrlPlaceholder: 'https://www.youtube.com/watch?v=...'
    },
    audio: {
      title: '插入音频',
      tabLocal: '📁 本地',
      tabRemote: '🌐 远程',
      localPath: '文件路径：',
      localPathPlaceholder: 'audio/song.mp3',
      remoteUrl: '音频 URL：',
      remoteUrlPlaceholder: 'https://example.com/audio.mp3'
    }
  },
  insertDefaults: { inlineCode: 'code', mark: '高亮' },
  errors: {
    mediaLibraryHttp: '加载媒体库失败（HTTP {status}）',
    mediaLibraryInvalid: '媒体库返回无效响应'
  },
  browser: {
    noVideo: '当前浏览器不支持视频。',
    noAudio: '当前浏览器不支持音频。'
  }
};

# Toolbar (IDs, dropdowns e fallback)

## Conceito

A toolbar do Quillit é descrita por um array. Cada item pode ser:

- `"separator"`: quebra visual entre grupos
- `"bold"`, `"italic"`, etc: ID de ferramenta
- Objeto `{ type: 'dropdown', ... }`: grupo com menu dropdown

## Fallback seguro (IDs inexistentes)

- IDs desconhecidos **são ignorados silenciosamente**.
- Isso vale tanto para itens diretos da toolbar quanto para itens dentro de dropdown.

Exemplo:

```js
initQuillit('#editor', {
  toolbar: [
    'bold',
    'toolQueNaoExiste', // ignorado
    { type: 'dropdown', label: 'Inserir', items: ['link', 'image', 'naoExisteTambem'] },
    'separator',
    'undo'
  ]
});
```

## Dropdowns

Formato:

```js
{ 
  type: 'dropdown',
  icon: '+',
  label: 'Inserir',
  // opcional, recomendado: permite traduzir automaticamente
  labelKey: 'toolbar.group.insert',
  items: ['link', 'image', 'video']
}
```

### “Faça o mesmo com toolbar” (default + i18n)

- Se você **não** passar `toolbar` nas opções, o Quillit usa a toolbar padrão interna.
- Labels de ferramentas (`tool.*`) e labels de dropdown (`labelKey`) são traduzidos via i18n.

Observação: a toolbar padrão inclui um dropdown de **Listas** (`toolbar.group.lists`) com `unorderedList` e `defList`.

Também existe um dropdown de **Numeração** (`toolbar.group.ordered`) com o botão de lista ordenada (`orderedList`), estilos úteis (1/01/A/a/I/i/α) e controles extras:

- `orderedListStart` (atributo `start` no `<ol>`)
- `orderedListReversed` (atributo `reversed` no `<ol>`)
- `orderedListItemValue` (atributo `value` no `<li>` atual)

## Dicas

- Para criar um dropdown customizado traduzível, defina `labelKey` e crie a chave no seu dicionário (ou use uma já existente).
- Para esconder ferramentas em um perfil, use `enabledTools`.

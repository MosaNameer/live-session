<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

// Registering unique user id
const userId = useCookie('userId')
userId.value = userId.value || uuidv4()


const monaco = useMonaco()
monaco.editor.defineTheme("custom-theme", {
  "base": "vs-dark",
  "inherit": true,
  "rules": [
    {
      "background": "190f1f",
      "token": ""
    },
    {
      "foreground": "7285b7",
      "token": "comment"
    },
    {
      "foreground": "ffffff",
      "token": "keyword.operator.class"
    },
    {
      "foreground": "ffffff",
      "token": "keyword.operator"
    },
    {
      "foreground": "ffffff",
      "token": "constant.other"
    },
    {
      "foreground": "ffffff",
      "token": "source.php.embedded.line"
    },
    {
      "foreground": "ff9da4",
      "token": "variable"
    },
    {
      "foreground": "ff9da4",
      "token": "support.other.variable"
    },
    {
      "foreground": "ff9da4",
      "token": "string.other.link"
    },
    {
      "foreground": "ff9da4",
      "token": "string.regexp"
    },
    {
      "foreground": "ff9da4",
      "token": "entity.name.tag"
    },
    {
      "foreground": "ff9da4",
      "token": "entity.other.attribute-name"
    },
    {
      "foreground": "ff9da4",
      "token": "meta.tag"
    },
    {
      "foreground": "ff9da4",
      "token": "declaration.tag"
    },
    {
      "foreground": "ff9da4",
      "token": "markup.deleted.git_gutter"
    },
    {
      "foreground": "ffc58f",
      "token": "constant.numeric"
    },
    {
      "foreground": "ffc58f",
      "token": "constant.language"
    },
    {
      "foreground": "ffc58f",
      "token": "support.constant"
    },
    {
      "foreground": "ffc58f",
      "token": "constant.character"
    },
    {
      "foreground": "ffc58f",
      "token": "variable.parameter"
    },
    {
      "foreground": "ffc58f",
      "token": "punctuation.section.embedded"
    },
    {
      "foreground": "ffc58f",
      "token": "keyword.other.unit"
    },
    {
      "foreground": "ffeead",
      "token": "entity.name.class"
    },
    {
      "foreground": "ffeead",
      "token": "entity.name.type.class"
    },
    {
      "foreground": "ffeead",
      "token": "support.type"
    },
    {
      "foreground": "ffeead",
      "token": "support.class"
    },
    {
      "foreground": "d1f1a9",
      "token": "string"
    },
    {
      "foreground": "d1f1a9",
      "token": "constant.other.symbol"
    },
    {
      "foreground": "d1f1a9",
      "token": "entity.other.inherited-class"
    },
    {
      "foreground": "d1f1a9",
      "token": "markup.heading"
    },
    {
      "foreground": "d1f1a9",
      "token": "markup.inserted.git_gutter"
    },
    {
      "foreground": "99ffff",
      "token": "keyword.operator"
    },
    {
      "foreground": "99ffff",
      "token": "constant.other.color"
    },
    {
      "foreground": "bbdaff",
      "token": "entity.name.function"
    },
    {
      "foreground": "bbdaff",
      "token": "meta.function-call"
    },
    {
      "foreground": "bbdaff",
      "token": "support.function"
    },
    {
      "foreground": "bbdaff",
      "token": "keyword.other.special-method"
    },
    {
      "foreground": "bbdaff",
      "token": "meta.block-level"
    },
    {
      "foreground": "bbdaff",
      "token": "markup.changed.git_gutter"
    },
    {
      "foreground": "ebbbff",
      "token": "keyword"
    },
    {
      "foreground": "ebbbff",
      "token": "storage"
    },
    {
      "foreground": "ebbbff",
      "token": "storage.type"
    },
    {
      "foreground": "ebbbff",
      "token": "entity.name.tag.css"
    },
    {
      "foreground": "ffffff",
      "background": "f99da5",
      "token": "invalid"
    },
    {
      "foreground": "ffffff",
      "background": "bbdafe",
      "token": "meta.separator"
    },
    {
      "foreground": "ffffff",
      "background": "ebbbff",
      "token": "invalid.deprecated"
    },
    {
      "foreground": "ffffff",
      "token": "markup.inserted.diff"
    },
    {
      "foreground": "ffffff",
      "token": "markup.deleted.diff"
    },
    {
      "foreground": "ffffff",
      "token": "meta.diff.header.to-file"
    },
    {
      "foreground": "ffffff",
      "token": "meta.diff.header.from-file"
    },
    {
      "foreground": "718c00",
      "token": "markup.inserted.diff"
    },
    {
      "foreground": "718c00",
      "token": "meta.diff.header.to-file"
    },
    {
      "foreground": "c82829",
      "token": "markup.deleted.diff"
    },
    {
      "foreground": "c82829",
      "token": "meta.diff.header.from-file"
    },
    {
      "foreground": "ffffff",
      "background": "4271ae",
      "token": "meta.diff.header.from-file"
    },
    {
      "foreground": "ffffff",
      "background": "4271ae",
      "token": "meta.diff.header.to-file"
    },
    {
      "foreground": "3e999f",
      "fontStyle": "italic",
      "token": "meta.diff.range"
    }
  ],
  "colors": {
    "editor.foreground": "#FFFFFF",
    "editor.background": "#0E0E0E",
    "editor.selectionBackground": "#1E1D24",
    "editor.lineHighlightBackground": "#1E1D24",
    "editorCursor.foreground": "#FFFFFF",
    "editorWhitespace.foreground": "#404F7D"
  }
})
monaco.editor.setTheme("custom-theme")

</script>


<style lang="scss">

body {
  background: #1E1D24;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  /* filter: blur(0.5rem); */
  transform: translateY(-50px);
}


.nuxt-content  ul {list-style: none}
.nuxt-content  ul li::before {content: "-"; color: rgb(175, 175, 175);
  display: inline-block; width: 1em;
  margin-left: -1em}

.nuxt-content ol {list-style: none; counter-reset: list-item}
.nuxt-content ol li::before {content: counter(list-item) '.'; color: rgb(175, 175, 175);
  display: inline-block; width: 1em;
  margin-left: -1em}

.nuxt-content code {
    color:#292929;
    background-color: rgb(175, 175, 175);
    border-radius: 5px;
    padding: 0 5px;
    /* font-size: 0.8rem; */
}
  

  /*! Firefox */    
html{
    scrollbar-color: #292929 rgb(65, 65, 65);
    scrollbar-width: 11px;
}

/*! Other Browser */
html {
  --scrollbarBG: #292929;
  --thumbBG: rgb(65, 65, 65);
}
*::-webkit-scrollbar {
  width: 11px;
}
* {
  scrollbar-width: thin;
  scrollbar-color: #292929;
}
*::-webkit-scrollbar-track {
  background: rgb(65, 65, 65);

}
*::-webkit-scrollbar-thumb {
  background-color: #292929;
  border: 3px solid rgb(65, 65, 65);
}

.nuxt-content {

  h1, h2, h3, h4, h5, h6 { 
    color:white;
  }
  span, p {
    color:#cecece;
  }
  table {
    color:#cecece;
    border-collapse: collapse;
    margin-bottom: 10px;
    width: 100%;
    table-layout: fixed;
  }

  table caption {
    text-align: left;
  }

  td,
  th {
    padding: 6px;
    text-align: left;
    vertical-align: top;
    word-wrap: break-word;
  }

  thead {
    border-bottom: 1px solid #dbdbdb;
  }


  tfoot {
    border-top: 1px solid #dbdbdb;
  }


  tbody tr:nth-child(even) {
    background-color: #1f1f1f;
  }


  tbody tr:nth-child(even) button {
    background-color: #1f1f1f;
  }


  tbody tr:nth-child(even) button:hover {
    background-color: #1f1f1f;
  }

  code {
    background: #1f1f1f;
    color: rgb(163, 163, 163);
    padding: 2.5px 5px;
    border-radius: 6px;
    font-size: 1em;
  }

  a > code,
  a > strong {
    color: inherit;
  }

  pre > code {
    padding: 10px;
    display: block;
    overflow-x: auto;
  }

  a {
    text-decoration: none;
    color: #3f5a70;
  }

  blockquote {
    border-left: 4px solid #1f1f1f;
    margin: 1.5em 0;
    padding: 0.5em 1em;
    font-style: italic;
  }
  blockquote > footer {
    font-style: normal;
    border: 0;
  }

  blockquote cite {
    font-style: normal;
  }
  details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color:#8d8d8d;
    background-color: #313131;
    padding: 10px 10px 0;
    margin: 1em 0;
    border-radius: 6px;
    overflow: hidden;
  }


  details[open] {
    padding: 10px;
  }

  details > :last-child {
    margin-bottom: 0;
  }

  details[open] summary {
    margin-bottom: 10px;
  }
  summary {
    display: list-item;
    background-color: #8d8d8d;
    color:#313131;
    padding: 10px;
    margin: -10px -10px 0;
    cursor: pointer;
    outline: none;
  }

  summary:hover{
    text-decoration: underline;
  }

  details > :not(summary) {
    margin-top: 0;
  }

  summary::-webkit-details-marker {
    color: #363636;
  }

  hr {
    border: none;
    border-top: 1px solid #dbdbdb;
  }

}
</style>
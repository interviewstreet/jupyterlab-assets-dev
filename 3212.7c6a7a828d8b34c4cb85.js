"use strict";(self["webpackChunk_jupyterlab_application_top"]=self["webpackChunk_jupyterlab_application_top"]||[]).push([[3212],{43212:s=>{s.exports=JSON.parse('{"name":"mermaid","version":"10.7.0","description":"Markdown-ish syntax for generating flowcharts, sequence diagrams, class diagrams, gantt charts and git graphs.","type":"module","module":"./dist/mermaid.core.mjs","types":"./dist/mermaid.d.ts","exports":{".":{"types":"./dist/mermaid.d.ts","import":"./dist/mermaid.core.mjs","default":"./dist/mermaid.core.mjs"},"./*":"./*"},"keywords":["diagram","markdown","flowchart","sequence diagram","gantt","class diagram","git graph"],"repository":{"type":"git","url":"https://github.com/mermaid-js/mermaid"},"author":"Knut Sveidqvist","license":"MIT","standard":{"ignore":["**/parser/*.js","dist/**/*.js","cypress/**/*.js"],"globals":["page"]},"dependencies":{"@braintree/sanitize-url":"^6.0.1","@types/d3-scale":"^4.0.3","@types/d3-scale-chromatic":"^3.0.0","cytoscape":"^3.23.0","cytoscape-cose-bilkent":"^4.1.0","cytoscape-fcose":"^2.1.0","d3":"^7.4.0","d3-sankey":"^0.12.3","dagre-d3-es":"7.0.10","dayjs":"^1.11.7","dompurify":"^3.0.5","elkjs":"^0.9.0","khroma":"^2.0.0","lodash-es":"^4.17.21","mdast-util-from-markdown":"^1.3.0","non-layered-tidy-tree-layout":"^2.0.2","stylis":"^4.1.3","ts-dedent":"^2.2.0","uuid":"^9.0.0","web-worker":"^1.2.0"},"devDependencies":{"@adobe/jsonschema2md":"^7.1.4","@types/cytoscape":"^3.19.9","@types/d3":"^7.4.0","@types/d3-sankey":"^0.12.1","@types/d3-scale":"^4.0.3","@types/d3-selection":"^3.0.5","@types/d3-shape":"^3.1.1","@types/dompurify":"^3.0.2","@types/jsdom":"^21.1.1","@types/lodash-es":"^4.17.7","@types/micromatch":"^4.0.2","@types/prettier":"^2.7.2","@types/stylis":"^4.0.2","@types/uuid":"^9.0.1","@typescript-eslint/eslint-plugin":"^5.59.0","@typescript-eslint/parser":"^5.59.0","ajv":"^8.11.2","chokidar":"^3.5.3","concurrently":"^8.0.1","cpy-cli":"^4.2.0","cspell":"^6.31.1","csstree-validator":"^3.0.0","globby":"^13.1.4","jison":"^0.4.18","js-base64":"^3.7.5","jsdom":"^22.0.0","json-schema-to-typescript":"^11.0.3","micromatch":"^4.0.5","path-browserify":"^1.0.1","prettier":"^2.8.8","remark":"^14.0.2","remark-frontmatter":"^4.0.1","remark-gfm":"^3.0.1","rimraf":"^5.0.0","start-server-and-test":"^2.0.0","type-fest":"^4.1.0","typedoc":"^0.25.0","typedoc-plugin-markdown":"^3.15.2","typescript":"^5.0.4","unist-util-flatmap":"^1.0.0","unist-util-visit":"^4.1.2","vitepress":"^1.0.0-alpha.72","vitepress-plugin-search":"^1.0.4-alpha.20"},"files":["dist/","README.md"],"sideEffects":false,"publishConfig":{"access":"public"},"scripts":{"clean":"rimraf dist","dev":"pnpm -w dev","docs:code":"typedoc src/defaultConfig.ts src/config.ts src/mermaidAPI.ts && prettier --write ./src/docs/config/setup","docs:build":"rimraf ../../docs && pnpm docs:spellcheck && pnpm docs:code && tsx scripts/docs.cli.mts","docs:verify":"pnpm docs:spellcheck && pnpm docs:code && tsx scripts/docs.cli.mts --verify","docs:pre:vitepress":"pnpm --filter ./src/docs prefetch && rimraf src/vitepress && pnpm docs:code && tsx scripts/docs.cli.mts --vitepress && pnpm --filter ./src/vitepress install --no-frozen-lockfile --ignore-scripts","docs:build:vitepress":"pnpm docs:pre:vitepress && (cd src/vitepress && pnpm run build) && cpy --flat src/docs/landing/ ./src/vitepress/.vitepress/dist/landing","docs:dev":"pnpm docs:pre:vitepress && concurrently \\"pnpm --filter ./src/vitepress dev\\" \\"tsx scripts/docs.cli.mts --watch --vitepress\\"","docs:dev:docker":"pnpm docs:pre:vitepress && concurrently \\"pnpm --filter ./src/vitepress dev:docker\\" \\"tsx scripts/docs.cli.mts --watch --vitepress\\"","docs:serve":"pnpm docs:build:vitepress && vitepress serve src/vitepress","docs:spellcheck":"cspell --config ../../cSpell.json \\"src/docs/**/*.md\\"","docs:release-version":"tsx scripts/update-release-version.mts","docs:verify-version":"tsx scripts/update-release-version.mts --verify","types:build-config":"tsx scripts/create-types-from-json-schema.mts","types:verify-config":"tsx scripts/create-types-from-json-schema.mts --verify","checkCircle":"npx madge --circular ./src","release":"pnpm build"}}')}}]);
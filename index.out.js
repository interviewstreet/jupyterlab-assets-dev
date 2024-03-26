// This file is auto-generated from the corresponding file in /dev_mode
/*
 * Copyright (c) Jupyter Development Team.
 * Distributed under the terms of the Modified BSD License.
 */

import { PageConfig } from '@jupyterlab/coreutils';

import './style.js';

async function createModule(scope, module) {
  try {
    const factory = await window._JUPYTERLAB[scope].get(module);
    const instance = factory();
    instance.__scope__ = scope;
    return instance;
  } catch(e) {
    console.warn(`Failed to create module: package: ${scope}; module: ${module}`);
    throw e;
  }
}

/**
 * The main entry point for the application.
 */
export async function main() {

   // Handle a browser test.
   // Set up error handling prior to loading extensions.
   var browserTest = PageConfig.getOption('browserTest');
   if (browserTest.toLowerCase() === 'true') {
     var el = document.createElement('div');
     el.id = 'browserTest';
     document.body.appendChild(el);
     el.textContent = '[]';
     el.style.display = 'none';
     var errors = [];
     var reported = false;
     var timeout = 25000;

     var report = function() {
       if (reported) {
         return;
       }
       reported = true;
       el.className = 'completed';
     }

     window.onerror = function(msg, url, line, col, error) {
       errors.push(String(error));
       el.textContent = JSON.stringify(errors)
     };
     console.error = function(message) {
       errors.push(String(message));
       el.textContent = JSON.stringify(errors)
     };
  }

  var JupyterLab = require('@jupyterlab/application').JupyterLab;
  var disabled = [];
  var deferred = [];
  var ignorePlugins = [];
  var register = [];


  const federatedExtensionPromises = [];
  const federatedMimeExtensionPromises = [];
  const federatedStylePromises = [];

  // Start initializing the federated extensions
  const extensions = JSON.parse(
    PageConfig.getOption('federated_extensions')
  );

  const queuedFederated = [];

  extensions.forEach(data => {
    if (data.extension) {
      queuedFederated.push(data.name);
      federatedExtensionPromises.push(createModule(data.name, data.extension));
    }
    if (data.mimeExtension) {
      queuedFederated.push(data.name);
      federatedMimeExtensionPromises.push(createModule(data.name, data.mimeExtension));
    }

    if (data.style && !PageConfig.Extension.isDisabled(data.name)) {
      federatedStylePromises.push(createModule(data.name, data.style));
    }
  });

  const allPlugins = [];

  /**
   * Iterate over active plugins in an extension.
   *
   * #### Notes
   * This also populates the disabled, deferred, and ignored arrays.
   */
  function* activePlugins(extension) {
    // Handle commonjs or es2015 modules
    let exports;
    if (extension.hasOwnProperty('__esModule')) {
      exports = extension.default;
    } else {
      // CommonJS exports.
      exports = extension;
    }

    let plugins = Array.isArray(exports) ? exports : [exports];
    for (let plugin of plugins) {
      const isDisabled = PageConfig.Extension.isDisabled(plugin.id);
      allPlugins.push({
        id: plugin.id,
        description: plugin.description,
        requires: plugin.requires ?? [],
        optional: plugin.optional ?? [],
        provides: plugin.provides ?? null,
        autoStart: plugin.autoStart,
        enabled: !isDisabled,
        extension: extension.__scope__
      });
      if (isDisabled) {
        disabled.push(plugin.id);
        continue;
      }
      if (PageConfig.Extension.isDeferred(plugin.id)) {
        deferred.push(plugin.id);
        ignorePlugins.push(plugin.id);
      }
      yield plugin;
    }
  }

  // Handle the registered mime extensions.
  const mimeExtensions = [];
  if (!queuedFederated.includes('@jupyterlab/javascript-extension')) {
    try {
      let ext = require('@jupyterlab/javascript-extension');
      ext.__scope__ = '@jupyterlab/javascript-extension';
      for (let plugin of activePlugins(ext)) {
        mimeExtensions.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/json-extension')) {
    try {
      let ext = require('@jupyterlab/json-extension');
      ext.__scope__ = '@jupyterlab/json-extension';
      for (let plugin of activePlugins(ext)) {
        mimeExtensions.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/mermaid-extension')) {
    try {
      let ext = require('@jupyterlab/mermaid-extension/lib/mime.js');
      ext.__scope__ = '@jupyterlab/mermaid-extension';
      for (let plugin of activePlugins(ext)) {
        mimeExtensions.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/pdf-extension')) {
    try {
      let ext = require('@jupyterlab/pdf-extension');
      ext.__scope__ = '@jupyterlab/pdf-extension';
      for (let plugin of activePlugins(ext)) {
        mimeExtensions.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/vega5-extension')) {
    try {
      let ext = require('@jupyterlab/vega5-extension');
      ext.__scope__ = '@jupyterlab/vega5-extension';
      for (let plugin of activePlugins(ext)) {
        mimeExtensions.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Add the federated mime extensions.
  const federatedMimeExtensions = await Promise.allSettled(federatedMimeExtensionPromises);
  federatedMimeExtensions.forEach(p => {
    if (p.status === "fulfilled") {
      for (let plugin of activePlugins(p.value)) {
        mimeExtensions.push(plugin);
      }
    } else {
      console.error(p.reason);
    }
  });

  // Handled the registered standard extensions.
  if (!queuedFederated.includes('@jupyterlab/application-extension')) {
    try {
      let ext = require('@jupyterlab/application-extension');
      ext.__scope__ = '@jupyterlab/application-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/apputils-extension')) {
    try {
      let ext = require('@jupyterlab/apputils-extension');
      ext.__scope__ = '@jupyterlab/apputils-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/cell-toolbar-extension')) {
    try {
      let ext = require('@jupyterlab/cell-toolbar-extension');
      ext.__scope__ = '@jupyterlab/cell-toolbar-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/celltags-extension')) {
    try {
      let ext = require('@jupyterlab/celltags-extension');
      ext.__scope__ = '@jupyterlab/celltags-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/codemirror-extension')) {
    try {
      let ext = require('@jupyterlab/codemirror-extension');
      ext.__scope__ = '@jupyterlab/codemirror-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/completer-extension')) {
    try {
      let ext = require('@jupyterlab/completer-extension');
      ext.__scope__ = '@jupyterlab/completer-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/console-extension')) {
    try {
      let ext = require('@jupyterlab/console-extension');
      ext.__scope__ = '@jupyterlab/console-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/csvviewer-extension')) {
    try {
      let ext = require('@jupyterlab/csvviewer-extension');
      ext.__scope__ = '@jupyterlab/csvviewer-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/debugger-extension')) {
    try {
      let ext = require('@jupyterlab/debugger-extension');
      ext.__scope__ = '@jupyterlab/debugger-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/docmanager-extension')) {
    try {
      let ext = require('@jupyterlab/docmanager-extension');
      ext.__scope__ = '@jupyterlab/docmanager-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/documentsearch-extension')) {
    try {
      let ext = require('@jupyterlab/documentsearch-extension');
      ext.__scope__ = '@jupyterlab/documentsearch-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/extensionmanager-extension')) {
    try {
      let ext = require('@jupyterlab/extensionmanager-extension');
      ext.__scope__ = '@jupyterlab/extensionmanager-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/filebrowser-extension')) {
    try {
      let ext = require('@jupyterlab/filebrowser-extension');
      ext.__scope__ = '@jupyterlab/filebrowser-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/fileeditor-extension')) {
    try {
      let ext = require('@jupyterlab/fileeditor-extension');
      ext.__scope__ = '@jupyterlab/fileeditor-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@hackerrank/jupyterlab-collab-extension')) {
    try {
      let ext = require('@hackerrank/jupyterlab-collab-extension');
      ext.__scope__ = '@hackerrank/jupyterlab-collab-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@hackerrank/theme-dark-extension')) {
    try {
      let ext = require('@hackerrank/theme-dark-extension');
      ext.__scope__ = '@hackerrank/theme-dark-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@hrds/theme-dark-extension')) {
    try {
      let ext = require('@hrds/theme-dark-extension');
      ext.__scope__ = '@hrds/theme-dark-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@hrds/theme-light-extension')) {
    try {
      let ext = require('@hrds/theme-light-extension');
      ext.__scope__ = '@hrds/theme-light-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@hackerrank/user-activity-extension')) {
    try {
      let ext = require('@hackerrank/user-activity-extension');
      ext.__scope__ = '@hackerrank/user-activity-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@hackerrank/open-preview-extension')) {
    try {
      let ext = require('@hackerrank/open-preview-extension');
      ext.__scope__ = '@hackerrank/open-preview-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/help-extension')) {
    try {
      let ext = require('@jupyterlab/help-extension');
      ext.__scope__ = '@jupyterlab/help-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/htmlviewer-extension')) {
    try {
      let ext = require('@jupyterlab/htmlviewer-extension');
      ext.__scope__ = '@jupyterlab/htmlviewer-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/hub-extension')) {
    try {
      let ext = require('@jupyterlab/hub-extension');
      ext.__scope__ = '@jupyterlab/hub-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/imageviewer-extension')) {
    try {
      let ext = require('@jupyterlab/imageviewer-extension');
      ext.__scope__ = '@jupyterlab/imageviewer-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/inspector-extension')) {
    try {
      let ext = require('@jupyterlab/inspector-extension');
      ext.__scope__ = '@jupyterlab/inspector-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/launcher-extension')) {
    try {
      let ext = require('@jupyterlab/launcher-extension');
      ext.__scope__ = '@jupyterlab/launcher-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/logconsole-extension')) {
    try {
      let ext = require('@jupyterlab/logconsole-extension');
      ext.__scope__ = '@jupyterlab/logconsole-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/lsp-extension')) {
    try {
      let ext = require('@jupyterlab/lsp-extension');
      ext.__scope__ = '@jupyterlab/lsp-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/mainmenu-extension')) {
    try {
      let ext = require('@jupyterlab/mainmenu-extension');
      ext.__scope__ = '@jupyterlab/mainmenu-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/markdownviewer-extension')) {
    try {
      let ext = require('@jupyterlab/markdownviewer-extension');
      ext.__scope__ = '@jupyterlab/markdownviewer-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/markedparser-extension')) {
    try {
      let ext = require('@jupyterlab/markedparser-extension');
      ext.__scope__ = '@jupyterlab/markedparser-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/mathjax-extension')) {
    try {
      let ext = require('@jupyterlab/mathjax-extension');
      ext.__scope__ = '@jupyterlab/mathjax-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/mermaid-extension')) {
    try {
      let ext = require('@jupyterlab/mermaid-extension');
      ext.__scope__ = '@jupyterlab/mermaid-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/metadataform-extension')) {
    try {
      let ext = require('@jupyterlab/metadataform-extension');
      ext.__scope__ = '@jupyterlab/metadataform-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/notebook-extension')) {
    try {
      let ext = require('@jupyterlab/notebook-extension');
      ext.__scope__ = '@jupyterlab/notebook-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/pluginmanager-extension')) {
    try {
      let ext = require('@jupyterlab/pluginmanager-extension');
      ext.__scope__ = '@jupyterlab/pluginmanager-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/rendermime-extension')) {
    try {
      let ext = require('@jupyterlab/rendermime-extension');
      ext.__scope__ = '@jupyterlab/rendermime-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/running-extension')) {
    try {
      let ext = require('@jupyterlab/running-extension');
      ext.__scope__ = '@jupyterlab/running-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/settingeditor-extension')) {
    try {
      let ext = require('@jupyterlab/settingeditor-extension');
      ext.__scope__ = '@jupyterlab/settingeditor-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/shortcuts-extension')) {
    try {
      let ext = require('@jupyterlab/shortcuts-extension');
      ext.__scope__ = '@jupyterlab/shortcuts-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/statusbar-extension')) {
    try {
      let ext = require('@jupyterlab/statusbar-extension');
      ext.__scope__ = '@jupyterlab/statusbar-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/terminal-extension')) {
    try {
      let ext = require('@jupyterlab/terminal-extension');
      ext.__scope__ = '@jupyterlab/terminal-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/theme-dark-extension')) {
    try {
      let ext = require('@jupyterlab/theme-dark-extension');
      ext.__scope__ = '@jupyterlab/theme-dark-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/theme-light-extension')) {
    try {
      let ext = require('@jupyterlab/theme-light-extension');
      ext.__scope__ = '@jupyterlab/theme-light-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/toc-extension')) {
    try {
      let ext = require('@jupyterlab/toc-extension');
      ext.__scope__ = '@jupyterlab/toc-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/tooltip-extension')) {
    try {
      let ext = require('@jupyterlab/tooltip-extension');
      ext.__scope__ = '@jupyterlab/tooltip-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/translation-extension')) {
    try {
      let ext = require('@jupyterlab/translation-extension');
      ext.__scope__ = '@jupyterlab/translation-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }
  if (!queuedFederated.includes('@jupyterlab/ui-components-extension')) {
    try {
      let ext = require('@jupyterlab/ui-components-extension');
      ext.__scope__ = '@jupyterlab/ui-components-extension';
      for (let plugin of activePlugins(ext)) {
        register.push(plugin);
      }
    } catch (e) {
      console.error(e);
    }
  }

  // Add the federated extensions.
  const federatedExtensions = await Promise.allSettled(federatedExtensionPromises);
  federatedExtensions.forEach(p => {
    if (p.status === "fulfilled") {
      for (let plugin of activePlugins(p.value)) {
        register.push(plugin);
      }
    } else {
      console.error(p.reason);
    }
  });

  // Load all federated component styles and log errors for any that do not
  (await Promise.allSettled(federatedStylePromises)).filter(({status}) => status === "rejected").forEach(({reason}) => {
    console.error(reason);
  });

  const lab = new JupyterLab({
    mimeExtensions,
    disabled: {
      matches: disabled,
      patterns: PageConfig.Extension.disabled
        .map(function (val) { return val.raw; })
    },
    deferred: {
      matches: deferred,
      patterns: PageConfig.Extension.deferred
        .map(function (val) { return val.raw; })
    },
    availablePlugins: allPlugins
  });
  register.forEach(function(item) { lab.registerPluginModule(item); });

  lab.start({ ignorePlugins, bubblingKeydown: true });

  // Expose global app instance when in dev mode or when toggled explicitly.
  var exposeAppInBrowser = (PageConfig.getOption('exposeAppInBrowser') || '').toLowerCase() === 'true';
  var devMode = (PageConfig.getOption('devMode') || '').toLowerCase() === 'true';

  if (exposeAppInBrowser || devMode) {
    window.jupyterapp = lab;
  }

  // Handle a browser test.
  if (browserTest.toLowerCase() === 'true') {
    lab.restored
      .then(function() { report(errors); })
      .catch(function(reason) { report([`RestoreError: ${reason.message}`]); });

    // Handle failures to restore after the timeout has elapsed.
    window.setTimeout(function() { report(errors); }, timeout);
  }

}

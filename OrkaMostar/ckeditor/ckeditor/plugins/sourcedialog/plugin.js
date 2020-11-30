/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.plugins.add('sourcedialog', {
    // jscs:disable maximumLineLength
    lang: 'en', // %REMOVE_LINE_CORE%
    // jscs:enable maximumLineLength
    requires: 'dialog',
    icons: 'sourcedialog,sourcedialog-rtl', // %REMOVE_LINE_CORE%
    hidpi: true, // %REMOVE_LINE_CORE%

    init: function (editor) {
        // Register the "source" command, which simply opens the "source" dialog.
        editor.addCommand('sourcedialog', new CKEDITOR.dialogCommand('sourcedialog'));

        // Register the "source" dialog.
        CKEDITOR.dialog.add('sourcedialog', this.path + 'dialogs/sourcedialog.js');

        // If the toolbar is available, create the "Source" button.
        if (editor.ui.addButton) {
            editor.ui.addButton('Sourcedialog', {
                label: editor.lang.sourcedialog.toolbar,
                command: 'sourcedialog',
                toolbar: 'mode,10'
            });
        }
    }
});
/* eslint-disable func-style, require-jsdoc */
function registerToolboxs () { return `
<category name="%{BKY_KITLIGHTGATE_CATEGORY}" id="KITLIGHTGATE_CATEGORY" colour="#0E7490" secondaryColour="#0A5468">
    <block type="kitLightGate_begin"><field name="ID">1</field></block>
    <block type="kitLightGate_active"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

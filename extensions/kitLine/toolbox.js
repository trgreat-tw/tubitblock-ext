/* eslint-disable func-style, require-jsdoc */
function registerToolboxs () { return `
<category name="%{BKY_KITLINE_CATEGORY}" id="KITLINE_CATEGORY" colour="#475569" secondaryColour="#333D4C">
    <block type="kitLine_begin"><field name="ID">1</field></block>
    <block type="kitLine_active"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

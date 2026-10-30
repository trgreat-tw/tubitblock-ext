/* eslint-disable func-style, require-jsdoc */
function registerToolboxs () { return `
<category name="%{BKY_KITSWITCH_CATEGORY}" id="KITSWITCH_CATEGORY" colour="#4D7C0F" secondaryColour="#37590B">
    <block type="kitSwitch_begin"><field name="ID">1</field></block>
    <block type="kitSwitch_active"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

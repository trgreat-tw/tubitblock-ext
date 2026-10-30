/* eslint-disable func-style, require-jsdoc */
function registerToolboxs () { return `
<category name="%{BKY_KITTOUCH_CATEGORY}" id="KITTOUCH_CATEGORY" colour="#BE185D" secondaryColour="#891143">
    <block type="kitTouch_begin"><field name="ID">1</field></block>
    <block type="kitTouch_active"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

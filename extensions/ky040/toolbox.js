/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    // Pin fields intentionally inherit the current board's defaults in blocks.js.
    return `
<category name="%{BKY_KY040_CATEGORY}" id="KY040_CATEGORY" colour="#1D4ED8" secondaryColour="#15389C">
    <block type="ky040_begin"><field name="ID">1</field></block>
    <block type="ky040_position"><field name="ID">1</field></block>
    <block type="ky040_pressed"><field name="ID">1</field></block>
    <block type="ky040_setPosition">
        <field name="ID">1</field>
        <value name="POSITION"><shadow type="math_number"><field name="NUM">0</field></shadow></value>
    </block>
</category>`;
}

exports = registerToolboxs;

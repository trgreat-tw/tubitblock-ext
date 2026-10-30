function registerToolboxs () {
    return `
<category name="%{BKY_KITRGB_CATEGORY}" id="KITRGB_CATEGORY" colour="#A21CAF" secondaryColour="#75147E">
    <block type="kitRGB_begin"></block>
    <block type="kitRGB_color"><value name="R"><shadow type="math_number"><field name="NUM">255</field></shadow></value><value name="G"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value></block>
</category>`;
}
exports = registerToolboxs;

function registerToolboxs () {
    return `
<category name="%{BKY_KITBUZZER_CATEGORY}" id="KITBUZZER_CATEGORY" colour="#6D28D9" secondaryColour="#4E1D9C">
    <block type="kitBuzzer_begin"></block>
    <block type="kitBuzzer_active"></block>
    <block type="kitBuzzer_note"><field name="OCTAVE">4</field><field name="NOTE">C</field></block>
    <block type="kitBuzzer_tone"><value name="FREQUENCY"><shadow type="math_number"><field name="NUM">440</field></shadow></value></block>
    <block type="kitBuzzer_stop"></block>
</category>`;
}
exports = registerToolboxs;

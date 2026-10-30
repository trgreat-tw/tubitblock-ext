function registerToolboxs () { return `
<category name="%{BKY_KITTEMPERATURE_CATEGORY}" id="KITTEMPERATURE_CATEGORY" colour="#B91C1C" secondaryColour="#851414">
    <block type="kitTemperature_begin"><field name="ID">1</field></block>
    <block type="kitTemperature_celsius"><field name="ID">1</field></block>
    <block type="kitTemperature_raw"><field name="ID">1</field></block>
    <block type="kitTemperature_thresholdReached"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

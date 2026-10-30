function registerToolboxs () { return `
<category name="%{BKY_KITHEARTBEAT_CATEGORY}" id="KITHEARTBEAT_CATEGORY" colour="#9F1239" secondaryColour="#720D29">
    <block type="kitHeartbeat_begin"><field name="ID">1</field></block>
    <block type="kitHeartbeat_raw"><field name="ID">1</field></block>
    <block type="kitHeartbeat_bpm"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

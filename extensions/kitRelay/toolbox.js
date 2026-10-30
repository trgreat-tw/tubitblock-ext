function registerToolboxs () {
    return `
<category name="%{BKY_KITRELAY_CATEGORY}" id="KITRELAY_CATEGORY" colour="#B45309" secondaryColour="#823C06">
    <block type="kitRelay_begin"></block>
    <block type="kitRelay_write"></block>
</category>`;
}
exports = registerToolboxs;

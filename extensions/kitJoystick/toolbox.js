/* eslint-disable func-style, require-jsdoc */
function registerToolboxs () { return `
<category name="%{BKY_KITJOYSTICK_CATEGORY}" id="KITJOYSTICK_CATEGORY" colour="#0F766E" secondaryColour="#0B554F">
    <block type="kitJoystick_begin"><field name="ID">1</field></block>
    <block type="kitJoystick_raw"><field name="ID">1</field></block>
    <block type="kitJoystick_pressed"><field name="ID">1</field></block>
</category>`; }
exports = registerToolboxs;

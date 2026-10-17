/* eslint-disable func-style */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
function registerToolboxs () {
    return `
<category name="%{BKY_L298N_CATEGORY}" id="L298N_CATEGORY" colour="#FF6F00" secondaryColour="#FF4F00">
    <block type="motor_control_init" id="motor_control_init"></block>
    <block type="motor_control_run" id="motor_control_run">
        <value name="SPEED">
            <shadow type="math_int9_number">
                <field name="NUM">255</field>
            </shadow>
        </value>
    </block>
    <block type="motor_control_stop" id="motor_control_stop"></block>
</category>`;
}

exports = registerToolboxs;

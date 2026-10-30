let sequence = 0;
class Block {
    constructor(type, fields = {}) {
        Object.assign(this, {type, fields, id: 'fixture_' + ++sequence, parent: null,
            next: null, inputs: {}, inputList: [], disabled: false, isInFlyout: false});
    }
    getFieldValue(name) { return this.fields[name] ?? null; }
    getParent() { return this.parent; }
    getNextBlock() { return this.next; }
    getRootBlock() { let b = this; while (b.parent) b = b.parent; return b; }
    getInputTargetBlock(name) { return this.inputs[name] || null; }
    getChildren() { return [...Object.values(this.inputs), ...(this.next ? [this.next] : [])]; }
    isEnabled() { return !this.disabled; }
    getInheritedDisabled() { return this.disabled || Boolean(this.parent && this.parent.getInheritedDisabled()); }
    setNext(b) { this.next = b; if (b) b.parent = this; return b; }
    setInput(name, b) {
        this.inputs[name] = b;
        if (b) b.parent = this;
        this.inputList.push({name, type: 3, connection: {targetBlock: () => this.inputs[name]}});
    }
}
function chain(...blocks) { for (let i = 1; i < blocks.length; i++) blocks[i - 1].setNext(blocks[i]); }
function scene(module, {id = '8', initId = id, position = 'startup', disabled = false, operation} = {}) {
    const hat = new Block('event_whenarduinobegin');
    const init = new Block(module + '_begin', {ID: initId}); init.disabled = disabled;
    const loop = new Block('control_forever');
    const read = new Block(operation || module + '_active', {ID: id});
    loop.setInput('SUBSTACK', read);
    if (position === 'startup') chain(hat, init, loop);
    else if (position === 'after-use') chain(hat, read, init);
    else if (position === 'nested') { chain(hat, loop); chain(init, read); loop.setInput('SUBSTACK', init); }
    else chain(hat, loop);
    const roots = position === 'detached' ? [hat, init] : [hat];
    const all = [];
    function visit(b) { if (!b || all.includes(b)) return; all.push(b); b.getChildren().forEach(visit); }
    roots.forEach(visit);
    const workspace = {getAllBlocks: () => all, getTopBlocks: () => roots};
    all.forEach(b => { b.workspace = workspace; });
    return {workspace, hat, init, loop, read};
}
module.exports = {Block, chain, scene};

// only use states for temporary storage, for other info see db
class StateMachine {
    
    constructor() {
        this.StateStorage = {};
    }

    // set a state
    setState(userId, key, value) {
        if (!this.StateStorage[userId]) this.StateStorage[userId] = {};
        this.StateStorage[userId][key] = value;
        return true;
    }

    // get a state, returns it
    getState(userId, key) {
        if (!this.StateStorage[userId]) this.StateStorage[userId] = {};
        return this.StateStorage[userId][key];
    }
    
    // clears a state
    clearState(userId, key) {
        if (!this.StateStorage[userId]) return;
        if (!this.StateStorage[userId][key]) return;
        delete this.StateStorage[userId][key];
        return true;
    }

    // clear a user's states
    clearUserStates() {
        if (!this.StateStorage[userId]) return;
        delete this.StateStorage[userId];
        return true;
    }

    // list all existing states, returns object with user states
    listUserStates(userId) {
        if (!this.StateStorage[userId]) return;
        return this.StateStorage[userId];
    }
}

// make and export instance
const INS = new StateMachine();
module.exports = INS;
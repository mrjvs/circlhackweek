async function isSignedUp(userId) {
    const foundUsers = await db.userModel.find({ userId });
    return foundUsers.length === 1;
}

function hasAdminAccess(userId) {
    const serverIp = stateMachine.getState(userId, "connectedServer");
    if (!serverIp) return false;
    const loginState = stateMachine.getState(userId, "loginState");
    return loginState && loginState.serverIp === serverIp;
}

function convertTokenToUrl(token) {
    return `http://${config.host}/${token}/`;
}

module.exports = {
    isSignedUp,
    hasAdminAccess,
    convertTokenToUrl
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const SubscriptionManager_1 = require("./SubscriptionManager");
const in_1 = require("./types/in");
class User {
    constructor(id, ws) {
        this.id = id,
            this.ws = ws;
        this.addListeners();
    }
    emit(message) {
        this.ws.send(JSON.stringify(message));
    }
    addListeners() {
        this.ws.on("message", (message) => {
            const parsedMessage = JSON.parse(message);
            if (parsedMessage.method === in_1.SUBSCRIBE) {
                parsedMessage.params.forEach(s => SubscriptionManager_1.SubscriptionManager.getInstance().subscribe(this.id, s));
            }
            if (parsedMessage.method === in_1.UNSUBSCRIBE) {
                parsedMessage.params.forEach(s => SubscriptionManager_1.SubscriptionManager.getInstance().unsubscribe(this.id, s));
            }
        });
    }
}
exports.User = User;

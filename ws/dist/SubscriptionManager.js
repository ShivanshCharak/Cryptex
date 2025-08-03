"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionManager = void 0;
const redis_1 = require("redis");
const UserManager_1 = require("./UserManager");
class SubscriptionManager {
    constructor() {
        this.subscriptions = new Map();
        this.reverseSubscription = new Map();
        this.redisCallbackHandler = (message, channel) => {
            var _a;
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);
            (_a = this.reverseSubscription.get(channel)) === null || _a === void 0 ? void 0 : _a.forEach(s => { var _a, _b; return (_b = (_a = UserManager_1.UserManager.getInstance()) === null || _a === void 0 ? void 0 : _a.getUser(s)) === null || _b === void 0 ? void 0 : _b.emit(parsedMessage); });
        };
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SubscriptionManager();
        }
        return this.instance;
    }
    subscribe(userId, subscription) {
        var _a, _b;
        if ((_a = this.subscriptions.get(userId)) === null || _a === void 0 ? void 0 : _a.includes(subscription)) {
            return;
        }
        this.subscriptions.set(userId, (this.subscriptions.get(userId) || []).concat(subscription));
        const existing = this.reverseSubscription.get(subscription) || [];
        if (!existing.includes(userId)) {
            this.reverseSubscription.set(subscription, [...existing, userId]);
        }
        if (((_b = this.reverseSubscription.get(subscription)) === null || _b === void 0 ? void 0 : _b.length) === 1) {
            this.redisClient.subscribe(subscription, this.redisCallbackHandler);
        }
    }
    unsubscribe(userId, subscription) {
        var _a;
        const subscriptions = this.subscriptions.get(userId);
        if (subscriptions) {
            this.subscriptions.set(userId, subscriptions.filter(s => s !== subscription));
        }
        const reverseSubscription = this.reverseSubscription.get(userId);
        if (reverseSubscription) {
            this.reverseSubscription.set(userId, reverseSubscription.filter(s => s !== userId));
            if (((_a = this.reverseSubscription.get(subscription)) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                this.reverseSubscription.delete(subscription);
                this.redisClient.unsubscribe(subscriptions);
            }
        }
    }
    userLeft(id) {
        var _a;
        (_a = this.subscriptions.get(id)) === null || _a === void 0 ? void 0 : _a.forEach(s => this.unsubscribe(id, s));
        console.log("after deletrion:", this.subscriptions);
    }
}
exports.SubscriptionManager = SubscriptionManager;

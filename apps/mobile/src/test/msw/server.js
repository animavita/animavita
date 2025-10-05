"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
var node_1 = require("msw/node");
var handlers_1 = require("./handlers");
exports.server = node_1.setupServer.apply(void 0, handlers_1.handlers);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GenericError = /** @class */ (function () {
    function GenericError(value, msg) {
        this.ok = false;
        this.ErrorObj = [];
        this.value = value;
        this.msg = msg;
        this.ErrorObj.push({
            ok: this.ok,
            value: this.value,
            msg: this.msg
        });
    }
    Object.defineProperty(GenericError.prototype, "ErrorObjt", {
        get: function () {
            return this.ErrorObj;
        },
        enumerable: false,
        configurable: true
    });
    return GenericError;
}());
exports.default = GenericError;
//# sourceMappingURL=error.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpRequest = void 0;
class HttpRequest {
    static async get(url, timeout = 1000 * 30) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id);
            if (response.ok) {
                const json = await response.json();
                return json;
            }
        }
        catch (error) {
            console.log(error);
        }
        return null;
    }
    static async post(url, data, timeout = 1000 * 60 * 10) {
        let signal = undefined;
        let id = undefined;
        if (timeout > 1000) {
            const controller = new AbortController();
            signal = controller.signal;
            id = setTimeout(() => {
                try {
                    controller.abort();
                }
                catch (error) {
                    console.log(error);
                }
            }, timeout);
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                signal: signal,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const json = await response.json();
                return json;
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            if (id) {
                clearTimeout(id);
            }
        }
        return null;
    }
}
exports.HttpRequest = HttpRequest;
//# sourceMappingURL=httpRequest.js.map
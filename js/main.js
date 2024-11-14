window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/sw.js").then(() => {
            console.log("Service Worker registrado com sucesso.");
        }).catch((error) => {
            console.log("Erro ao registrar o Service Worker:", error);
        });
    }
};
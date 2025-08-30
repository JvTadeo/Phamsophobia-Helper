function formatMessage(type: string, color: string, message: string) {
    const now = new Date();
    const timestamp = now.toLocaleString('pt-BR'); // DD/MM/AAAA HH:mm:ss

    // Regex para substituir tags como <b>texto</b> por negrito no console
    const formattedMessage = message
        .replace(/<b>(.*?)<\/b>/g, '\x1b[1m$1\x1b[0m') // negrito
        .replace(/<u>(.*?)<\/u>/g, '\x1b[4m$1\x1b[0m'); // sublinhado

    console.log(`${color}[${type}] ${timestamp}:\x1b[0m ${formattedMessage}`);
}

function info(message: string) {
    formatMessage("INFO", "\x1b[36m", `${message}`);
}

function success(message: string) {
    formatMessage("SUCCESS", "\x1b[32m", `${message}`);
}

function error(message: string) {
    formatMessage("ERROR", "\x1b[31m", `${message}`);
}

export  const CustomLogger = { info, success, error };
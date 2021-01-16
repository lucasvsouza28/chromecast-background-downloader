 function logTimestamp(fn, message){
    const d = new Date();
    const timestamp = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
    fn(`[${timestamp}] ${message}`);
}

module.exports = {
    log: (msg) => logTimestamp(console.log, msg),
    error: (msg) => logTimestamp(console.error, msg),
}
const fs = require('fs').promises;

module.exports = {
    async readFromFile(path) {
        const data = await fs.readFile(path, "binary");
        return data;
    },
    async saveToFile(path, data) {
        await fs.writeFile(path, data);
    }
}
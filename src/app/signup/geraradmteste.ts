const bcryptLib = require('bcrypt');

(async () => {
    const hash = await bcryptLib.hash('adm123', 10);
    console.log(hash);
})();

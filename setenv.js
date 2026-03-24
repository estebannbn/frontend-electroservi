const fs = require('fs');

// Vercel inyectará esto a través de process.env.
// Si no existe (ej. en tu entorno local), usa localhost por defecto.
const apiUrl = process.env.API_URL || 'http://localhost:3000';

const envConfigFile = `export const environment = {
  apiUrl: '${apiUrl}'
};
`;

const dir = './src/environments';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Generamos los archivos
fs.writeFileSync(dir + '/environment.ts', envConfigFile);
fs.writeFileSync(dir + '/environment.development.ts', envConfigFile);

console.log(`Archivos de environments generados. API_URL: ${apiUrl}`);

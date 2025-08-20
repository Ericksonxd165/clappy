export const venezuelanBanks = {
  "100% Banco": "0156",
  "Bancamiga": "0171",
  "Banco Activo": "0172",
  "Banco Caroní": "0128",
  "Bancaribe": "0114",
  "Banco de Venezuela": "0102",
  "Banco Exterior": "0115",
  "Banco Fondo Común": "0151",
  "Banco Mercantil": "0105",
  "Banco Nacional de Crédito": "0191",
  "Banco Plaza": "0138",
  "Banco Sofitasa": "0137",
  "Banco Venezolano de Crédito": "0104",
  "Bancrecer": "0168",
  "Banesco": "0134",
  "Banplus": "0174",
  "BBVA Provincial": "0108",
  "DELSUR Banco Universal": "0157",
  "Mi Banco": "0169",
  "Bangente": "0146",
  "Banco Bicentenario": "0175",
  "Banco del Tesoro": "0163",
  "Banco Agrícola de Venezuela": "0166",
  "BANFANB": "0177",
};

export const phoneRegex = /^04(12|14|16|24|26)\d{7}$/;
export const cedulaRegex = /^\d{7,8}$/;

export const handleNumericInput = (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
};

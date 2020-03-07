export const cepMask = value => {
  return value
    .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{5})(\d)/, '$1-$2') // separa o grupo em 2 (um de 5 e o outro de 3)
    .replace(/(-\d{3})\d+?$/, '$1'); // captura 3 numeros seguidos de um traço e não deixa ser digitado mais nada
};

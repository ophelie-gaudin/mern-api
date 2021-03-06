export const signUpErrors = (err) => {
  const errors = { pseudo: '', email: '', password: '' };

  if (err.message.includes('pseudo')) errors.pseudo = 'Pseudo incorrect ou déjà pris.';

  if (err.message.includes('email')) errors.email = 'Email incorrect ou déjà pris.';

  if (err.message.includes('password')) errors.password = 'Mot de passe de 6 caractères minimum.';

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')) errors.email = 'Cet email est déjà enregistré.';

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) errors.pseudo = 'Ce pseudo est déjà utilisé.';

  return errors;
};

export const signInErrors = (err) => {
  const errors = { email: '', password: '' };

  if (err.message.includes('email')) errors.email = 'Email inconnu';

  if (err.message.includes('password')) errors.password = 'Mot de passe invalide';

  return errors;
};

export const uploadErrors = (err) => {
  const errors = { format: '', maxSize: '' };

  if (err.message.includes('invalid format file.')) errors.format = 'Format non pris en charge.';

  if (err.message.includes('Max size exceeded.')) errors.maxSize = 'Fichier trop volumineux.';

  return errors;
};

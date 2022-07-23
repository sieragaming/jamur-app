const valid = (username, email, password, cpassword) => {
  if (!username || !email || !password)
    return 'Tolong Diisi Form Dibawah Ini'

  if (!validateEmail(email))
    return 'Email Salah'

  if (password.length < 6)
    return 'Password Kurang Dari 6 Karakter'

  if (password !== cpassword)
    return 'Password Tidak Sama'
}


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export default valid
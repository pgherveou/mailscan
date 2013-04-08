var capitalize, emailReg;

emailReg = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g;

capitalize = function(str) {
  if (!str) {
    return '';
  }
  return str.split('-').map(function(s) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }).join('-');
};

module.exports = function(text) {
  var emails, results;

  results = [];
  emails = text.match(emailReg);
  emails.forEach(function(email) {
    var firstname, lastname, mailsplit, matches, names, reg;

    names = [];
    reg = new RegExp(RegExp("(?:,|:|;)([^,;:]*?)<(?:" + email + ")>"));
    if (matches = reg.exec(text)) {
      names = matches[1].trim().split(' ').slice(0, 2).map(function(name) {
        return name.replace(/[^a-z -]/ig, '');
      });
    }
    mailsplit = email.split('@')[0].split('.');
    firstname = capitalize(names[0] || mailsplit[0] || '');
    lastname = capitalize(names[1] || mailsplit[1] || '');
    return results.push({
      email: email,
      firstname: firstname,
      lastname: lastname
    });
  });
  return results;
};

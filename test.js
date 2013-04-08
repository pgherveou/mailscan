var mailscan, should;

should = require('chai').should();

mailscan = require('./index');

describe('mailscan', function() {
  return it('should extract emails in text', function() {
    var emails, results, txt;

    txt = "---------- Forwarded message ----------\nFrom: Pierre-Guillaume Herveou <pgherveou@mail.com>\nDate: Mon, April 5, 2013 at 12:28 PM\nSubject: Some subject\nTo: \"Paul FOO\" <paulfoo@mail.com>, \"JOHN BAR\" <john.bar@mail.org>, peter <peter@mail.com>\nBody\nalso include marc.jacob@mail.com";
    results = [
      {
        email: 'pgherveou@mail.com',
        firstname: 'Pierre-Guillaume',
        lastname: 'Herveou'
      }, {
        email: 'paulfoo@mail.com',
        firstname: 'Paul',
        lastname: 'Foo'
      }, {
        email: 'john.bar@mail.org',
        firstname: 'John',
        lastname: 'Bar'
      }, {
        email: 'peter@mail.com',
        firstname: 'Peter',
        lastname: ''
      }, {
        email: 'marc.jacob@mail.com',
        firstname: 'Marc',
        lastname: 'Jacob'
      }
    ];
    emails = mailscan(txt);
    emails.should.be.ok;
    emails.should.have.length(5);
    return results.forEach(function(result, i) {
      return result.should.deep.equal(emails[i]);
    });
  });
});

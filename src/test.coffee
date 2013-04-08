should   = require('chai').should()
mailscan = require './index'

describe 'mailscan', ->

  it 'should extract emails in text', ->

    txt = """
          ---------- Forwarded message ----------
          From: Pierre-Guillaume Herveou <pgherveou@mail.com>
          Date: Mon, April 5, 2013 at 12:28 PM
          Subject: Some subject
          To: "Paul FOO" <paulfoo@mail.com>, "JOHN BAR" <john.bar@mail.org>, peter <peter@mail.com>
          Body
          also include marc.jacob@mail.com
          """

    results = [
      {email: 'pgherveou@mail.com',  firstname: 'Pierre-Guillaume', lastname: 'Herveou'}
      {email: 'paulfoo@mail.com',    firstname: 'Paul',             lastname: 'Foo'}
      {email: 'john.bar@mail.org',   firstname: 'John',             lastname: 'Bar'}
      {email: 'peter@mail.com',      firstname: 'Peter',            lastname: ''}
      {email: 'marc.jacob@mail.com', firstname: 'Marc',             lastname: 'Jacob'}
    ]

    emails = mailscan(txt)
    emails.should.be.ok
    emails.should.have.length 5
    results.forEach (result, i) ->
      result.should.deep.equal emails[i]



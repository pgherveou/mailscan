emailReg = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/g

capitalize = (str) ->
	return '' unless str
	str.split('-')
		.map((s) -> s[0].toUpperCase() + s[1..].toLowerCase())
		.join('-')

module.exports = (text) ->
	results = []
	emails = text.match emailReg
	emails.forEach (email) ->
		names = []
		reg = new RegExp ///(?:,|:|;) ([^,;:]*?) <(?:#{email})>///
		if matches = reg.exec(text)
			names = matches[1]
				.trim().split(' ').slice(0, 2)
				.map (name) -> name.replace(/[^a-z -]/ig,'')
		mailsplit = email.split('@')[0].split('.')
		firstname =  capitalize names[0] or mailsplit[0] or ''
		lastname  =  capitalize names[1] or mailsplit[1] or ''
		results.push {email, firstname, lastname}

	results
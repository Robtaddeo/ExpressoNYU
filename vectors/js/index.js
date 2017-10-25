// import npm packages here
var superagent = require('superagent')
var twilio = require('twilio')

// define your functions here:
module.exports = {
	sms: (req, res) => {
		if (req.query.message == null){
			res.json({
				confirmation: 'fail',
				message: 'message parameter required.'
			})
			return
		}

		if (req.query.to == null){
			res.json({
				confirmation: 'fail',
				message: 'to parameter required.'
			})
			return
		}

		var accountSid = 'AC61a812bd63a5de2585e906cde9839ccc' // Your Account SID from www.twilio.com/console
		var authToken = '56811afedc9140ada9fafdb93b24285e' // Your Auth Token from www.twilio.com/console

		var twilio = require('twilio')
		var client = new twilio(accountSid, authToken)

		let payload = null
		client.messages.create({
		    body: req.query.message,
		    to: '+1'+req.query.to,  // Text this number
		    from: '+14432513964' // From a valid Twilio number
		})
		.then((message) => {
			payload = {
				confirmation: 'success',
				data: message.sid
			}

			res.json(payload)
			return
		})
		.catch(err => {
			res.json({
				confirmation: 'fail',
				message: err.message
			})
		})
	}
}

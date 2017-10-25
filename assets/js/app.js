// your custom app logic goes here:

(function(){

	var turbo = Turbo({site_id: '59d7b5b28284bb0012db7235'})

	// Creates User

	$('#btn-register').click(function(event){
		event.preventDefault()

		var visitor = {

			username: $('#input-username').val(),
			name: $('#input-name').val(),
			email: $('#input-email').val(),
			password: $('#input-password').val(),

		}

		if (visitor.name.length == 0){
			alert('Please enter your name')
			return
		}


		if (visitor.email.length == 0){
			alert('Please enter your email')
			return
		}

		if ($('#input-password-confirm').val() != visitor.password){
			alert('Your passwords do not match')
			return
		}

		if (visitor.password.length == 0){
			alert('Please enter your password')
			return
		}



		// console.log('Register: ' + JSON.stringify(visitor))
		turbo.createUser(visitor, function(err, data){
			if (err){
				alert('Error: ' + err.message)
				return
			}

			window.location.href = '/me'
		})
	})

	// Creates Order

	$('#btn-order').click(function(event){
		event.preventDefault()

		if(document.getElementById('option-sugar').checked) {
		   var sugar = "yes"
		} else {
		   var sugar = "no"
		}

		if (document.getElementById('option-venmo').checked && document.getElementById('option-cash').checked){
			alert('Please pick only one form of payment')
			return
		}

		if (!document.getElementById('option-venmo').checked && !document.getElementById('option-cash').checked){
			alert('Please pick a form of payment')
			return
		}

		if(document.getElementById('option-milk').checked) {
			 var milk = "yes"
		} else {
			 var milk = "no"
		}

		if(document.getElementById('option-venmo').checked) {
			 var payment = "Venmo"
		} else {
			 var payment = "Cash"
		}

		if(document.getElementById('option-splenda').checked) {
			 var splenda = "yes"
		} else {
			 var splenda = "no"
		}

		if(document.getElementById('option-ice').checked) {
			 var ice = "yes"
		} else {
			 var ice = "no"
		}

		var orderInfo = {

			name: $('#purchase-name').val(),
			email: $('#purchase-email').val(),
			room: $('#purchase-room').val(),
			dorm: $('#purchase-dorm').val(),
			sugar: sugar,
			payment: payment,
			splenda: splenda,
			milk: milk,
			iced: ice,
			creme: $('#option-creme').val(),

		}

		if (orderInfo.name.length == 0){
			alert('Please enter your name')
			return
		}

		if (orderInfo.email.length == 0){
			alert('Please enter your email')
			return
		}

		if (orderInfo.room.length == 0){
			alert('Please enter your room number')
			return
		}

		var message = 'New order created: Name: ' + orderInfo.name + ' \n Room: ' + orderInfo.room + ' Payment: ' + orderInfo.payment + ' Dorm: ' + orderInfo.dorm + ' Sugar: ' + orderInfo.sugar + ' Splenda: ' + orderInfo.splenda + ' Milk: ' + orderInfo.milk + ' Iced: ' + orderInfo.iced

		message += ' Creme: ' + orderInfo.creme

		// console.log('Register: ' + JSON.stringify(visitor))
		turbo.create('order', orderInfo, function(err, data){
			if (err){
				alert('Error:' + err.message)
				return
			}


		})

		$.ajax({
			url:'https://production.turbo360-vector.com/expresso-eeonzr/sms?message=' + message + '&to=3476749151&key=b64dd743-3760-4425-bafd-37d99cce97b4',
			type: 'GET',
			data: {
				format: 'jsonp'
			},
			contentType: 'application/json; charset=utf-8',
			dataType: 'jsonp',
			async: false,
			success: function(response) {
			}
		})

		window.location.href = '/thanks'


	})

	// Creates Order Array

	turbo.fetch('order', {dorm:'thirdNorthEast'}, function(err, data){
		var order = data.results
		var orderList = ''
		order.forEach(function(order, i){

			orderList += '<tr><td><i class="ti-close id="btn-delete""></i></td>'
			orderList += '<td style="width: 150px;"><p>' + order.name + '</></td>'
			orderList += '<td><p>' + order.room + '</p></td>'
			orderList += '<td><p>' + order.payment + '</p></td>'
			orderList += '<td><p>' + order.creme + '</p></td>'
			orderList += '<td><p>' + order.sugar + '</p></td>'
			orderList += '<td><p>' + order.iced + '</p></td>'
			orderList += '<td><p>' + order.milk + '</p></td>'
			orderList += '<td><p>' + order.splenda + '</p></td></tr>'

		})

		$('#order-table-3nE').html(orderList)
	})

	turbo.fetch('order', {dorm:'thirdNorthSouth'}, function(err, data){
		var order = data.results
		var orderList = ''
		order.forEach(function(order, i){

			orderList += '<tr><td><i class="ti-close id="btn-delete""></i></td>'
			orderList += '<td style="width: 150px;"><p>' + order.name + '</></td>'
			orderList += '<td><p>' + order.room + '</p></td>'
			orderList += '<td><p>' + order.payment + '</p></td>'
			orderList += '<td><p>' + order.creme + '</p></td>'
			orderList += '<td><p>' + order.sugar + '</p></td>'
			orderList += '<td><p>' + order.iced + '</p></td>'
			orderList += '<td><p>' + order.milk + '</p></td>'
			orderList += '<td><p>' + order.splenda + '</p></td></tr>'

		})

		$('#order-table-3nS').html(orderList)
	})

	turbo.fetch('order', {dorm:'thirdNorthNorth'}, function(err, data){
		var order = data.results
		var orderList = ''
		order.forEach(function(order, i){

			orderList += '<tr><td><i class="ti-close id="btn-delete""></i></td>'
			orderList += '<td style="width: 150px;"><p>' + order.name + '</></td>'
			orderList += '<td><p>' + order.room + '</p></td>'
			orderList += '<td><p>' + order.payment + '</p></td>'
			orderList += '<td><p>' + order.creme + '</p></td>'
			orderList += '<td><p>' + order.sugar + '</p></td>'
			orderList += '<td><p>' + order.iced + '</p></td>'
			orderList += '<td><p>' + order.milk + '</p></td>'
			orderList += '<td><p>' + order.splenda + '</p></td></tr>'

		})

		$('#order-table-3nN').html(orderList)
	})

	// Login / Logout functions

	$('#btn-login').click(function(event){
			event.preventDefault()

			// These values should come from a form tag in an html document:
			var credentials = {

				username: $('#input-username-login').val(),
				password: $('#input-password-login').val()

			}

			turbo.login(credentials, function(err, data){
				if (err){
					alert('Error:' + err.message)
					return
				}

				window.location.href = '/admin'
			})
		})



	$('#nav-logout').click(function(event){
		event.preventDefault()

		turbo.logout(function(err, data){
			if (err){
				alert('Error:' + err.message)
				return
			}

			window.location.href = '/'

		})
	})


	// if (currentUser == null){
	// 	$('#login-logout').html("Login")
	// }
	//
	// if (currentUser != null){
	// 	$('#login-logout').html("Logout")
	// }
	// renderOrders()
})()

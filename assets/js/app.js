// your custom app logic goes here:

(function(){

	var turbo = Turbo({site_id: '59d7b5b28284bb0012db7235'})

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

			console.log('User Created: ' + JSON.stringify(data))
			window.location.href = '/me'
		})
	})

	$('#btn-order').click(function(event){
		event.preventDefault()

		if(document.getElementById('option-sugar').checked) {
		   var sugar = "yes"
		} else {
		   var sugar = "no"
		}

		if(document.getElementById('option-milk').checked) {
			 var milk = "yes"
		} else {
			 var milk = "no"
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

		// console.log('Register: ' + JSON.stringify(visitor))
		turbo.create('order', orderInfo, function(err, data){
			if (err){
				alert('Error:' + err.message)
				return
			}

			console.log('Order Created: ' + JSON.stringify(data))
			window.location.href = '/thanks'
		})
	})

	turbo.fetch('order', {dorm:'thirdNorthEast'}, function(err, data){
		console.log('Orders Fetched: ' + JSON.stringify(data))
		var order = data.results
		var orderList = ''
		order.forEach(function(order, i){
			orderList += '<tr><td><i class="ti-close id="btn-delete""></i></td>'
			orderList += '<td style="width: 150px;"><p>' + order.name + '</p></td>'
			orderList += '<td><p>' + order.room + '</p></td>'
			orderList += '<td><p>' + order.creme + '</p></td>'
			orderList += '<td><p>' + order.sugar + '</p></td>'
			orderList += '<td><p>' + order.iced + '</p></td>'
			orderList += '<td><p>' + order.milk + '</p></td>'
			orderList += '<td><p>' + order.splenda + '</p></td></tr>'

		})

		$('#order-table-3nE').html(orderList)
	})

	turbo.fetch('order', {dorm:'thirdNorthSouth'}, function(err, data){
		console.log('Orders Fetched: ' + JSON.stringify(data))
		var order = data.results
		var orderList = ''
		order.forEach(function(order, i){
			orderList += '<tr><td><i class="ti-close id="btn-delete""></i></td>'
			orderList += '<td style="width: 150px;"><p>' + order.name + '</p></td>'
			orderList += '<td><p>' + order.room + '</p></td>'
			orderList += '<td><p>' + order.creme + '</p></td>'
			orderList += '<td><p>' + order.sugar + '</p></td>'
			orderList += '<td><p>' + order.iced + '</p></td>'
			orderList += '<td><p>' + order.milk + '</p></td>'
			orderList += '<td><p>' + order.splenda + '</p></td></tr>'

		})

		$('#order-table-3nS').html(orderList)
	})

	turbo.fetch('order', {dorm:'thirdNorthNorth'}, function(err, data){
		console.log('Orders Fetched: ' + JSON.stringify(data))
		var order = data.results
		var orderList = ''
		order.forEach(function(order, i){
			orderList += '<tr><td><i class="ti-close id="btn-delete""></i></td>'
			orderList += '<td style="width: 150px;"><p>' + order.name + '</p></td>'
			orderList += '<td><p>' + order.room + '</p></td>'
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

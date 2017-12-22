var database = firebase.database();

var stored_data = ''

if (getQueryVariable('game')){

	firebase.database().ref('/').once('value').then(function(snapshot) {
    stored_data = snapshot.val();
	//What the user searched for
	var game = location.search;
	var formatted_game = (getQueryVariable('game'));
    console.log(formatted_game, "copy me");
	$.ajax("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?filter=not_exists&fields=*&limit=50&offset=0&&search=" + formatted_game + "", {
	     method: "GET",
	     headers: {
	         "X-Mashape-Key": "DFGqKmjjWBmshuUGYr7ReLLHlvaup1q4WVDjsnvStEw2yMsBIo",
	         "Accept": "application/json"
	     },
	     dataType: "json",
	     success: (data) => {
            console.log(data);
	        igdb_response(data, stored_data);
	     },
	     error: (xhr, textStatus, errorThrown) => {
	         console.log(textStatus, errorThrown);
	     }
	   });
    });
} else {
	firebase.database().ref('/').once('value').then(function(snapshot) {
		var gamez= []; 
		count = 0;

    	stored_data = snapshot.val();
    	for (var key in stored_data){
			$.ajax("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?filter=not_exists&fields=popularity,name,cover,esrb,pegi&limit=1&offset=0&&search=" + key + "", {
	    		method: "GET",
	    		headers: {
	    		    "X-Mashape-Key": "DFGqKmjjWBmshuUGYr7ReLLHlvaup1q4WVDjsnvStEw2yMsBIo",
	    		    "Accept": "application/json"
	    		},
	    		dataType: "json",
	    		success: (data) => {
	    		    gamez.push(data);
	    		    count += 1;
	    		    if (count == Object.keys(stored_data).length){
	    				gamez.sort(function(a,b) { return (b[0].popularity) - (a[0].popularity) } );
						all_games(gamez, stored_data);
	    		   }
	    		},
	    		error: (xhr, textStatus, errorThrown) => {
	    		    console.log(textStatus, errorThrown);
	    		}
			});	
		}
	});
}

function igdb_response(response_data, stored_data) {
	var current = 0;
    for (var i = 0; i < 50; i++) {
    	//console.log(response_data[i]);
        if (response_data[i] != undefined) {
        	var game_name = response_data[i].name;
            if (stored_data[game_name] != undefined) {
            	//Game name
                document.getElementById('game' + (parseInt(current) + 1) + '_name').innerHTML = response_data[i].name;
                //Game rating
                document.getElementById('game' + (parseInt(current) + 1) + '_rating').innerHTML = find_rating(response_data[i]);
                //Game cover
                try {
                    document.getElementById('game' + (parseInt(current) + 1) + '_cover').src = 'https://images.igdb.com/igdb/image/upload/t_cover_big/' + response_data[i].cover.cloudinary_id + '.jpg'
                } catch (err) {
                    document.getElementById('game' + (parseInt(current) + 1) + '_cover').src = 'http://www.pdsportland.com/wp-content/themes/pdsportland2/assets/images/no-image.jpg'
                }
                //Platform category
                var h5_platform = document.createElement('H5');
                h5_platform.innerHTML = "Platform";
                document.getElementById('game' + (parseInt(current) + 1) + '_stock').appendChild(h5_platform);
                //Price category
                var h5_price = document.createElement('H5');
                h5_price.innerHTML = 'Price';
                document.getElementById('game' + (parseInt(current) + 1) + '_price').appendChild(h5_price);
                //HR sparator
                var hr = document.createElement('HR');
                document.getElementById('game' + (parseInt(current) + 1)).appendChild(hr);
          		//Buy Now button
    			var input = document.createElement('Input');
    			input.setAttribute('type', 'image');
    			input.setAttribute('src', 'https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif');
    			input.setAttribute('border', '0');
    			input.setAttribute('name', 'submit');
    			input.setAttribute('alt', 'PayPal - The safer, easier way to pay online!');
    			document.getElementById('game' + (parseInt(current) + 1) + '_form').appendChild(input);
    	
                document.getElementById('game' + (parseInt(current) + 1) + '_itemname').setAttribute('value', game_name);

    			if (stored_data[game_name]['Price'] == 5){
    				document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'BT84JPXC8MBX2');
    			} else if (stored_data[game_name]['Price'] == 10){
    				document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'N5DRW6NU4E3RY');
    			} else if (stored_data[game_name]['Price'] == 7){
    				document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'JBYJRHVWCEG76');
    			} else if (stored_data[game_name]['Price'] == 30){
    				document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'BFAKAA9JHXTHY');
    			} 

                for (var plat in stored_data[game_name]['Platform']) {
                	//a link tags
                	var platform_1 = document.createElement('A');
                	var price_1 = document.createElement('A');
                	//Individual Platforms, append to link
                	var h5_platform = document.createElement('H5');
                	h5_platform.innerHTML = plat + ' (' + stored_data[game_name]['Platform'][plat] + ' left)';
                	platform_1.appendChild(h5_platform);
                	document.getElementById('game' + (parseInt(current) + 1) + '_stock').appendChild(platform_1);
                	//Append Platforms to Button group
                	var current_button = document.createElement('Button');
                	current_button.setAttribute('type','button');
                	current_button.setAttribute('class','btn btn-danger');
                	current_button.innerHTML = plat;
                	document.getElementById('game' + (parseInt(current) + 1) + '_platform').appendChild(current_button)
					//Corresponding Price               
                	var h5_price = document.createElement('H5');
                	h5_price.innerHTML = '$' + stored_data[game_name]['Price'];
                	price_1.appendChild(h5_price);
                	document.getElementById('game' + (parseInt(current) + 1) + '_price').appendChild(price_1);
                }
                if (response_data[i].summary != undefined){
                	document.getElementById('game' + (parseInt(current) + 1) + '_summary_snip').innerHTML = response_data[i].summary.substring(0,120);
                	document.getElementById('game' + (parseInt(current) + 1) + '_summary_long').innerHTML = response_data[i].summary.substring(120);

				document.getElementById('game' + (parseInt(current) + 1) + '_hider').style.cssText = 'display:none';
   				document.getElementById('game' + (parseInt(current) + 1) + '_more').innerHTML = 'more..';


            	} else {
            		document.getElementById('game' + (parseInt(current) + 1) + '_summary_snip').innerHTML = 'No summary available';
            		document.getElementById('game' + (parseInt(current) + 1) + '_more').innerHTML = "";
            	}
            	current+=1;
            } 
        } 
        if (current == 14){
        	break;
        }
    }
    while (current != 14){
    	document.getElementById('game' + (parseInt(current) + 1)).style.cssText = 'display:none';
        document.getElementById('game' + (parseInt(current) + 1) + '_stock').style.display = 'none';
        document.getElementById('game' + (parseInt(current) + 1) + '_price').style.display = 'none';
        current+=1;
    }
}

function all_games(gamez, stored_data){
	for (var current = 0; current < gamez.length; current++){
		var game_name = gamez[current][0].name;
		//Game name
        document.getElementById('game' + (parseInt(current) + 1) + '_name').innerHTML = gamez[current][0].name;
        //Game rating
        document.getElementById('game' + (parseInt(current) + 1) + '_rating').innerHTML = find_rating(gamez[current][0]);
        //Game cover
        try {
            document.getElementById('game' + (parseInt(current) + 1) + '_cover').src = 'https://res.cloudinary.com/igdb/image/upload/t_cover_big/' + gamez[current][0].cover.cloudinary_id + '.jpg'
        } catch (err) {
            document.getElementById('game' + (parseInt(current) + 1) + '_cover').src = 'http://www.pdsportland.com/wp-content/themes/pdsportland2/assets/images/no-image.jpg'
        }
        //Platform category
        var h5_platform = document.createElement('H5');
        h5_platform.innerHTML = "Platform";
        document.getElementById('game' + (parseInt(current) + 1) + '_stock').appendChild(h5_platform);
        //Price category
        var h5_price = document.createElement('H5');
        h5_price.innerHTML = 'Price';
        document.getElementById('game' + (parseInt(current) + 1) + '_price').appendChild(h5_price);
        //HR sparator
        var hr = document.createElement('HR');
        document.getElementById('game' + (parseInt(current) + 1)).appendChild(hr);
    	//Buy Now button
    	var input = document.createElement('Input');
    	input.setAttribute('type', 'image');
    	input.setAttribute('src', 'https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif');
    	input.setAttribute('border', '0');
    	input.setAttribute('name', 'submit');
    	input.setAttribute('alt', 'PayPal - The safer, easier way to pay online!');
    	document.getElementById('game' + (parseInt(current) + 1) + '_form').appendChild(input);
    	
        document.getElementById('game' + (parseInt(current) + 1) + '_itemname').setAttribute('value', game_name);

    	if (stored_data[game_name]['Price'] == 5){
    		document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'BT84JPXC8MBX2');
    	} else if (stored_data[game_name]['Price'] == 10){
    		document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'N5DRW6NU4E3RY');
    	} else if (stored_data[game_name]['Price'] == 7){
    		document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'JBYJRHVWCEG76');
    	} else if (stored_data[game_name]['Price'] == 30){
    		document.getElementById('game' + (parseInt(current) + 1) + '_buy').setAttribute('value', 'BFAKAA9JHXTHY');
    	} 

        for (var plat in stored_data[game_name]['Platform']) {
        	//a link tags
        	var platform_1 = document.createElement('A');
        	var price_1 = document.createElement('A');
        	//Individual Platforms, append to link
        	var h5_platform = document.createElement('H5');
        	h5_platform.innerHTML = plat + ' (' + stored_data[game_name]['Platform'][plat] + ' left)';
        	platform_1.appendChild(h5_platform);
        	document.getElementById('game' + (parseInt(current) + 1) + '_stock').appendChild(platform_1);
        	//Append Platforms to Button group
        	var current_button = document.createElement('Button');
        	current_button.setAttribute('type','button');
        	current_button.setAttribute('class','btn btn-danger');
        	current_button.innerHTML = plat;
        	document.getElementById('game' + (parseInt(current) + 1) + '_platform').appendChild(current_button);
        	//Corresponding Price               
        	var h5_price = document.createElement('H5');
        	h5_price.innerHTML = '$' + stored_data[game_name]['Price'];
        	price_1.appendChild(h5_price);
        	document.getElementById('game' + (parseInt(current) + 1) + '_price').appendChild(price_1);
        }
        if (gamez[current][0].summary != undefined){
        	document.getElementById('game' + (parseInt(current) + 1) + '_summary_snip').innerHTML = gamez[current][0].summary.substring(0,120);
        	document.getElementById('game' + (parseInt(current) + 1) + '_summary_long').innerHTML = gamez[current][0].summary.substrindocument.getElementById('game' + (parseInt(current) + 1) + '_hider').style.cssText = 'display:none';document.getElementById('game' + (parseInt(current) + 1) + '_more').innerHTML = 'more..';


     	} else {
     		document.getElementById('game' + (parseInt(current) + 1) + '_summary_snip').innerHTML = 'No summary available';
            document.getElementById('game' + (parseInt(current) + 1) + '_more').innerHTML = "";
     	}

	}
}

function hide(game){
	console.log(game);
	$('#'+game + '_hider').toggle();
	$('#'+game + '_more').innerHTML = 'more..';
	if (document.getElementById(game + '_more').innerHTML == 'more..'){
		document.getElementById(game + '_more').innerHTML = 'less..';
		document.getElementById(game + '_hider').style.cssText = 'display:inline';

	} else {
		document.getElementById(game + '_more').innerHTML = 'more..';
	}
}
function find_rating(game) {
    if (game.esrb != undefined) {
        if (game.esrb.rating == 1) {
            return 'ESRB: Rating Pending';
        } else if (game.esrb.rating == 2) {
            return 'ESRB: Early Childhood';
        } else if (game.esrb.rating == 3) {
            return 'ESRB: Everyone';
        } else if (game.esrb.rating == 4) {
            return 'ESRB: Everyone 10+';
        } else if (game.esrb.rating == 5) {
            return 'ESRB: Teen';
        } else if (game.esrb.rating == 6) {
            return 'ESRB: Mature'
        } else if (game.esrb.rating == 7) {
            return 'ESRB: Adults Only'
        }
    } else if (game.pegi != undefined) {
        if (game.pegi.rating == 1) {
            return 'PEGI 3'
        } else if (game.pegi.rating == 2) {
            return 'PEGI 7'
        } else if (game.pegi.rating == 3) {
            return 'PEGI 12'
        } else if (game.pegi.rating == 4) {
            return 'PEGI 16'
        } else if (game.pegi.rating == 5) {
            return 'PEGI 18'
        }
    } else {
        return 'Unrated'
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
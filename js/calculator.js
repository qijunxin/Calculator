$(function(){
	var $keys = $('.calculator button');
	var $screen = $('.screen');
	var decimal = false;
	var operators = ['+','-','x','÷'];

	$keys.click(function(){
		var value = $(this).data('val');
		var output = $screen.html();

		if(output =='0'){
			$screen.html('');
		}
		//clear 
		if(value == 'clear'){
			$screen.html('');
		}
		//equal
		else if(value == '='){
			var result = output;
			var lastChar = result.slice(-1);
			result = result.replace(/x/g, '*').replace(/÷/g, '/');

			//ignore the last operator
			if(operators.indexOf(lastChar) > -1 || lastChar == '.'){
				result = result.replace(/.$/, '');
			}
			if(result){

				if(result.indexOf('.')>-1){ //decimal
					$screen.html(eval(result).toFixed(2));
				}else{				
				    $screen.html(eval(result));
				}
			}
		}

		//operators 
		else if($(this).parent().is('.operators')){
			var lastChar = output.slice(-1);

			//normal
			if(output!=''&&operators.indexOf(lastChar)==-1){
				$screen.html(output+value);
			}
			//start with a negative
			else if(output==''&&value=='-'){
				$screen.html(output+value);
			}
			//if end with a operator,the new will cover the old
			if(output.length>1 && operators.indexOf(lastChar)>-1){
				$screen.html(output.replace(/.$/, value));
			}
		}

		//buttons
		else{
			$screen.html($screen.html()+value);
		}


	})
})
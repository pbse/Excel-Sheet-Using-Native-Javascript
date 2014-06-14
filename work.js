(function () { 
    //Initialisation //
		var charcode1 = 64,charcode2 = 65,countnum=0,loop=0;
		var table = {   
				rowcount    :10,
				columncount :15,
				addNewRow : function () {
					this.rowcount++;
				},
				addNewColumn : function() {
					this.columncount++;
				},
				delNewRow : function () {
					this.rowcount--;
				},
				delNewColumn : function() {
					this.columncount--;
				}
		};
		// Initial Functions To Be Reused //
		function addrowcode(i) {
			var i=i;
			var newRows = document.createElement('tr');
			newRows.setAttribute('id','id-'+i);
			document.getElementById('dynamictable').appendChild(newRows);
			for (var j = 0; j < table.columncount; j++) {
				var cell = document.createElement('td');
				cell.setAttribute('id','id-'+i+'-'+j);
				document.getElementById('id-'+i).appendChild(cell);
				tnode=document.createTextNode(countnum);
				if (j==0){
					document.getElementById('id-'+i+'-'+j).appendChild(tnode);
					countnum++;
				}
				else {
				inputcell = document.createElement('input');
				inputcell.setAttribute('type','text');
				inputcell.setAttribute('onblur','updatecell('+i+','+j+')'); 
				inputcell.setAttribute('onclick','this.select()');
				document.getElementById('id-'+i+'-'+j).appendChild(inputcell);
			}
			};
		};	
		function delrowcode(i) {
			var i=i;
			document.getElementById('id-'+i).remove();
			countnum--;
		};
		function delcolumncode(i) {
			var i=i;
			document.getElementById('hid-'+i).remove();
			for (var j = 0; j < table.rowcount; j++)
			{	i = table.columncount;
				document.getElementById('id-'+j+'-'+i).remove();
				i++;
				}
			if (loop>0) {
				if (charcode1>64 && charcode2>65) {
					charcode2--;
					}
			} else 	
			charcode1--;
		};
	// Drawing the table //		
	for (var i = 0; i < table.columncount; i++) {
		var tableHead = document.createElement('th');
		tableHead.setAttribute('id','hid-'+i);
		tableHead.setAttribute('onclick','sortData('+i+')');
		textnode=document.createTextNode(String.fromCharCode(charcode1));
		charcode1++;
		textnode2=document.createTextNode("Number");
		document.getElementById('heading').appendChild(tableHead);		
		if (i==0)
				document.getElementById('hid-'+i).appendChild(textnode2);
		else 
		document.getElementById('hid-'+i).appendChild(textnode);
		}
	for (var i= 0;i<table.rowcount;i++){
		addrowcode(i);
	}
	
	//Addition & Deletion Code //
	addNewRow =function  () {
		i = table.rowcount;
		table.addNewRow();
		addrowcode(i);	
	}

	delRow =function  () {
		i = table.rowcount - 1;
		table.delNewRow();
		delrowcode(i);	
	}
	delColumn =function  () {
		i = table.columncount - 1;
		table.delNewColumn();
		delcolumncode(i);	
	}
	addNewColumn = function(){
		j = table.columncount;
		table.addNewColumn();
		newHead = document.createElement('th');
		newHead.setAttribute('id','hid-'+j);
		if (charcode1<91 && loop ==0){
		textnode=document.createTextNode(String.fromCharCode(charcode1));
		charcode1++;
		if (charcode1>=91) {
			charcode1=65;
			loop = loop + 1;
			}
		}
		else {
			textnode=document.createTextNode(String.fromCharCode(charcode1)+String.fromCharCode(charcode2));
			charcode2++;
			if (charcode2==91) {charcode1++;loop++;charcode2=65};
		}
		
		document.getElementById('heading').appendChild(newHead).appendChild(textnode);	
		for (var i = 0; i < table.rowcount; i++) {
		newCell = document.createElement('td');
		newCell.setAttribute('id','id-'+i+'-'+j);
		document.getElementById('id-'+i).appendChild(newCell);
		newCell = document.createElement('input');
		newCell.setAttribute('type','text');
		newCell.setAttribute('onblur','updatecell('+i+','+j+')');
		inputcell.setAttribute('onclick','this.select()');
		document.getElementById('id-'+i+'-'+j).appendChild(newCell);
		}
	}
	
	// Sorting Code //
	content = new Array(table.rowcount);
	for (var i = 0; i < content.length; i++) {
		content[i] = new Array(table.columncount);
	}; 
	updatecell = function(i,j){
		content[i][j] = document.getElementById('id-'+i+'-'+j).firstChild.value;
		console.log(content[i][j]);
	}
	var abc = content.length;
	sortData = function(j){
	var j = j;
			for (var q = 0; q < abc; q++) {
					if (content[q][j]>content[q+1][j]) {
						
						var temp = content[q][j];
						content[q][j] = content[q+1][j];
						var element = document.getElementById('id-'+q+'-'+j);
						if(element.firstChild.value!="")
							element.firstChild.value = content[q][j];
						content[q+1][j] = temp;
						element = document.getElementById('id-'+(q+1)+'-'+j);
							if(element.firstChild.value!="")
							element.firstChild.value = content[q+1][j];
							console.log(content[q+1][j]);
						
						}
				};
	}

})()
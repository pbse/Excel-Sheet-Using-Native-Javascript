//////////////////////////////////////////////////////////////
//															//
//															//
//  Generating Excel Sheet Using Native Javascript			//
//															//	
//															//
//															//
//////////////////////////////////////////////////////////////

    //Initialisation //
	var table = {   
		rowcount    :0,
		columncount :0,
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
		},
		drawTable : function(a,b) {
			if(typeof a==='undefined') this.rowcount = 10;
			else this.rowcount=a;
			if(typeof b==='undefined') this.columncount = 15;
			else this.columncount=b;
			draw();
		}
	};
	
	// Function to Draw the table based on the Values Provided.

	var draw = function() {
		var tableHead = document.createElement('th');
				tableHead.setAttribute('id','hid-');
		document.getElementById('heading').appendChild(tableHead);
		document.getElementById('hid-').appendChild(document.createTextNode("Nos"));		
		for (var i = 0; i < table.columncount; i++) {
			var tableHead = document.createElement('th');
				tableHead.setAttribute('id','hid-'+i);
				tableHead.setAttribute('onclick','sortData('+i+')');
			var check = i,
				cap = [];
			while(check>=0) {
				cap.unshift(String.fromCharCode(65 + (check%26)));
				check = (check/26) - 1;
			}
			textnode=document.createTextNode(cap.join(''));
			document.getElementById('heading').appendChild(tableHead);		
			document.getElementById('hid-'+i).appendChild(textnode);
		}
		for (var i= 0;i<table.rowcount;i++){
			addrowcode(i);
		}
	};

	// Function to add one Row based on Number of Columns
	
	var addrowcode = function(i) {
		var newRows = document.createElement('tr');
			newRows.setAttribute('id','id-'+i);
		document.getElementById('dynamictable').appendChild(newRows);
		var cell = document.createElement('td');
			cell.setAttribute('id','htdid-' + i);
		document.getElementById('id-'+i).appendChild(cell);
		document.getElementById('htdid-'+i).appendChild(document.createTextNode(i));
		for (var j = 0; j < table.columncount; j++) {
			var cell = document.createElement('td');
				cell.setAttribute('id','id-'+i+'-'+j);
			document.getElementById('id-'+i).appendChild(cell);
			var inputCell = document.createElement('input');
				inputCell.setAttribute('type','text');
				inputCell.setAttribute('onclick','this.select()');
				inputCell.setAttribute('class','form-control');
				document.getElementById('id-'+i+'-'+j).appendChild(inputCell);
		};
	};	

	// Function to Add a New Column

	var addNewColumn = function(){
		var j = table.columncount,
			check = j,
			cap = [],
			newHead = document.createElement('th');
		newHead.setAttribute('id','hid-'+j);
		while(check>=0) {
			cap.unshift(String.fromCharCode(65 + (check%26)));
			check = check/26 - 1;
		}
		var textnode = document.createTextNode(cap.join(''));
		document.getElementById('heading').appendChild(newHead).appendChild(textnode);	
		for (var i = 0; i < table.rowcount; i++) {
			var newCell = document.createElement('td');
				newCell.setAttribute('id','id-'+i+'-'+j);
			document.getElementById('id-'+i).appendChild(newCell);
			var inputCell = document.createElement('input');
				inputCell.setAttribute('type','text');
				inputCell.setAttribute('onclick','this.select()');
				inputCell.setAttribute('class','form-control');
			document.getElementById('id-'+i+'-'+j).appendChild(inputCell);
		}
		table.addNewColumn();
	};

	// Function to Delete the Last Column.
	// Code can be modified to delete a specific column.

	var delColumn = function() {
		i = table.columncount - 1;
		document.getElementById('hid-'+i).remove();
		for (var j = 0; j < table.rowcount; j++)
		{	
			document.getElementById('id-'+j+'-'+i).remove();
		}	
		table.delNewColumn();
	};

	//function to Add new Row at the Last

	var addNewRow = function() {
		i = table.rowcount;
		addrowcode(i);
		table.addNewRow();	
	};

	// Function to Delete Last Row

	var delRow = function() {
		i = table.rowcount - 1;
		document.getElementById('id-'+i).remove();	
		table.delNewRow();
	};
	
	// A very simple sorting technique. Can only
	// Sort a specific Column.
	var sortData = function(j){
		var tsort = [],len;
		for(var i =0;i<table.rowcount; i++) {
			var id = 'id-' + i + '-' + j;
			var data = document.getElementById(id).getElementsByTagName('input')[0].value;
			if(data != '') tsort.push(data);
		}

		len = tsort.length;
		if(len==0) {
			alert('Empty Column');
			return;
		}

		// Sort function called twice to erase the condition of
		// either only sorting a number or character.

		tsort = tsort.sort();
		tsort = tsort.sort(function(a,b){
			return a - b;
		});
		
		for(var i=0;i<table.rowcount;i++) {
			var id = 'id-' + i + '-' + j;
			if(i<len)
				document.getElementById(id).getElementsByTagName('input')[0].value = tsort[i];
			else 
				document.getElementById(id).getElementsByTagName('input')[0].value = '';
		}
	}

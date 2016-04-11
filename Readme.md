Excel Sheet generated Using Native JS
=====================================

### How to use -

```javascript
var row = document.getElementById('rows').value;
var columns = document.getElementById('columns').value;
table.drawTable(row,columns);
```
> Declare this table tag in your html. By default it takes dynamictable as id

```html
<table id="dynamictable" class="table table-striped table-bordered">
		<thead>
			<tr id="heading"></tr>
		</thead>
</table>
```

[refer to this post for details on how it is built](http://prashantb.me/writing-your-first-library-in-javascript/)

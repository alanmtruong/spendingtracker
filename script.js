var app = new function(){
    this.el= document.getElementById('receipt');
    this.expenses=[];
    this.costs=[];

    this.FetchAll = function(){
        var data='';
        var sum=0;

        if(this.expenses.length>0){
            // Adds 'Edit' and 'Delete' buttons to each entry
            for(i=0;i<this.expenses.length;i++){
                data+='<tr>';
                data+='<td>'+(i+1)+'. '+this.expenses[i]+'</td>';
                data+='<td>'+'$'+this.costs[i]+'</td>';
                data+='<td><button onclick="app.Edit('+i+')"class="btn btn-dark">Edit</button></td>';
                data+='<td><button onclick="app.Delete('+i+')"class="btn btn-danger">Delete</button></td>';
                data+='</tr>'
            }
            
            // Tracks total for expenses entered into table
            for(i=0;i<this.expenses.length;i++){
                sum+=parseFloat(this.costs[i]);
            }

            this.Count(this.expenses.length, sum.toFixed(2));
            return this.el.innerHTML = data;
        }
    };

    // ADD
    this.Add = function(){
        el = document.getElementById('add-expense');
        el2 = document.getElementById('add-cost')
        var expense = el.value;
        var cost = el2.value;
        if(expense){
            this.expenses.push(expense.trim());
            this.costs.push(cost.trim());
            el.value='';
            el2.value='';
            this.FetchAll();
        }
    };

    // EDIT
    this.Edit = function(item){
        el = document.getElementById('edit-expenses');
        el.value = this.expenses[item];
        el2 = document.getElementById('edit-costs');
        el2.value = this.costs[item];
        document.getElementById('edit-box').style.display = 'block';
        document.getElementById('edit-box').style.display = 'block';
        self=this;

        document.getElementById('save-edit').onsubmit = function(){
            var expense = el.value;
            var cost = el2.value;
            if(expense){
                self.expenses.splice(item, 1, expense.trim());
                self.costs.splice(item, 1, cost.trim());
                self.FetchAll();
                CloseInput();
            }
        }
    };

    // DELETE
    this.Delete = function(item){
        this.expenses.splice(item,1);
        this.costs.splice(item,1);
        this.FetchAll();
    };

    this.Count = function(data, total){
        var el = document.getElementById('counter');
        var name = 'Expenses';
        if(data){
            if(data == 1){
                name = 'Expense';
            }
            el.innerHTML = data + ' ' + name +' totaling $' + total;
        }
    };
}

app.FetchAll();

function CloseInput(){
    document.getElementById('edit-box').style.display = 'none';
}
 class Calculator {
    constructor(equation){
        if (equation == false){
            this.array = []
        } else {
            this.array = this.recalculate(equation)
        }        
    }

    recalculate(equation){
        this.array = this.#convertEquationToArray(equation);

        return this.array
    }

    deleteLastItem(equation){
        this.array = this.#convertEquationToArray(equation)
        let last = this.array[this.array.length-1]
        if (last.length == 1){
            this.array.pop()
        } else {
            last = last.split('').slice(0, -1).join(''); 
            this.array[this.array.length-1] = last
        }
        return this.array;
    }

    #isNumber (y){

        let passTest = []
        if (typeof(y) == "string"){
            for (let i = 0; i < y.length; i++){

                if (y[i] in ["1","2","3","4","5","6","7","8","9","0"] || y[i] in [1,2,3,4,5,6,7,8,9,0]){
                    passTest[i] = true
                } else {
                    passTest[i] = false
                }
            }
        }

        return passTest.every(condition=>condition == true)
    }

    #convertEquationToArray(x){
        x = x.split('').filter(x => x!=",").join('');

        let previousElement;

        let data = []
    
        for (let i = 0; i < x.length; i++){
            let char = x[i];
    
            if (data.length == 0){
                data[0] = char;
                previousElement = data[0];
            } else {
    
                if (this.#isNumber(previousElement) && this.#isNumber(char)){
                    data[data.length-1] += char;
    
                } else if (previousElement[previousElement.length - 1] == char){
                    data[data.length-1] += char;
                } else {
    
                    previousElement = data[data.push(char) - 1];
    
                }
            }
    
        }
        return data;
    }

}

function perform(key, value, array){    

    if(key == "X"){
        array[value] = array[value-1] * array[value+1]
    } else if (key == "/"){
        array[value] = array[value-1] / array[value+1]
    } else if (key == "%"){
        array[value] = array[value-1] % array[value+1]
    } else if (key == "+"){
        array[value] = parseInt(array[value-1]) + parseInt(array[value+1])
    } else if (key == "-"){
        array[value] = parseInt(array[value-1]) - parseInt(array[value+1])
    } else if (key == "^"){
        array[value] = parseInt(array[value-1]) ** parseInt(array[value+1])
    }

    array[value-1] = null;
    array[value+1] = null;

    array = array.filter(value => value != null)

    return array
}


function orderOfOperations(array){
    //PEMDAS. Multiplication and Division first. Addition and subtraction Last

    //First: Do exponents
    for (let i = 0; i < array.length; i++){
        if("^" == array[i]){
            array = perform(array[i],i, array)
            i = 0;
        }
        if (array.length == 1){
            break;
        }
    }  

    //second: read left to right and do the Multiplication and division first

    for (let i = 0; i < array.length; i++){
        if("X" == array[i] || "/" == array[i] || '%' == array[i]){
            array = perform(array[i],i, array)
            i = 0;
        }
        if (array.length == 1){
            break;
        }
    }  

    //third: read left to right, and do the Addition and Subtraction

    for (let i = 0; i < array.length; i++){
        if("+" == array[i] || "-" == array[i]){
            array = perform(array[i],i, array)
            i = 0;
        }
        if (array.length == 1){
            break;
        }
    }  
    
    if (array.length > 1){
        return ["Error"]
    } else if (array == [NaN]){
        return ['Error. Not a Number. You did something wrong']
    } else {
        return array
    }
}

Calculator.prototype.solve = function(equation){
    this.recalculate(equation)

    this.array = orderOfOperations(this.array)

    return this.array
}
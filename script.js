
let buttons = document.querySelectorAll('button');
let box = document.querySelector('#math')
let fontSize = 36;


/*
NOTE FOR LATER! 

I have a function addEntry() that shows the text inside of the  textbox when
you press buttons on the calculator.

I also made it so that the text shrinks if it passes a certain point.

Problem is, the text goes too tiny, too quickly. 

I need to think and make an algorithm that starts lowering the text size quickly
at the start, but then slows down, progressively.

*/
function addEntry(value){
    if (box.textContent.length <= 20){
        console.log(box.textContent.length);
        box.textContent += value;
        console.log(box.style.fontSize);

    } else {
        fontSize -=1;
        box.textContent += value;
    }

    box.style.fontSize = `${fontSize}px`
}


let answer = new Calculator(false)

for (let button of buttons){
    button.addEventListener('click', () => {
        let data = button.getAttribute('data')
        if (data == "DEL"){
            if (typeof answer == "object"){
                box.textContent = answer.deleteLastItem(box.textContent).join('')
            }
        } else if (data == "CE"){
            box.textContent = ''
            answer.recalculate(box.textContent)
        } else if (data == "="){
            box.textContent = answer.solve(box.textContent).join('');
        }
        
        else {
            addEntry(data)
        }
    })
}
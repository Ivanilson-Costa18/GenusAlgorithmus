const start = () => {
    let choice = document.getElementById("sort-input").value
    switch(choice){
        case 'Bubble Sort':
            bubbleSort()
            break; 
        default: 
            console.log(choice)
    }
}

const generateArray = (size) => {
    let graph = document.getElementById('graph')
    let numbers = randomNumbers(size, graph.offsetHeight)
    graph.innerHTML = ""
    for(let i in numbers){
        let bar = document.createElement('div')
        bar.id = i
        bar.style.height = numbers[i]+'px'
        bar.style.width = graph.offsetWidth/size*.95
        bar.classList.add('default_color')
        graph.appendChild(bar)
    }
}

const randomNumbers = (size, max) => {
    globalThis.currentArr =  Array.from({length: size}, () => Math.random() * max)
    return globalThis.currentArr
}

const bubbleSort = async () => {
    let arr = globalThis.currentArr
    let length = arr.length
    for(let i = 0; i < length - 1; i++){
        for(let j = 0; j < length - i - 1; j++){
            let currentBar = document.getElementById(j)
            let nextBar = document.getElementById(j+1)
            currentBar.classList.add('current_swap')
            nextBar.classList.add('current_swap')
            
            await sleep(10) 

            if(arr[j] > arr[j+1]){
                nextBar.parentNode.insertBefore(nextBar, currentBar)
                currentBar.id = j+1
                nextBar.id = j
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }

            currentBar.classList.remove('current_swap')
            nextBar.classList.remove('current_swap')
        }
    }
}

document.getElementById("range").addEventListener('change', (e) => {
    generateArray(e.target.value)
})

document.getElementById("start-btn").addEventListener('click', (e) => {
    start()
})

const sleep = ms => new Promise(r => setTimeout(r, ms));
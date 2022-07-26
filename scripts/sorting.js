window.onload = () => {
    let range = document.getElementById('range')
    range.value = 40
    let bubble = document.getElementById('bubble')
    setBubble(range, bubble)
    generateArray(40)
}

const start = () => {
    let choice = document.getElementById("sort-input").value
    switch(choice){
        case 'Bubble Sort':
            bubbleSort()
            break
        case 'Quick Sort':
            quickSort()
            break
        case 'Merge Sort':
            mergeSort()
            break
        case 'Heap Sort':
            heapSort()
            break
        default:
            console.log(choice)
    }
}

const generateArray = (size, arrayValues) => {
    let graph = document.getElementById('graph')
    let numbers = arrayValues || randomNumbers(size, graph.offsetHeight)
    globalThis.currentArr = numbers
    graph.innerHTML = ''
    for(let i in numbers){
        let bar = document.createElement('div')
        bar.classList.add('bar')
        let number = document.createElement('div')
        number.classList.add('number')
        number.innerHTML = numbers[i]
        bar.appendChild(number)
        bar.id = i
        bar.style.height = numbers[i]+'px'
        bar.style.width = graph.offsetWidth/size*.95
        bar.classList.add('default-color')
        graph.appendChild(bar)
    }
}

const randomNumbers = (size, max) => {
    return Array.from({length: size}, () => Math.round(Math.random() * max))
}

const bubbleSort = async () => {
    let arr = globalThis.currentArr
    let length = arr.length
    for(let i = 0; i < length - 1; i++){
        for(let j = 0; j < length - i - 1; j++){
            let currentBar = document.getElementById(j)
            let nextBar = document.getElementById(j+1)
            currentBar.classList.add('bs-current')
            nextBar.classList.add('bs-toCompare')

            await sleep(75)

            if(arr[j] > arr[j+1]){
                swapElements(nextBar, currentBar)
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }

            await sleep(75)

            currentBar.classList.remove('bs-current')
            nextBar.classList.remove('bs-toCompare')
        }
    }
}

const quickSort = () => {
    let arr = globalThis.currentArr
    let length = arr.length
    const partition = async (array, min, max) => {
        let pivotDiv = document.getElementById(max)
        pivotDiv.classList.add('qs-current')
        let pivot = array[max]
        let i = min - 1
        for(let j = min; j <= max - 1; j++){
            let currentDiv = document.getElementById(j)
            currentDiv.classList.add('qs-toCompare')

            if(array[j] < pivot){
                let pivotPosDiv = document.getElementById(i+1)
                pivotPosDiv.classList.add('qs-pivotpos')
                swapElements(pivotPosDiv, currentDiv)

                await sleep(150)

                pivotPosDiv.classList.remove('qs-pivotpos')
                i++
                let temp = array[i]
                array[i] = array[j]
                array[j] = temp

            }
            currentDiv.classList.remove('qs-toCompare')
        }

        let pivotPosDiv = document.getElementById(i+1)
        pivotPosDiv.classList.add('qs-pivotpos')

        swapElements(pivotPosDiv, pivotDiv)

        let temp = array[i+1]
        array[i+1] = array[max]
        array[max] = temp

        await sleep(150)

        pivotPosDiv.classList.remove('qs-pivotpos')
        pivotDiv.classList.remove('qs-current')
        return i+1
    }
    const auxiliarQS = async (array, min, max) => {
        if(min < max){
            let pi = await partition(array, min, max)
            auxiliarQS(array, min, pi-1)
            auxiliarQS(array, pi+1, max)
        }
    }
    auxiliarQS(arr, 0, length-1)
}

const mergeSort = () => {
    let arr = globalThis.currentArr.map((v, i) => [v, i])

    const merge = async (leftHalf, rightHalf) => {
        let array = []

        while (leftHalf.length && rightHalf.length) {
            let leftDiv = document.getElementById(leftHalf[0][1])
            let rightDiv = document.getElementById(rightHalf[0][1])
            leftDiv.classList.add("msl-compare")
            rightDiv.classList.add("msr-compare")
            await sleep(75)
            if (leftHalf[0][0] < rightHalf[0][0]) {
                array.push(leftHalf.shift())
            } else {
                rightDiv.parentNode.insertBefore(rightDiv, leftDiv)
                array.push(rightHalf.shift())
            }
            await sleep(75)
            leftDiv.classList.remove("msl-compare")
            rightDiv.classList.remove("msr-compare")
        }
        
       return [ ...array, ...leftHalf, ...rightHalf ]
    }

    const auxiliarMS = async (array) => {
        if(array.length < 2) return array
        let half = Math.floor(array.length / 2)
        let left = array.splice(0, half)
        return await merge(await auxiliarMS(left), await auxiliarMS(array))
    }

    auxiliarMS(arr)
}

const heapSort = () => {

}


["input", "click"].forEach(event => document.getElementById("range").addEventListener(event, (e) => {
    generateArray(e.target.value)
    if(e.target.value > 40){
        let numbersDiv = document.getElementsByClassName('number')
        for(let numberDiv of numbersDiv){
            numberDiv.classList.add('hide-number')
        }
    }
}, false))

document.getElementById('start-btn').addEventListener('click', (e) => {
    start()
})

document.getElementById('create-btn').addEventListener('click', (e) => {
    let array = prompt("Array:").split(' ').map(n => parseInt(n))
    generateArray(array.length, array)
})

document.getElementById('range').addEventListener('input', (e) => {
    let bubble = document.getElementById('bubble')
    setBubble(e.target, bubble);
});

const setBubble = (range, bubble) => {
    const val = range.value
    const min = range.min
    const max = range.max
    const newVal = (val - min) * 100 / (max - min);
    bubble.innerHTML = val;
    bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
}
const swapElements = (elem1, elem2) => {
    let temp = document.createElement("div");
    let id1 = elem1.id
    let id2 = elem2.id

    elem1.parentNode.insertBefore(temp, elem1);
    elem2.parentNode.insertBefore(elem1, elem2);

    temp.parentNode.insertBefore(elem2, temp);
    temp.parentNode.removeChild(temp);

    elem1.id = id2
    elem2.id = id1
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

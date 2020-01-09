console.log("running")

// setInterval(() => {
//     document.querySelector('.thrasher-1').classList.toggle('class-toggle')
// }, 4000)

// setInterval(() => {
//     document.querySelector('.thrasher-2').classList.toggle('class-toggle')
// }, 4000)




const thrasher1 = document.querySelector('.thrasher-1')
const thrasher2 = document.querySelector('.thrasher-2')

const timeInterval = setInterval(() => {
    thrasher1.classList.toggle('class-toggle')
    thrasher2.classList.toggle('class-toggle')
}, 4000)
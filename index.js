
const inputBtn = document.querySelector("#input-btn")
let myLeads = []
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const delMsg = document.querySelector("#del-msg")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))     //Use JSON.parse() to convert the string back into array
const tabBtn = document.querySelector("#tab-btn")

//To render localStorage data
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//To save current page using Chrome's Tab API
tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
     })
})

//To delete all the existing data on doubleclick
deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    delMsg.textContent = ""
    myLeads = []
    render(myLeads)
})

//To warn user for doubleclicking in order to delete data (warning measure)
deleteBtn.addEventListener("click", function() {
    let delText = "Double-click the delete button to delete all the leads!"
    delMsg.innerHTML = delText
})

//To explicitly add data
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))        //Use JSON.stringify to convert the array to a string as localStorage only deals with String data type (Format: Key-Value)
    render(myLeads)
})

//To render data in the extension
function render(leads) {

    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += 
        `<li>
        <a target='_blank' href='${leads[i]}'> 
        ${leads[i]} 
        </a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

